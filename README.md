# AI Reality Check

## 📖 Project Overview
AI Reality Check is a full‑stack web application that helps detect cognitive biases, manipulation, and logical flaws in thinking.  
It empowers users to make clearer, more rational decisions with AI‑powered analysis.

## 🚀 Tech Stack
- **Frontend:** React + Vite + TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Node.js (Vercel serverless functions in `/api`)
- **Database:** Supabase (Postgres + Auth + Storage)
- **Deployment:** Vercel

## 📂 Project Structure
repo-root/ ├── src/                # React frontend code ├── public/             # Static assets ├── api/                # Backend routes (serverless functions) │   ├── hello.ts        # Example API endpoint │   ├── users.ts        # User-related logic │   └── auth.ts         # Authentication logic ├── supabase/           # Database setup & helpers ├── package.json        # Dependencies & scripts ├── vite.config.ts      # Vite config ├── vitest.config.ts    # Vitest test config ├── tsconfig.json       # Base TypeScript config ├── tsconfig.app.json   # Frontend TypeScript config ├── tsconfig.node.json  # Backend TypeScript config ├── tailwind.config.ts  # Tailwind config ├── postcss.config.js   # PostCSS config ├── eslint.config.js    # ESLint config ├── .env                # Environment variables (not committed) ├── .gitignore          # Ignore unnecessary files ├── README.md           # Documentation

⚙️ Setup Instructions


1. **Clone the repo**
   
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>
2. Install dependencies
npm install
-(or bun install if you’re using Bun)
3.Run the app
npm run dev
 4.Frontend → http://localhost:5173 (localhost in Bing)
5. Backend → http://localhost:5173/api/hello (localhost in Bing)
6. Deploy to Vercel
7. Push to GitHub
8. Connect repo to Vercel
9. Add environment variables (SUPABASE_URL, SUPABASE_KEY, DATABASE_URL) in Vercel settings
10. Done 

 📊 Project Details

### 🔎 Problem Statement
People often fall victim to cognitive biases, manipulation, and scams because they lack tools to critically evaluate information.  
AI Reality Check addresses this by providing AI‑powered analysis that highlights logical flaws and manipulative patterns.

### 🎯 Objectives
- Help users identify biases in their reasoning.
- Detect manipulation or scam‑like language in text.
- Provide clear, actionable feedback for better decision‑making.
- Store user data securely with Supabase for persistence.

### 🛠 Features
- **Bias Detection**: Analyze text for common cognitive biases.
- **Scam Analysis**: Identify manipulative or misleading language.
- **User Authentication**: Secure login and signup via Supabase.
- **Database Integration**: Persistent storage of user inputs and results.
- **Modern UI**: Responsive design with Tailwind CSS.
- **Serverless Backend**: APIs deployed on Vercel for scalability.

### 🏗 Architecture
- **Frontend**: React + Vite + TypeScript for fast, modern UI.
- **Backend**: Node.js serverless functions in `/api` folder.
- **Database**: Supabase (Postgres + Auth + Storage).
- **Deployment**: Vercel for seamless hosting and CI/CD.

### 📈 Impact
AI Reality Check empowers users to:
- Think more critically.
- Avoid scams and manipulation.
- Make rational, informed decisions.

## 🔮 Future Improvements

While AI Reality Check already provides bias detection and scam analysis, we plan to expand its capabilities with:
Mobile App Version: Build a cross‑platform mobile app for easier access.
Multi‑Language Support: Analyze text in multiple languages to reach a wider audience.
Advanced Bias Detection: Incorporate more nuanced psychological models for deeper analysis.
User Dashboard: Personalized history of analyses, insights, and progress tracking.
Collaboration Features: Allow teams to share and compare analysis results.
AI Explanations: Provide detailed reasoning behind each bias or manipulation flag.

Point of contact:
Name : K.Deepika
Email: kethavathdeepika14@gmail.com
github: Deepikanayak14/
ai-reality-check




