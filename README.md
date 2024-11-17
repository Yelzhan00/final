# Portfolio Platform
Yelzhan Kapsamatov BDA 2303

## Project Description
Portfolio Platform is a web application that allows users to create and manage their portfolios. Users can register, log in, add and edit their portfolios, and receive email notifications upon successful registration.

## Technologies and Tools
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: A web framework for Node.js, simplifying server-side routing and management.
- **MongoDB**: A NoSQL database for storing data.
- **Passport.js**: A library for handling user authentication.
- **EJS**: A templating engine for rendering dynamic HTML pages.
- **Bcrypt.js**: A library for password hashing.
- **Nodemailer**: A module for sending emails.

## Installation

To set up this project on your local machine, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/Yelzhan00/final.git
    ```

2. Navigate to the project directory:

    ```bash
    cd final
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file and add the following variables:

    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/portfolio
    SESSION_SECRET=your-session-secret
    EMAIL=your-email@gmail.com
    EMAIL_PASSWORD=your-email-password
    JWT_SECRET=your-jwt-secret
    ```

5. Start the server:

    ```bash
    npm start
    ```

6. Open your browser and go to `http://localhost:3000`.

## Usage

- Register a new user via the /register form.
- Log in via the /login form.
- View and manage your portfolio.

## Contributing

If you'd like to contribute to the project, please fork the repository, make your changes, and submit a Pull Request. We welcome contributions!

1. Fork the repository.
2. Clone your forked repository:
    ```bash
    git clone https://github.com/your-username/final.git
    ```
3. Create a new branch:
    ```bash
    git checkout -b new-feature
    ```
4. Make your changes and commit them:
    ```bash
    git add .
    git commit -m "Added new feature"
    ```
5. Push your changes to your fork:
    ```bash
    git push origin new-feature
    ```
6. Open a Pull Request to the main repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author and Contact

- **Author**: Yelzhan00
- **Email**: your-email@example.com
