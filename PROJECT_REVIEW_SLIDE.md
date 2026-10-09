# Project Review Slide Content

**Project Title:** Kitchen Audit Hub

**Problem Statement:** 
"Why can't consumers see verified kitchen safety standards on food delivery apps?" 
Currently, official inspection reports are buried in dense government portals, hiding back-of-house hygiene from the public. Kitchen Audit Hub makes this data transparent and accessible so consumers can choose where to order food with confidence.

**Tech Stack:** 
- **Frontend:** Next.js (React), Tailwind CSS (v0.dev)
- **Backend:** Node.js (Next.js API Routes)
- **Database:** MongoDB
- **AI Technologies:** Groq API (Llama 3 / Qwen 27b) for real-time natural language summaries
- **Deployment & Tools:** Vercel, Git/GitHub

**Key Features:** 
- **Directory & Search:** Clean, visual dashboard listing restaurants with simple A/B/C health grade badges and rich filtering (cuisine, distance, grade).
- **AI Health Summaries:** Dynamically generated, plain-language summaries of recent inspections powered by Groq LLM.
- **Detailed Audit Views:** Deep dives into specific inspection history, open violations, and safety scores.

**Implementation Status:** 
- **Completed:** MongoDB schema design, API routes built, complete v0 UI frontend integration, mock data seeding, and Groq AI pipeline wired into the detail pages.
- **Remaining Tasks:** Optimizing the AI prompt logic for stricter food safety analysis, polishing minor UI pages (Saved/Profile), and final deployment to production on Vercel.

**Expected Outcome:** 
A consumer-facing web directory ("Food Safety Discovery Engine") that successfully translates dense municipal inspection reports into clear grades, scores, and AI summaries, empowering users to make informed, safe dining choices.

**Team Contributions:** 
- **Member 1 (Bhargav):** Designed MongoDB schemas and built Next.js REST API routes and managed the Git workflow.
- **Member 2 (Sanjana):** Frontend UI design and Tailwind component generation (via v0).
- **Member 3 (Praneeth):** Connected static UI components to live database endpoints.
- **Member 4 (Haseeba):** Generated mock data, engineering the Groq AI prompts.
