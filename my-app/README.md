This project is a React application featuring an autocomplete search component that pulls product suggestions from the dummyjson API. It includes a landing page with a button to navigate to the search feature, complete with a cosmic vibe—think twinkling stars, floating orbs, and glowing effects. The app supports debounced searches, pagination, error handling, and a responsive design, all styled with Tailwind CSS.



Setup Instructions

1) Clone the repo: git clone <repository-url>

2) Navigate to the project folder: cd <project-directory>

3) Install dependencies: npm install

4) Install additional packages 
5) For debouncing, routing, and icons: npm install lodash react-router-dom react-icons

6) Configure Tailwind CSS

7) Run the app: npm start

My Approach
I built a cool React autocomplete app with a spacey vibe, using Tailwind CSS to make it look sleek and React Router for smooth navigation. Wanted it to be fast, fun, and fully functional for the assignment!

Tech Stack: Went with React Hooks for easy state management, lodash for debouncing, react-icons for neat icons, and Tailwind CSS for quick, responsive styling.

Structure: Made a LandingPage for the homepage and an Autocomplete component for search, linked via React Router (/ and /autocomplete).

Features: Added 500ms-debounced API calls to dummyjson.com, pagination with limit=10 and skip, error messages, and a loading animation with a rocket.

Styling: Used Tailwind with custom animations (twinkle, float, glow) for a starry, cosmic UI that works on any device.

Optimizations: Threw in useCallback to keep things snappy and encodeURIComponent for safe queries.