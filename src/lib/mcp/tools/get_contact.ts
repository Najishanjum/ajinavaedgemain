import { defineTool } from "@lovable.dev/mcp-js";
import { socialLinks } from "@/lib/site-data";

const contact = {
  email: "ajinavaedge@gmail.com",
  phone: "+91 9109530117",
  address: "Jabalpur, Madhya Pradesh, India 482004",
  joinCommunity: "https://chat.whatsapp.com/IJw256xuepP956JsufMY6g",
  website: "https://ajinavaedgein.lovable.app",
};

export default defineTool({
  name: "get_contact_and_social_links",
  title: "Contact and social links",
  description: "Get Ajinava Edge contact info (email, phone, address) and all official social/community links.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const result = { contact, social: socialLinks };
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      structuredContent: result,
    };
  },
});
