// ==========================================
// Lab 10: Knowledge Base Full-Text Search
// ==========================================

// Step 1: Switch to Knowledge Base Database
use('knowledgeDB');

// Step 2: Insert Organization Policy Documents
db.policies.insertMany([
  {
    policyId: "POL-001",
    title: "Remote Work & Cybersecurity Guidelines",
    category: "IT & HR",
    content: "Employees working remotely must use company VPN and enable multi-factor authentication (MFA).",
    lastUpdated: new Date("2026-01-15")
  },
  {
    policyId: "POL-002",
    title: "Data Privacy and Retention Policy",
    category: "Compliance",
    content: "Customer personal data must be encrypted at rest and retained for a maximum of five years.",
    lastUpdated: new Date("2026-03-10")
  }
]);

// Step 3: Create Text Index on title and content fields
db.policies.createIndex({ title: "text", content: "text" });

// Step 4: Search Knowledge Base for queries containing "VPN" or "security"
console.log("\n--- Full-Text Search Results: 'VPN security' ---");
const searchResults = db.policies.find(
  { $text: { $search: "VPN security" } },
  { score: { $meta: "textScore" }, title: 1, category: 1, _id: 0 }
).sort({ score: { $meta: "textScore" } }).toArray();

console.log(JSON.stringify(searchResults, null, 2));
