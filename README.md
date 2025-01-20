# 🐱 Express TypeScript API Starter 🐱

Production-ready Express.js API boilerplate using TypeScript, ESM modules, ESLint, and Prettier.

## 🐱 Features

- **TypeScript**
- **ESM Modules** - modern js module system (replaced commonjs)
- **Express.js** - web framework
- **ESLint** + **Prettier** - code formatter
- **Hot Reload** - development server with hot reloading

Need to add ORM or Query builder. I prefer Drizzle ORM for type-safe database operations and easy migrations

## 🐱 Prerequisites

- Node.js (version >= 18)
- npm

## 🐱 Getting Started

1. Clone the repository:

```bash
git clone git@github.com:Udvalg/ts-node-express-starter-pack.git
cd express-ts-api
```

2. Install dependencies

```bash
npm install
```

3. Start development mode

```bash
npm run dev
```

## 🐱 Scripts

`npm run dev` # start development model
`npm run build` # build for production
`npm start` # run in production mode
`npm run lint` # code style 🎨

## 🐱 Project Structures

src/
├── config/ # Constants, db connections etc.,
├── routes/ # API routes
├── middleware/ # Custom middleware
├── app.ts # Express app setup
└── index.ts # Application entry point
└── logger.ts # Winston logger

## 🐱 Initital Endpoint

`GET /core/public/ready` - server aliveness endpoint

`core` - change this by update `APP_PREFIX`

## 🐱 Environment variables

Create a .env file in the root directory:

```
PORT=4000
NODE_ENV=development
```
