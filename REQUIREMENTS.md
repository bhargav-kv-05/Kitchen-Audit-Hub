# Kitchen Audit Hub - Project Requirements

## 1. Project Overview
A consumer-facing web directory that maps local delivery restaurants to their municipal health ratings, photographic hygiene audits, and safety compliance badges to solve the problem of hidden back-of-house hygiene on food delivery apps.

## 2. Tech Stack
* **Frontend:** Next.js (React), Tailwind CSS (UI generated via v0.dev)
* **Backend:** Node.js API Routes
* **Database:** MongoDB
* **Deployment:** Vercel

## 3. Core Components (Frontend)
* **Directory/Search View:** List of restaurant cards with basic A/B/C grade badges.
* **Restaurant Detail View:** Expanded view showing specific inspection history and audit images.
* **Filter Sidebar:** Filter by passing grade, distance, or cuisine.

## 4. Core Components (Backend & DB)
* **REST Endpoints:**
  * `GET /api/restaurants` (with query params for filtering)
  * `GET /api/restaurants/:id`

### Proposed JSON Schema (MongoDB)

#### Restaurant Schema
```json
{
  "name": "String (Required)",
  "address": "String (Required)",
  "location": {
    "type": "Point",
    "coordinates": ["Longitude", "Latitude"]
  },
  "cuisine": "String",
  "currentGrade": "Enum: ['A', 'B', 'C', 'Pending']",
  "badges": ["String"]
}
```

#### InspectionRecord Schema
```json
{
  "restaurantId": "ObjectId (Required - Ref: Restaurant)",
  "inspectionDate": "Date (Required)",
  "grade": "Enum: ['A', 'B', 'C'] (Required)",
  "score": "Number",
  "violations": [
    {
      "code": "String",
      "description": "String",
      "critical": "Boolean"
    }
  ],
  "auditImages": ["String (URLs)"],
  "inspectorId": "String"
}
```

## 5. Role Breakdown
* **Backend & DB (Lead Backend Developer):** Design schemas, build API routes, handle database queries.
* **Frontend UI (Member 2):** Use v0.dev to generate Tailwind components for the Directory, Cards, and Badges.
* **Frontend Integration (Member 3):** Connect the v0 static components to the Next.js API endpoints to render live data.
* **Data & Presentation (Member 4):** Generate realistic JSON mock data for restaurants/scores and produce the final AI-generated pitch video.
