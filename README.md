# Social Media App

This is a monorepo for a Social Media App, made with React TypeScript Frontend, and Node.js Express TypeScript backend

## Installation

### Basic setup
- Clone this repo
- Cd into the root directory
- Run `npm install` to install dependencies for both front and backend
- Run `npm run dev` and check the console for the address of front and backend.
- If you want to install new libraries, add `--workspace=frontend` or `--workspace=backend` at the end of your npm install command. For example `npm install @mui/material @emotion/react @emotion/styled --workspace=frontend
  `

### Get backend and local MongoDB up and running
* Create a file named `.env` in `packages/backend`
* Copy and paste this content into the `.env` file
```
DATABASE_URL="mongodb://127.0.0.1/socialMediaApp?directConnection=true"
JWT_SECRET="<ask for secret from our developers>"
```
* Download and MongoDB Community Server and follow the default installation from [here](https://www.mongodb.com/try/download/community)
* Open MongoDBCompass and connect to `localhost:27017` (should be there by default), to confirm that the local database is up and running.
* Use Postman or another method of your choice to send requests. In my case, I sent a Post request to `http://localhost:5000/api/auth/register`, with this body/raw/json:
  ```
  {
  "username": "testuser",
  "password": "password123"
  }
  ```
* Refresh the database in MongoDBCompas, you should see `socialMediaApp` database was created, `users` collection, and a new user inside.

## Formatting
* Please install the the Prettier extension and set it as your default formatter in VSCode.
* I have set a default ruleset for Prettier in the root folder.
* Please be mindful and format safely, e.g format only the file or the block of code you worked on, so the Pull Requests are clean.

## Git branch naming convention
* Please follow this git branch naming convention `type/yourname-description`
* For example: `feature/dinh-nav-bar`
* The above convention will help sort all branches into neat trees in Git GUI like Source Tree, and we can keep track of the branches we work on easier.
* Common types for branches: feature, fix, refactor, test, docs, etc.

## Other development instructions
* Instructions on how to work on the code will be added in the README file in the respective `packages/frontend` or `packages/backend` folder.
