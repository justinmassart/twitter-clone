# Twitter clone

## Table of Contents

- [Twitter clone](#twitter-clone)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [What you’ll need to run the app](#what-youll-need-to-run-the-app)
  - [Nuxt Minimal Starter](#nuxt-minimal-starter)
    - [Setup](#setup)
    - [Development Server](#development-server)
    - [Production](#production)

## Introduction

Feel free to visit and test this project [here]('https://twitter-clone-git-develop-justin-massarts-projects.vercel.app/').

I made this project following a YouTube tutorial to primarily learn Vue 3 and Nuxt 3, and also MongoDB and Prisma.

The tutorial stopped with the ability to :

- Login
- Post a tweet
- Answer a tweet
- Add an image in a tweet (using Cloudinary)
- Search the app for tweets
- Deploy the app (using Vercel)

I added the ability to register for now, and I’m planning to do more features in the future since the tutorial didn’t cover some important features such as the lazy loading of tweets, the follow system, the ability to update our profile, the ability to manage our tweets, displaying forms errors, ...

## What you’ll need to run the app

In .env :

```sh
# .env
DATABASE_URL="YOUR_MONGODB_URL"

JWT_REFRESH_TOKEN_SERCET='ANY_RANDOM_STRING'
JWT_ACCESS_TOKEN_SERCET='ANY_RANDOM_STRING'

CLD_CLOUD_NAME="YOUR_CLOUDINARY_CLOUD_NAME"
CLD_API_KEY="YOUR_CLOUDINARY_API_KEY"
CLD_API_SECRET="YOUR_CLOUDINARY_API_SECRET_KEY"
```

In nuxt.config.ts :

```ts
// nuxt.config.ts
{

  // ...

  build: {
    transpile: ["@heroicons/vue"],
  },
  runtimeConfig: {
    jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SERCET,
    jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SERCET,
    cldCloudName: process.env.CLD_CLOUD_NAME,
    cldApiKey: process.env.CLD_API_KEY,
    cldApiSecret: process.env.CLD_API_SECRET,
  },
  pages: true,
  }
```

In tailwind.config.ts :

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [],
  darkMode: "class",
  safelist: [
    {
      pattern: /text-(red|green|blue)-(100|400)/,
      variants: ["group-hover"],
    },
  ],
  theme: {
    screens: {
      xs: "614px",
      sm: "1002px",
      md: "1022px",
      lg: "1092px",
      xl: "1280px",
    },
    extend: {
      colors: {
        dim: {
          50: "#5F99F7",
          100: "#5F99F7",
          200: "#38444d",
          300: "#202e3a",
          400: "#253341",
          500: "#5F99F7",
          600: "#5F99F7",
          700: "#192734",
          800: "#162d40",
          900: "#15202b",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;

```

## Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

### Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

### Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

### Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
