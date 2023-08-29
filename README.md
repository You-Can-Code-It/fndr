## How to Use this Repo

### Cloning the App

- From your terminal, go to the folder where you want to install your project and run: `git clone https://github.com/luizfiorentino/fndr.git`
- Run `npm run dev` (or `yarn dev`, or `pnpm dev`) to start the development server
- Open your localhost: [http://localhost:3000](http://localhost:3000) in your browser
- Check out the root `.env.example` file that provides the name of the local variables used in this app

### Setting Up the Development Database & Seeding the Data

- To get access to the data, you'll need to create a database (in this case we're using a Render Postgres in this example)
- Add the DATABASE_URL from your database in the `.env` root file
- Run the following commands:
- `npx prisma migrate dev` to make your database in sync with the Prisma Schema
- `npx prisma generate` to generate rsources like Prisma Client
- `npx prisma studio`, this is the interface with your database, that is empty by now, but you should already see the tables used in this app
- `npm run seed`: this is a script to insert the data into your development database

### Setting Up NextAuth

- The sign in feature is done with NextAuth using a Github account
- In your Github account, go to `Settings -> Developer Settings -> OAuth Apps -> create a new OAuth app`
- Fill in `Application name`, `Homepage URL` (http://localhost:3000), and `Authorization callback URL` (Same as Homepage URL)
- Click the `Register` application button
- Navigate to the main page of the repository
- Under your repository name, click `Settings`
- In the `Security` section of the sidebar, select ` Secrets and variables``, then click  `Actions`
- Click the `Secrets` tab then click `New repository secret`
- Copy the GITHUB_SECRET and GITHUB_ID, and add their values into the `.env` file
- The GITHUB_ID (or client id) is a public identifier of the app, whereas the GITHUB_SECRET (or client secret) is used to get an access token for the signed-in user
- Generate NEXTAUTH_SECRET with `openssl rand -base64 32` or `https://generate-secret.vercel.app/32`: it is a random value used to encrypt the NextAuth.js JWT
- Add these variables (a) GITHUB_SECRET, (b) GITHUB_ID, and (c) NEXTAUTH_SECRET to the `.env` root file (you can use the `.env.example` file to guide you)

## Deployment Important Notes

### Rotating the Ownership

- This is a collaborative project using `Vercel` to deploy it
- One student owns the Github repo, the Vercel project and database (Vercel Postgres)
- At every sprint (14 days) a new student will be assigned the ownership from it
- To transfer the ownership:
- Go to the Github repo in `Settings -> Danger Zone -> Transfer`
- Provide new owner's user name and confirm
- Open the link sent via email to the new owner, accept the assignment and follow the instructions

### Deployment vs. Local environments

- There are some differences between the `local` and the `deployment` settings (we're using Vercel in this documentation):
- To set local variables in the deployment environment, go to your selected project on Vercel, on `Settings -> Environment Variables`
- There, fill in the `Key` and `Value` fields. In this case, they are added one by one
- Don't use quotes between the values
- If you're using a Vercel Postgres database for the deployment/production environment, use the value from `POSTGRES_PRISMA_URL` (it's on the ` Storage`` ->  `.env.local` tab`) on the key `DATABASE_URL`. It is important that the URL contains `pgbouncer=true&connect_timeout=15` in its last section, in order to perform the user login with NextAuth
- It is necessary to override the `Build command` in `Settings -> General` to: `npx prisma migrate deploy && npx prisma generate && npm run build` (note that here we're not using `npx prisma migrate dev`)
- Problem: to run the `prisma/seed.ts` script (insert company data into the deplyment database) is not possible directly in the deployment environment. Solution: you can temporarily replace the `DATABASE_URL` value in the `.env` root file (on VS Code) for the Vercel Postgres URL (note that now you should use quotes), and then run the script in your terminal: `npm run seed`
