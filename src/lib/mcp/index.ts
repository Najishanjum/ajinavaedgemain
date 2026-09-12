import { defineMcp } from "@lovable.dev/mcp-js";
import listServices from "./tools/list_services";
import listEvents from "./tools/list_events";
import listPartners from "./tools/list_partners";
import listAnnouncements from "./tools/list_announcements";
import getContact from "./tools/get_contact";

export default defineMcp({
  name: "ajinava-edge-mcp",
  title: "Ajinava Edge MCP",
  version: "0.1.0",
  instructions:
    "Public MCP server for Ajinava Edge — a Web3 and AI-driven youth community. Use these tools to discover services, upcoming events and workshops, community partners, announcements, and official contact/social links.",
  tools: [listServices, listEvents, listPartners, listAnnouncements, getContact],
});
