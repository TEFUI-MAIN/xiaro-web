# Xiaro Marketing Website

Premium public-facing marketing website for Xiaro, a Workforce Communications Platform.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Stripe Checkout Environment

Create `.env.local` from `.env.example`:

```env
STRIPE_SECRET_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
STRIPE_STARTER_PRICE_ID=
STRIPE_OPERATIONS_PRICE_ID=
STRIPE_BUSINESS_PRICE_ID=
```

Starter, Operations and Business pricing buttons call `POST /api/checkout`.
If Stripe variables are missing, the site shows a graceful "Stripe checkout not configured yet." message.

## GitHub

The repository is intended to be private.

```bash
gh auth login
gh repo create xiaro --private --source=. --remote=origin --push
```

If `xiaro` is taken, choose a name such as `xiaro-marketing`.

## Vercel

1. Import the GitHub repository into Vercel.
2. Keep the framework preset as Next.js.
3. Add the Stripe environment variables.
4. Set `NEXT_PUBLIC_APP_URL` to the Vercel production URL after the first deploy.

The free Vercel URL will usually be:

```text
https://xiaro.vercel.app
```

If that project slug is unavailable, Vercel will use an available variant such as `https://xiaro-marketing.vercel.app`.
