import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, X, Send, Mic, MicOff, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import logo from "@/assets/ajinava-edge-logo.jpeg";

type Msg = { role: "user" | "assistant"; content: string };

const QUICK_OPTIONS = [
  { label: "🚀 Explore Services", prompt: "Tell me what services Ajinava Edge offers." },
  { label: "💰 Get Pricing", prompt: "I want a rough quote — can you help?" },
  { label: "📞 Talk to Team", prompt: "I'd like the team to contact me." },
  { label: "🤖 AI Suggestions", prompt: "I have an idea and want a tech stack + feature suggestions." },
];

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hi 👋 Welcome to **Ajinava Edge**! I'm Edge, your AI assistant.\n\nI can help you explore services, get an instant quote, or recommend the perfect tech stack for your idea.\n\nHow can we help you today?",
};

// Browser Speech Recognition typing helper
type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((e: { results: ArrayLike<{ 0: { transcript: string } }> }) => void) | null;
  onerror: ((e: unknown) => void) | null;
  onend: (() => void) | null;
};

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [listening, setListening] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streaming]);

  // Persist chat history
  useEffect(() => {
    const saved = localStorage.getItem("edge-chat");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Msg[];
        if (parsed.length > 0) setMessages(parsed);
      } catch {/* ignore */}
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("edge-chat", JSON.stringify(messages));
  }, [messages]);

  const extractAndStoreLead = async (full: string) => {
    if (leadSent) return full;
    const match = full.match(/\[LEAD\]\s*(\{[\s\S]*?\})/);
    if (!match) return full;
    try {
      const lead = JSON.parse(match[1]);
      if (lead.email && lead.name) {
        await supabase.from("leads").insert({
          name: String(lead.name).slice(0, 100),
          email: String(lead.email).slice(0, 255),
          requirement: String(lead.requirement ?? "").slice(0, 2000),
          source: "chatbot",
        });
        setLeadSent(true);
        toast.success("Got it — our team will reach out soon!");
      }
    } catch {/* ignore */}
    return full.replace(match[0], "").trim();
  };

  const send = async (textRaw: string) => {
    const text = textRaw.trim();
    if (!text || streaming) return;
    const userMsg: Msg = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setStreaming(true);

    let acc = "";
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!resp.ok || !resp.body) {
        const errText = await resp.text().catch(() => "");
        let errMsg = "Sorry, something went wrong. Please try again.";
        if (resp.status === 429) errMsg = "Too many requests — please wait a moment.";
        if (resp.status === 402) errMsg = "AI credits exhausted. Please contact our team directly.";
        try { const j = JSON.parse(errText); if (j.error) errMsg = j.error; } catch {/* ignore */}
        setMessages((prev) => prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: errMsg } : m)));
        setStreaming(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let done = false;

      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buffer += decoder.decode(value, { stream: true });
        let idx: number;
        while ((idx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line || line.startsWith(":")) continue;
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(json);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              acc += delta;
              const cleaned = acc.replace(/\[LEAD\][\s\S]*$/, "").trimEnd();
              setMessages((prev) => prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: cleaned } : m)));
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      const cleaned = await extractAndStoreLead(acc);
      setMessages((prev) => prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: cleaned } : m)));
    } catch (err) {
      console.error(err);
      setMessages((prev) =>
        prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: "Network error. Please try again." } : m)),
      );
    } finally {
      setStreaming(false);
    }
  };

  const toggleVoice = () => {
    const w = window as unknown as {
      SpeechRecognition?: new () => SpeechRecognitionLike;
      webkitSpeechRecognition?: new () => SpeechRecognitionLike;
    };
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) {
      toast.error("Voice input isn't supported in this browser.");
      return;
    }
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const rec = new SR();
    rec.lang = "en-US";
    rec.continuous = false;
    rec.interimResults = false;
    rec.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput((prev) => (prev ? prev + " " : "") + transcript);
    };
    rec.onerror = () => { setListening(false); };
    rec.onend = () => setListening(false);
    rec.start();
    recognitionRef.current = rec;
    setListening(true);
  };

  const reset = () => {
    setMessages([GREETING]);
    setLeadSent(false);
    localStorage.removeItem("edge-chat");
  };

  return (
    <>
      {/* Floating launcher */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-gradient-chat shadow-glow animate-pulse-glow flex items-center justify-center text-white"
            aria-label="Open AI assistant"
          >
            <Bot size={26} />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-edge ring-2 ring-background" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[600px] max-h-[85vh] glass rounded-3xl shadow-elegant overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-chat p-4 flex items-center gap-3 text-white">
              <div className="relative h-10 w-10 rounded-full overflow-hidden ring-2 ring-white/50">
                <img src={logo} alt="Edge" className="h-full w-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="font-display font-semibold text-sm">Edge AI Assistant</div>
                <div className="flex items-center gap-1 text-[11px] opacity-90">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-300 animate-pulse" />
                  Online · usually replies instantly
                </div>
              </div>
              <button onClick={reset} className="text-xs px-2 py-1 rounded-full bg-white/15 hover:bg-white/25" aria-label="Reset chat">
                Reset
              </button>
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-full hover:bg-white/15" aria-label="Close">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-background/60">
              {messages.map((m, i) => (
                <MessageBubble key={i} msg={m} />
              ))}
              {streaming && messages[messages.length - 1]?.content === "" && <TypingDots />}

              {messages.length === 1 && (
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {QUICK_OPTIONS.map((q) => (
                    <button
                      key={q.label}
                      onClick={() => send(q.prompt)}
                      className="text-xs glass rounded-xl p-3 text-left hover:shadow-glow transition-shadow hover:-translate-y-0.5"
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="p-3 border-t border-border/60 bg-background/80 backdrop-blur flex gap-2 items-end"
            >
              <button
                type="button"
                onClick={toggleVoice}
                className={`p-2.5 rounded-full transition-colors ${listening ? "bg-destructive text-destructive-foreground animate-pulse" : "glass hover:shadow-glow"}`}
                aria-label="Voice input"
              >
                {listening ? <MicOff size={16} /> : <Mic size={16} />}
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-background/60 border border-border rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                maxLength={2000}
                disabled={streaming}
              />
              <button
                type="submit"
                disabled={streaming || !input.trim()}
                className="p-2.5 rounded-full bg-gradient-edge text-primary-foreground shadow-glow disabled:opacity-40"
                aria-label="Send"
              >
                <Send size={16} />
              </button>
            </form>
            <div className="text-[10px] text-center text-muted-foreground pb-2 inline-flex items-center justify-center gap-1">
              <Sparkles size={10} className="text-primary" /> Powered by Ajinava Edge AI
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MessageBubble({ msg }: { msg: Msg }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
          isUser
            ? "bg-gradient-edge text-primary-foreground rounded-br-sm"
            : "glass rounded-bl-sm"
        }`}
      >
        {msg.content ? (
          <div className="prose prose-sm prose-invert max-w-none [&>*]:my-1 [&_p]:my-1 [&_ul]:my-1 [&_li]:my-0.5">
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        ) : (
          <TypingDots inline />
        )}
      </div>
    </motion.div>
  );
}

function TypingDots({ inline = false }: { inline?: boolean }) {
  const dots = (
    <div className="flex items-center gap-1 py-1">
      <span className="typing-dot h-1.5 w-1.5 rounded-full bg-primary" style={{ animationDelay: "0ms" }} />
      <span className="typing-dot h-1.5 w-1.5 rounded-full bg-primary" style={{ animationDelay: "150ms" }} />
      <span className="typing-dot h-1.5 w-1.5 rounded-full bg-primary" style={{ animationDelay: "300ms" }} />
    </div>
  );
  if (inline) return dots;
  return (
    <div className="flex justify-start">
      <div className="glass rounded-2xl rounded-bl-sm px-4 py-2">{dots}</div>
    </div>
  );
}
