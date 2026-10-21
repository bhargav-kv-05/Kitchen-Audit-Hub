# Kitchen Audit Hub 🛡️
> **Know the Kitchen Before You Order.**  
> A public-facing hygiene transparency platform and geospatial directory transforming municipal food safety inspection records into clear, actionable consumer intelligence.

---

## 🍽️ The Problem
Popular food delivery platforms (Swiggy, Zomato) only display taste reviews, food photography, and delivery times—leaving consumers completely blind to back-of-house kitchen hygiene and food safety compliance. 

Official municipal inspection reports (FSSAI/GHMC) frequently cite critical violations such as rodent activity, temperature abuse (e.g. ambient chicken thawing), and severe cross-contamination. However, these reports remain buried inside complex government PDF portals.

## 💡 The Solution
**Kitchen Audit Hub** serves as an accessible public safety layer that aggregates official inspection data across Hyderabad, normalizes it into a standardized **4-tier health rating scale (Grade A to Failed)**, and delivers instant transparency through:
- **Interactive Geospatial Map:** Explore neighborhood kitchens with color-coded pins across 10 Hyderabad localities.
- **Groq-Powered AI Health Summaries:** Converts dense, multi-page audit records into concise, 3-sentence consumer verdicts.
- **6-Pillar Safety Breakdown:** Granular scoring across Food Handling, Temperature Control, Cold Storage, Kitchen Hygiene, Pest Control, and Employee Hygiene.
- **Live Push Alerts & Community Reporting:** Real-time notification bell for recent audit citations and an inspection lead intake portal (`/contact`).
- **Dark / Light Theme Engine:** High-contrast, accessibility-focused interface with mobile-first navigation.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | [Next.js 15](https://nextjs.org/) (App Router), [React 19](https://react.dev/), TypeScript, Vanilla CSS Design System, Lucide Icons |
| **Geospatial Mapping** | [Leaflet.js](https://leafletjs.com/), OpenStreetMap Tile Network (with Dark Mode Inversion Filter) |
| **Backend & APIs** | Next.js Route Handlers & Server Components (Node.js runtime) |
| **Database** | [MongoDB Atlas](https://www.mongodb.com/atlas) with Mongoose ODM (Connection caching for serverless execution) |
| **AI Inference** | [Groq Cloud SDK](https://groq.com/) (`qwen/qwen3.8-27b`) for certified auditor plain-language summarization |
| **Deployment** | [Vercel](https://vercel.com/) (CI/CD Production & Staging Pipelines) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18+ or 20+
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- A free [Groq Cloud](https://console.groq.com/) API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bhargav-kv-05/Kitchen-Audit-Hub.git
   cd Kitchen-Audit-Hub
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the project root:
   ```env
   MONGODB_URI="mongodb+srv://<username>:<password>@cluster.mongodb.net/kitchen_audit_hub?retryWrites=true&w=majority"
   GROQ_API_KEY="gsk_..."
   ```

4. **Seed Database (Initial 28 Hyderabad Establishments):**
   Start the development server and navigate to:
   ```
   http://localhost:3000/api/seed
   ```

5. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

```
kitchen-audit-hub/
├── app/
│   ├── api/               # Next.js Route Handlers (/restaurants, /seed, /explain)
│   ├── about/             # Mission, public health principles, and methodology
│   ├── contact/           # Consumer lead intake form & emergency GHMC helpline
│   ├── health-ratings/    # 4-tier grading guide (A, B, C, F) & 6 evaluation pillars
│   ├── inspections/       # Full searchable municipal inspection database
│   ├── map/               # Interactive Leaflet geospatial map explorer
│   ├── privacy/           # Public health data transparency policy
│   ├── restaurants/       # Directory explorer & dynamic restaurant profile routes
│   ├── settings/          # Consumer risk threshold & theme preferences
│   └── layout.tsx         # Root layout with responsive AppShell & ThemeProvider
├── components/            # Reusable UI components (Map, Header, Sidebar, Cards, etc.)
├── lib/                   # Utilities, filters, MongoDB client, and restaurant data
├── models/                # Mongoose database models (Restaurant, InspectionRecord)
└── public/                # Static assets, cuisine imagery, and icons
```

---

## 📜 License
This project is developed for educational and public health demonstration purposes.
