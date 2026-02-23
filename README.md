# 📚 Exam Notes AI

AI-powered exam preparation platform built with Next.js.  
Generate smart notes, short answers, long answers, and important questions instantly.

---

## Features

- ✨ AI-generated Notes
- 📝 Short & Long Answers
- 🔥 Important / Very Important Questions
- 💳 Credit-based system
- 💰 Stripe Payment Integration
- 🔐 Authentication (Login / Register)
- ⚡ Fast & Responsive UI

---

## 🛠 Tech Stack

- **Frontend:** Next.js / React / Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** MongoDB
- **Auth:** NextAuth / Custom Auth
- **Payments:** Stripe
- **Animations:** Framer Motion

---

## 💳 Payment System

Users can purchase credits using Stripe.

Available Plans:

| Amount | Credits |
|--------|---------|
| ₹100   | 50      |
| ₹200   | 150     |
| ₹500   | 300     |

✔ Secure Checkout  
✔ Webhook-based Credit Update  

---

## 🔐 Authentication

- Protected Routes via Middleware / Proxy
- Unauthorized users redirected to Register/Login

---

## 📦 Installation

```bash
git clone <your-repo-url>
cd <project-folder>
npm install
npm run dev
