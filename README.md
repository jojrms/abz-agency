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


### Additional Descriptions

- **`src/assets/`**: Contains images and icons used in the application.

- **`src/config/`**: Contains configuration files, such as `apiConfig.ts` for the Axios instance.

- **`src/hooks/`**: Contains custom hooks for reuse across various components. For example, `usePositions` and `useUsers`.

- **`src/services/`**: Contains services for interacting with APIs and other backend operations. For example, `users.ts`.

- **`src/styles/`**: Contains style files for the application.
  - **`components/`**: Component-specific styles.
  - **`settings/`**: Global style variables.
  - **`main.scss`**: Global styles and imports.

- **`src/types/`**: Contains TypeScript type definitions for objects and request props.

- **`src/ui-component/`**: Contains UI components and their styles.

- **`src/utils/`**: Contains utility functions and helpers.

- **`src/views/`**: Contains pages and view-specific components, with their structure and styles.

- **`index.tsx`**: Entry point of the application where imports and initial rendering occur.

- **`App.tsx`**: Main component of the application, usually including providers and global configuration.

- **`main.tsx`**: Entry point of the application.
