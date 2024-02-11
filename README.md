# Code Generator

This project is a code generator with a frontend built in React and a backend built in Nest.js.

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Docker](https://www.docker.com/) (optional, for containerization)

## Backend Setup

1. Navigate to the `server` directory:

    ```bash
    cd server
    ```

2. Install dependencies:

    ```bash
    npm ci
    ```

3. Duplicate the `.env.example`, rename it to `.env`, and edit it as needed.

4. Start the backend server:

    ```bash
    npm run start:dev
    ```

   The backend will be accessible at [http://localhost:3000](http://localhost:3000).

## Frontend Setup

1. Navigate to the `ui` directory:

    ```bash
    cd ui
    ```

2. Install dependencies:

    ```bash
    npm ci
    ```

3. Duplicate the `.env.example`, rename it to `.env`, and edit it as needed.

4. Start the frontend development server:

    ```bash
    npm run dev
    ```

   The app will be accessible at [http://localhost:5173](http://localhost:5173).

## Docker Production Setup (Optional)

If you prefer using Docker:

1. Build the backend Docker image:

    ```bash
    cd server
    docker build -t code-generator-be .
    ```

2. Run the backend container:

    ```bash
    docker run -p 3000:3000 code-generator-be
    ```

3. Build the frontend Docker image:

    ```bash
    cd ui
    docker build -t code-generator-fe .
    ```

4. Run the frontend container:

    ```bash
    docker run -p 5173:80 code-generator-fe
    ```
   The frontend will be accessible at [http://localhost:3000](http://localhost:3000) and the backend at [http://localhost:3001](http://localhost:3001).


## Additional Notes

- Customize the configuration files (`ui/.env` and `server/.env`) if needed.
- Ensure that the backend is running before using the frontend to generate codes.
