import { defineTool } from "@lovable.dev/mcp-js";
import { events } from "@/lib/site-data";

export default defineTool({
  name: "list_events",
  title: "List events",
  description: "List Ajinava Edge events, workshops, hackathons and sessions with dates, locations, descriptions and registration links.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const items = events.map((e) => ({
      title: e.title,
      date: e.date,
      type: e.type,
      location: e.location,
      description: e.desc,
      registerLink: e.link,
      registerCta: e.cta,
      secondaryLink: e.secondaryLink,
      secondaryCta: e.secondaryCta,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { events: items },
    };
  },
});
