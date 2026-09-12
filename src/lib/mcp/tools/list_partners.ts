import { defineTool } from "@lovable.dev/mcp-js";
import { partners } from "@/lib/site-data";

export default defineTool({
  name: "list_community_partners",
  title: "List community partners",
  description: "List Ajinava Edge community partners (hackathons, community organizations, events) with their roles.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const items = partners.map((p) => ({ name: p.name, role: p.role }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { partners: items },
    };
  },
});
