## How to Use this Repo

### Cloning the App

- From your terminal, go to the folder where you want to install this project and run: `git clone https://github.com/luizfiorentino/fndr.git`
- NOTE: this URL may change due to ownership transfer, so please double check it!
- Run `npm run dev` (or `yarn dev`, or `pnpm dev`) to start the development server
- Open your localhost: [http://localhost:3000](http://localhost:3000) in the browser
- Check out the root `.env.example` file that provides the name of the local variables used in this app

### Setting Up the Development Database & Seeding the Data

- To get access to the data, you'll need to create a database
- We're using a `Render Postgres` DB in this example
- Add the `DATABASE_URL` from your database in the `.env` root file
- Run the following commands in the terminal:
- `npx prisma migrate dev` to make your database in sync with the Prisma Schema
- `npx prisma generate` to generate resources like `Prisma Client`
- `npx prisma studio`, to open the interface with your database, that is empty by now, but you should already see the tables used in this app
- `npm run seed` to insert the companies' data into the database

### Setting Up NextAuth/OAuth (NextAuth.js is becoming Auth.js)

- The sign in feature is done with `NextAuth` using a Github account
- In your Github account, go to `Settings -> Developer Settings -> OAuth Apps -> create a new OAuth app`
- Fill in `Application name`, `Homepage URL` (http://localhost:3000), and `Authorization callback URL` (Same as Homepage URL)
- Click the `Register` application button
- Navigate to the main page of the repository
- Under your repository name, click `Settings`
- In the `Security` section of the sidebar, select `Secrets and variables`, then click `Actions`
- Select the `Secrets` tab then click `New repository secret`
- Copy the GITHUB_SECRET and GITHUB_ID, and add their values into the `.env` file
- GITHUB_ID (or client id) is a public identifier of the app, whereas GITHUB_SECRET (or client secret) is used to get an access token for the signed-in user
- NEXTAUTH_SECRET is a random value used to encrypt the NextAuth.js JWT (JSON webtoken).
- You can generate it running in the terminal the command: `openssl rand -base64 32` or (b) in your browser, accessing the URL: `https://generate-secret.vercel.app/32`
- Add these variables (a) GITHUB_SECRET, (b) GITHUB_ID, and (c) NEXTAUTH_SECRET to the `.env` root file (you can use the `.env.example` file to guide you)

Here is a video to illustrate how to do these steps:

https://github.com/luizfiorentino/fndr/assets/20372832/1dd62171-d0cc-409b-8706-3ddf6f5ebf75

## Deployment Important Notes

### Rotating the Ownership

- This is a collaborative project using `Vercel` to deploy it
- One student owns the Github repo, the Vercel project and database (Vercel Postgres)
- At every sprint (14 days) a new student will be assigned the ownership from it
- To transfer the ownership:

(a) On Github

- Go to `github.com/yourUserName/fndr/transfer` (it's the same path as Settings -> Danger Zone -> Transfer)
- Ask Rein to add you to `You-Can-Code-It`: it will be necessary in the section `Choose the owner/Select one of my organizations`
- Set the new user name and confirm
- New user: open the link sent via email, accept the invite and follow the instructions

(b) On Vercel:

- Go to `vercel.com/yourUserName/fndr/settings` (it's the same path as Settings -> General -> Transfer)
- Click on the `Transfer` button, and select a Vercel account
- Create a new team using free trial option (you can later cancel it)
- Click on `continue` and follow the instructions
- To transfer the ownership also from the database, go to Vercel dashboard, click on the `Storage` tab on the top bar menu, select the database (`fndr-prod`) and go to `Settings -> Transfer Database`
- Click on `Transfer Database`, and then `Select a Destination`

### Deployment vs. Local environments

- There are some differences between the `local` and the `deployment` settings (we're using `Vercel` and `Vercel Postgres DB` in this documentation):
- To set local variables in the deployment environment, go to your selected project on Vercel, on `Settings -> Environment Variables`
- There, fill in the `Key` and `Value` fields. In this case, they are added one by one
- Don't use quotes between the values
- Use the value from `POSTGRES_PRISMA_URL` (look on the `Storage -> .env.local` tab) on the key `DATABASE_URL`. It is important that the URL contains `pgbouncer=true&connect_timeout=15` in its last section, in order to perform the user login with NextAuth
- It is necessary to override the `Build command` in `Settings -> General` to: `npx prisma migrate deploy && npx prisma generate && npm run build` (note that here we're not using `npx prisma migrate dev`)
- Problem: to run the `prisma/seed.ts` script (insert company data into the deplyment database) is not possible directly in the deployment environment. Solution: you can temporarily replace the `DATABASE_URL` value in the `.env` root file (on VS Code) for the Vercel Postgres URL (note that now you should use quotes), and then run the script in your terminal: `npm run seed`
