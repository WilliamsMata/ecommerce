# Teslo Shop

Teslo Shop is a modern e-commerce platform built with Next.js, NextAuth, Material UI, Prisma, MySQL, TypeScript, and SWC. It provides a seamless shopping experience for customers while also offering an easy-to-use interface for store owners to manage their products and orders.

## Features

- User authentication and authorization with NextAuth
- ISR and SSR
- Responsive design with Material UI
- Database management with Prisma and MySQL
- Type-safe code with TypeScript
- Integration with PayPal
- Data cache with SWR
- Scalable and modular codebase

## Instalation

1. Clone the repository:

```
git clone https://github.com/WilliamsMata/ecommerce.git
```

2. Install dependencies:

```bash
cd ecommerce

npm install
# or
yarn
```

3. Set up the database:

- Create a new MySQL database on your local machine or on a remote server.
- Copy the .env.example file to .env and update all the environment variables.

4. Run database migrations:

```bash
npx prisma migrate dev --name init
```

5. Start the development server:

```bash
npm run dev
```
