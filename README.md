# shortly.

A minimalist URL shortener built with Next.js, PostgreSQL and Prisma.

🔗 **Live demo:** [shortly-alexsilva2.vercel.app](https://shortly-alexsilva2.vercel.app)

## Features

- 🔗 Shorten any URL instantly
- 📊 Track clicks per link
- ⏱️ Auto-expiration after 7 days
- 🗑️ Delete links from dashboard
- 📋 One-click copy
- ✅ URL validation

## Tech Stack

- **Frontend:** Next.js 16 · Tailwind CSS · TypeScript
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL · Prisma ORM
- **Deploy:** Vercel · Railway

## Getting Started

```bash
# Clone the repository
git clone https://github.com/alexsilva2/shortly

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your DATABASE_URL

# Run database migrations
npx prisma migrate dev

# Start the development server
npm run dev
```

## Environment Variables

```
DATABASE_URL=postgresql://...
```

## Author

**Alex Silva** — Full-Stack Developer
- LinkedIn: [linkedin.com/in/alexdevv](https://linkedin.com/in/alexdevv)
- GitHub: [github.com/alexsilva2](https://github.com/alexsilva2)
