# TestTask Project

Project developed for the Front-end developer position in Abz Agency. It was developed based on a mockup provided in Figma, route consumption documentation in Swagger, and a document with information to be followed.
The development used the React, Typescript, and Vite stack, along with SASS (Scss) for styling. The layout is responsive, with a maximum width of 1170px, as specified in the design.

It was hosted on Vercel.

## Libraries, stacks, and other information

- FORMS: react-hook-form | @hookform/resolvers | yup
- REQUESTS: axios | react-query
- TOAST: react-toastify 
- STYLE: SASS (.scss)

## Folder structure

src/
├── assets/                   # Images and icons folder
│
├── config/
│   └── apiConfig.ts          # File with the Axios instance
│
├── hooks/
│   ├── usePositions.ts       # Hook for user positions
│   └── useUsers.ts           # Hook for users list
│
├── services/
│   └── users.ts              # User services (tokens, get user by id, etc.)
│
├── styles/
│   ├── components/           # Component-specific styles
│   │   └── inputs.scss       # Global inputs style
│   ├── settings/             # Global style variables
│   │   └── variables.scss    # Global style variables, like colors
│   └── main.scss             # Global style (body, root, etc.) and imports
│
├── types/
│   └── users.ts              # Objects and request props
│
├── ui-component/
│   ├── index.tsx             # Global component structure
│   └── style.tsx             # Global component style
│
├── utils/
│   └── loadings.tsx          # Loading utils, like skeleton generation
│
├── views/
│   ├── components/          # View-specific components
│   │   └── get-block/
│   │       ├── index.tsx    # Get Block component structure
│   │       └── style.tsx    # Get Block component style
│   ├── styles.tsx           # Index styles
│   └── index.tsx            # Base of the displayed page, where the imports are located
│
├── App.tsx                  # Main component, with the providers
└── main.tsx                 # Entry point of the application
