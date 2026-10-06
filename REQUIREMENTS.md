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
* **Data, AI & Presentation (Member 4):** Generate realistic JSON mock data for risk prediction scores, write prompts for the Groq AI LLM explanations, and produce the final AI-generated pitch video.

## 6. Git Collaboration Workflow (CRITICAL)

To ensure smooth collaboration and safe integrations over our 2-week timeline, we will use an **Integration Branch Strategy**:

* **The Environments:**
  * `main`: The protected production branch.
  * `staging` (or `feat/test`): The shared integration branch. All completed features are merged here for testing before they touch `main`.
* **Branching:** All feature work must be done on separate branches created from `staging` (e.g., `feat/backend-api`, `feat/directory-ui`) and submitted via Pull Request to `staging`.
* **Switching Branches:** Use `git checkout <branch-name>` to switch between tasks or restore files from the commit history.
* **Fetching Updates:** Use `git fetch origin` to retrieve updates from the remote repository without merging them into the local branch, ensuring the working directory remains unaffected.
* **Merging Changes:** Use `git pull origin staging` to fetch and integrate changes from the remote repository into the current branch in one step. Note that this can lead to merge conflicts if there are conflicting changes between the local and remote branches.
* **Integrating Feature Branches:** Use `git merge <branch-name>` to integrate changes from one branch into another, combining the commit histories.
* **Rebasing (Advanced):** Use `git rebase staging` on your feature branch to reapply commits on top of the base branch, creating a clean, linear history. *Warning: Rebase rewrites commit history and should be used carefully with shared branches.*
* **Undoing Changes:** Use `git reset (--soft, --mixed, or --hard)` to move the current branch to a specific commit and manage changes in the staging area or working directory.
* **Final Merge:** Once all features are successfully integrated and tested in the `staging` branch, a final PR will merge `staging` into `main`. Empty dangling branches can then be deleted.
* **Documentation:** We will use this REQUIREMENTS file to provide documentation for the repository.