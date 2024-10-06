# Frontend

## Introduction
Our frontend is made with React TypeScript, Router, Redux, Material UI.

## Material UI Components
We use Material UI Components instead of plain HTML & CSS due to limited time budget.
Details on how to add, customize, style components can be found on Material documentation. Just search for example `Material list`.
Try to find MUI components that suit your needs first before using simple html tags, since those already have responsive formatting built in. E.g. `<Typography variant="h3"/>` instead of `<h3>`.
They are very specific on how to change their button color, components pallete, so try to find a solution there since in many cases, try to change things using in-line css e.g. `sx={{background: 'red'}}` does not work.

## General structure
Due to the way React Router is set up, the pages are "routes" and you should look it `src/routes` first, then follow the component chain. For example, if I want to work on the home page, I open `src/routes/root.tsx` then continue from there.
Note: the reusable layout of all pages (like how the nav bar is present in all pages), is in `src/Layout.tsx`
I will try to explain via comments as much as possible, but most of the things in main.tsx is how the libraries required stuff to be written, a wrapped around b, etc.