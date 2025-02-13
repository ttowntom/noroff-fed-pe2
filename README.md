[![Deploy static content to Pages](https://github.com/ttowntom/noroff-fed-pe2/actions/workflows/deploy.yml/badge.svg)](https://github.com/ttowntom/noroff-fed-pe2/actions/workflows/deploy.yml) [![Automated E2E Testing](https://github.com/ttowntom/noroff-fed-pe2/actions/workflows/test-e2e.yml/badge.svg)](https://github.com/ttowntom/noroff-fed-pe2/actions/workflows/test-e2e.yml)

# Project Exam 2, Holidaze

![image](https://i.ibb.co/0jK73QqT/Woodland-Haven-Holidaze-02-13-2025-09-50-AM.png)

A Noroff exam assignment, where the task was to create a website for a fictional company called Holidaze.

## Description

This is a webapp created for the Noroff Project Exam 2 assignment. The website is be a booking site for hotels, B&Bs, and guesthouses around the world, with the goal of _"To take the skills learned over the last two years and take on an extensive project where the finished product should reflect the candidate’s general development capabilities, in addition to visual and technical skills."_

The assignment brief can be found [here](https://content.noroff.dev//project-exam-2/brief.html).

The webapp is built with a mobile-first approach and is responsive to different screen sizes.

The webapp interacts with the [Noroff Holidaze API](https://docs.noroff.dev/docs/v2/holidaze/bookings) for fetching data, and the [Noroff Auth API](https://docs.noroff.dev/docs/v2/authentication) for authentication.

### Project Links

- [Prototype, mobile](https://www.figma.com/proto/RiouEZI772w0Mb69OO967Z/Holidaze?node-id=9202-2&p=f&viewport=-5509%2C-961%2C0.32&t=6vCZxkXdRBbPfMla-0&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=9204%3A13825&show-proto-sidebar=1)

- [Prototype, desktop](https://www.figma.com/proto/RiouEZI772w0Mb69OO967Z/Holidaze?node-id=9202-2&p=f&viewport=-5509%2C-961%2C0.32&t=6vCZxkXdRBbPfMla-0&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=9204%3A13824&show-proto-sidebar=1)

- [GitHub Project](https://github.com/users/ttowntom/projects/4) with Kanban board and Gannt chart for tracking progress.

- [Live demo](https://ttowntom.github.io/noroff-fed-pe2/) of the website.

### Project Structure

```bash
src/
├── components/ # Reusable UI components
│ ├── mainMenu/ # Main menu components
│ ├── profile/ # Profile related components
│ ├── venue/ # Venue related components
│ └── venueManager/ # Venue manager related components
│
├── hooks/ # Custom React hooks
├── pages/ # Route components and page layouts
├── schemas/ # Zod validation schemas
├── store/ # Zustand state management
├── styles/ # Specific styles for components
└── utils/ # Utility functions and API helpers
```

### Features

- User authentication (login/signup)
- Venue browsing and search
- Venue booking system
- Venue management for venue managers
- Interactive maps with Mapbox integration
- Responsive design
- Dark/light theme support

## Technologies

The webapp is built with the following technologies on the frontend:

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Tanstack Query](https://react-query.tanstack.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Zustand](https://zustand.surge.sh/)
- [Zod](https://zod.dev/)
- [Mapbox](https://www.mapbox.com/)
- [Swiper](https://swiperjs.com/)
- [FontAwesome](https://fontawesome.com/)

In development:

- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Husky](https://typicode.github.io/husky/#/)
- [Cypress](https://www.cypress.io/)

## Automations

Through GitHub Actions, the following automatons are set up:

### Deploy static content to Pages

[![Deploy static content to Pages](https://github.com/ttowntom/noroff-fed-pe2/actions/workflows/deploy.yml/badge.svg)](https://github.com/ttowntom/noroff-fed-pe2/actions/workflows/deploy.yml)

Builds the webapp and deploys the `main`branch to GitHub Pages on `push`, `pull_request` and `workflow_dispatch` events.

### Automated end-to-end testing

[![Automated E2E Testing](https://github.com/ttowntom/noroff-fed-pe2/actions/workflows/test-e2e.yml/badge.svg)](https://github.com/ttowntom/noroff-fed-pe2/actions/workflows/test-e2e.yml)

Runs Cypress end-to-end tests on the `main` branch on `pull_request` and `workflow_dispatch` events.

The following tests are run:

- Authentication credentials validation
- Login
- Logout
- Any user can view the home page
- Any user can view a specific venue page
- Any user can search for a specific venue
- Any user can view a venue's booking calendar
- A logged in user can book a venue
- A logged in user can view their bookings

## Getting started

### Installation

1. Clone the repository

```bash
git clone https://github.com/ttowntom/noroff-fed-pe2.git
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in root by copying the `.env.example` file and filling in the necessary values.

```bash
cp .env.example .env
```

The following environment variables are required:

- `VITE_API_KEY`: API key for Noroff API
- `VITE_API_MAPBOX`: Mapbox API key for venue location maps
- `VITE_CYPRESS_USER`: Test user name for E2E testing
- `VITE_CYPRESS_EMAIL`: Test user email for E2E testing
- `VITE_CYPRESS_PASSWORD`: Test user password for E2E testing

### Running

To run the app in dev mode, run the following commands:

```bash
npm run dev
```

To build the app for production, run the following commands:

```bash
npm run build
```

### Scripts

- `dev`: Starts the development server
- `build`: Builds the app for production
- `preview`: Serves the production build locally
- `lint`: Lints the code
- `format`: Formats the code
- `e2e`: Runs Cypress end-to-end tests

## License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/licenses/MIT) file for details.
