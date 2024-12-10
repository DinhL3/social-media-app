# Social Media App

This is a monorepo for a Social Media App, made with React TypeScript Frontend, and Node.js Express TypeScript backend

![Root view desktop](https://res.cloudinary.com/doeoghxhd/image/upload/v1733009382/social-media-app/social-root_asoztg.png)
![Post details view mobile](https://res.cloudinary.com/doeoghxhd/image/upload/v1733009410/social-media-app/social-post-details_ljsu6w.png)

## Introduction

The Social Media App is designed to facilitate meaningful connections and interactions among users. Key features include:

- **User Authentication**: Secure login and registration.
- **Post Creation**: Users can create, edit, and delete posts with text and images.
- **Comments**: Engage with posts through comments and likes.
- **Friend Management**: Send, accept, and remove friend requests.
- **User Profiles**: View and update user profiles.
- **Real-time Chat**: Communicate with friends in real-time via DMs.

## Installation

### Basic setup

- Clone this repo

* Or if you are already working on it, make it a habit to `git checkout main` & `git pull` (get the lastest change in main branch), then `git checkout <your-branch>` & `git merge main` (merge the latest changes in main branch to your branch), to solve conflicts early.

- Cd into the root directory
- Run `npm install` to install dependencies for both front and backend
- Run `npm run dev` and check the console for the address of front and backend.
- If you want to install new libraries, add `--workspace=frontend` or `--workspace=backend` at the end of your npm install command. For example:

```
npm install @mui/material @emotion/react @emotion/styled --workspace=frontend
```

### Get backend and local MongoDB up and running

- Create a file named `.env` in `packages/backend`
- Copy and paste this content into the `.env` file

```
DATABASE_URL="mongodb://127.0.0.1/socialMediaApp?directConnection=true"
JWT_SECRET="<ask for secret from our developers>"
```

- Download and MongoDB Community Server and follow the default installation from [here](https://www.mongodb.com/try/download/community)
- Open MongoDBCompass and connect to `localhost:27017` (should be there by default), to confirm that the local database is up and running.
- Use Postman or another method of your choice to send requests. In my case, I sent a Post request to `http://localhost:5000/api/auth/register`, with this body/raw/json:
  ```
  {
  "username": "testuser",
  "password": "password123"
  }
  ```
- Refresh the database in MongoDBCompas, you should see `socialMediaApp` database was created, `users` collection, and a new user inside.
- Create `uploads` folder inside `packages/backend/`, so we have `packages/backend/uploads` to store images. This is just for demo purpose, which is supposed to be replaced by cloud image storage.

## Formatting

- Please install the the Prettier extension and set it as your default formatter in VSCode.
- I have set a default ruleset for Prettier in the root folder.
- Please be mindful and format safely, e.g format only the file or the block of code you worked on, so the Pull Requests are clean.

## Git branch naming convention

- Please follow this git branch naming convention `type/yourname-description`
- For example: `feature/dinh-nav-bar`
- The above convention will help sort all branches into neat trees in Git GUI like Source Tree, and we can keep track of the branches we work on easier.
- Common types for branches: feature, fix, refactor, test, docs, etc.

## Other development instructions

- Instructions on how to work on the code will be added in the README file in the respective `packages/frontend` or `packages/backend` folder.
