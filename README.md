# Social Media App

This is a monorepo for a Social Media App, made with React TypeScript Frontend, and Node.js Express TypeScript backend

## Installation

- Clone this repo
- Cd into the root directory
- Run <code>npm install</code> to install dependencies for both front and backend
- Run <code>npm run dev</code> and check the console for the address of front and backend.
- If you want to install new libraries, add <code>--workspace=frontend</code> or <code>--workspace=backend</code> at the end of your npm install command. For example <code>npm install @mui/material @emotion/react @emotion/styled --workspace=frontend
  </code>


## Formatting
* Please install the the Prettier extension and set it as your default formatter in VSCode.
* I have set a default ruleset for Prettier in the root folder.
* Please be mindful and format safely, e.g format only the file or the block of code you worked on, so the Pull Requests are clean.

## Git branch naming convention
* Please follow this git branch naming convention <code>type/yourname-description</code>
* For example: <code>feature/dinh-nav-bar</code>
* The above convention will help sort all branches into neat trees in Git GUI like Source Tree, and we can keep track of the branches we work on easier.
* Common types for branches: feature, fix, refactor, test, docs, etc.
