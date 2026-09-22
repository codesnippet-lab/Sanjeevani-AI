# Sanjeevani AI - Multilingual Patient Case Taking

A modern, responsive, voice-enabled patient case-taking and clinical triage application built with React, TypeScript, Tailwind CSS, and Web Speech APIs (supporting English, Hindi, and Kannada).

---

## 🚀 Quick Deploy to Vercel

You can deploy this repository directly to **Vercel** with zero extra configuration:

### Method 1: Push to GitHub & Import to Vercel (Recommended)
1. **Download / Clone** or export this repository as a ZIP.
2. Create a new repository on [GitHub](https://github.com/new) (e.g., `sanjeevani-ai`).
3. Push all files to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Sanjeevani AI"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
4. Go to [Vercel Dashboard](https://vercel.com/new).
5. Click **"Import Project"** and select your GitHub repository.
6. Configure Project Settings (Vercel will auto-detect Vite):
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
7. *(Optional)* If using the Gemini API key, add `GEMINI_API_KEY` under **Environment Variables**.
8. Click **Deploy**. Your app will be live with an SSL HTTPS URL in ~1 minute!

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🛠️ Tech Stack & Features
- **Frontend**: React 19, TypeScript, Vite 6, Tailwind CSS v4
- **Animations**: Motion
- **Icons**: Lucide React
- **Audio & Speech**: HTML5 Web Speech API (`SpeechRecognition` & `SpeechSynthesis`) with fallback audio synthesis
- **Routing & Rewrites**: Includes `vercel.json` SPA routing support for direct page reloads
