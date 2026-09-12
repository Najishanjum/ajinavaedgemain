import { defineTool } from "@lovable.dev/mcp-js";
import { services } from "@/lib/site-data";

export default defineTool({
  name: "list_services",
  title: "List services",
  description: "List all IT services offered by Ajinava Edge (AI/ML, Web & App, Cloud, etc.) with descriptions and tags.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const items = services.map((s) => ({
      title: s.title,
      description: s.desc,
      tags: s.tags,
      features: s.features,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { services: items },
    };
  },
});
