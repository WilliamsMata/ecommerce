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
- Copy the .env.example file to .env and update the DATABASE_URL environment variable with your database connection URL.

4. Run database migrations:

```bash
npx prisma migrate dev --name init
```

5. Start the development server:

```bash
npm run dev
```
