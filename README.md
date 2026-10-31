# Lab 10: Knowledge Base Full-Text Search (MongoDB)

A MongoDB project demonstrating full-text indexing and relevance-scored text search on organization policy documents.

## Database & Collection Overview

- **Database**: `knowledgeDB`
- **Collection**: `policies`

### Document Schema
| Field | Type | Description |
|---|---|---|
| `policyId` | String | Unique policy identifier (e.g., `"POL-001"`) |
| `title` | String | Policy headline / title |
| `category` | String | Department or classification (e.g., `"IT & HR"`, `"Compliance"`) |
| `content` | String | Detailed policy text |
| `lastUpdated` | Date | Date when policy was last revised |

---

## Steps Implemented

1. **Database Selection**:
   Switch to `knowledgeDB`.

2. **Insert Documents**:
   Insert sample organization policies for Remote Work Guidelines and Data Privacy.

3. **Text Index Creation**:
   Create a compound full-text index across `title` and `content`:
   ```javascript
   db.policies.createIndex({ title: "text", content: "text" });
   ```

4. **Full-Text Search & Relevance Ranking**:
   Search for documents matching `"VPN security"`, projecting the match relevance score (`$meta: "textScore"`) and sorting by highest relevance:
   ```javascript
   db.policies.find(
     { $text: { $search: "VPN security" } },
     { score: { $meta: "textScore" }, title: 1, category: 1, _id: 0 }
   ).sort({ score: { $meta: "textScore" } });
   ```

---

## File Structure

- [`policies.js`](policies.js): MongoDB script executable via `mongosh policies.js`.
- [`policies.mongodb.js`](policies.mongodb.js): MongoDB playground script for the VS Code MongoDB Extension.
- [`.gitignore`](.gitignore): Standard ignore patterns for logs and temporary files.

---

## Running the Script

### Using Mongo Shell (`mongosh`)
```bash
mongosh policies.js
```

### Expected Output
```json
[
  {
    "title": "Remote Work & Cybersecurity Guidelines",
    "category": "IT & HR",
    "score": 0.5416666666666666
  }
]
```

