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

## 6. Git Collaboration Workflow (CRITICAL)

* **Branching:** The `main` branch is protected. All feature work must be done on separate branches and submitted via Pull Request.
* **Switching Branches:** Use `git checkout <branch-name>` to switch between tasks or restore files from the commit history.
* **Fetching Updates:** Use `git fetch origin` to retrieve updates from the remote repository without merging them into the local branch, ensuring the working directory remains unaffected.
* **Merging Changes:** Use `git pull origin main` to fetch and integrate changes from the remote repository into the current branch in one step. Note that this can lead to merge conflicts if there are conflicting changes between the local and remote branches.
* **Integrating Feature Branches:** Use `git merge <branch-name>` to integrate changes from one branch into another, combining the commit histories.
* **Rebasing (Advanced):** Use `git rebase main` on your feature branch to reapply commits on top of the base branch, creating a clean, linear history. Warning: Rebase rewrites commit history and should be used carefully with shared branches.
* **Undoing Changes:** Use `git reset (--soft, --mixed, or --hard)` to move the current branch to a specific commit and manage changes in the staging area or working directory.
* **Documentation:** We will use this README file to provide documentation for the repository.
