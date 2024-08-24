<h1 align="center"> 🚀 TestTask Project </h1>

Project developed for the Front-end developer position in Abz Agency. It was developed based on a mockup provided in Figma, route consumption documentation in Swagger, and a document with information to be followed.
The development used the React, Typescript, and Vite stack, along with SASS (Scss) for styling. The layout is responsive, with a maximum width of 1170px, as specified in the design.

It was hosted on Vercel.

* [Page functionalities](#page-funcionalities)
* [Libraries and other information](#libaried-and-other-information)
* [Folder structure](#folder-structure)

## Page functionalities
The page starts with an introduction, where both buttons in the header have a simple scroll functionality, moving the user to the corresponding action area.

#### GET Block
Block responsible for performing the GET request for the user list. By default, it starts on page 1 with 6 items displayed. The show more button advances to the next page of the request, but users are displayed in full, with the state receiving updates immutably. When the last page is reached, the button is disabled and hidden.

#### POST Block
Area with the form for submitting a new user. All fields are required. Upon submission, a token will be generated and added to the request. While the action is in progress, the button is disabled to prevent duplicates or errors. Once completed, if successful, a success toast is shown to the user, the user list above is updated, and it returns to its initial state with the new user in position 0.

## 🛠️ Libraries and other information

- FORMS: `react-hook-form` | `@hookform/resolvers` | `yup`
- REQUESTS: `axios` | `react-query`
- TOAST: `react-toastify`
- STYLE: `SASS` (.scss)

## Folder structure
```
|
├── src/
|    ├── assets                      # Images and icons folder
|    |
|    ├── config
|    |      └── apiConfig.ts         # File with the Axios instance
|    |
|    ├── hooks                  
|    |      ├── usePositions.ts      # Hook for user positions
|    |      └── useUsers.ts          # Hook for users list
|    |
|    ├── services                  
|    |      └── users.ts             # User services (tokens, get 
|    |                                               user by id and
|    |                                               others) 
|    ├── styles                  
|    |    ├── components
|    |    |      └── inputs.scss     # Global inputs style
|    |    |      
|    |    ├── settings
|    |    |      └── variables.scss  # Global style variables, like 
|    |    |                           colors
|    |    |      
|    |    └── main.scss             # Global style (body, root, etc)
|    |                                and imports
|    ├── types                  
|    |      └── users.ts          # Objects and requests props 
|    | 
|    ├── ui-component                  
|    |      └── Standard...
|    |             ├── index.tsx  # Global component structure  
|    |             └── style.tsx  # Global component style  
|    |
|    ├── utils
|    |      └── loadings.tsx      # Loading utils, like skeleton 
|    |                              generation
|    |
|    ├── views
|    |    ├── components
|    |    |       └── get-block           
|    |    |               ├── index.tsx   # Get Block component 
|    |    |               |                 structure           
|    |    |               └── style.tsx   # Get Block component 
|    |    |                                 style         
|    |    |                        
|    |    ├── styles.tsx          # Index styles
|    |    └── index.tsx           # Base of the displayed page, where 
|    |                             the imports are located
|    |
|    ├── App.tsx                  # Main component, with the providers
|    └── main.tsx
```