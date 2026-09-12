import { defineTool } from "@lovable.dev/mcp-js";
import { announcements } from "@/lib/site-data";

export default defineTool({
  name: "list_announcements",
  title: "List announcements",
  description: "List recent announcements from Ajinava Edge (launches, partnerships, community milestones).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(announcements, null, 2) }],
    structuredContent: { announcements },
  }),
});
