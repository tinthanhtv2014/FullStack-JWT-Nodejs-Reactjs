# User Management System

This project is a User Management System implemented using Node.js, React.js, JWT, and Cookies.

## Overview

The User Management System allows administrators to perform CRUD operations on user accounts. It provides functionalities such as user registration, login, logout, updating user information, and deleting user accounts. JWT (JSON Web Tokens) are used for authentication, and cookies are used for session management.

## Features

- User registration: New users can create an account by providing their details such as username, email, and password.
- User authentication: Registered users can log in using their credentials.
- Authorization: Access to certain routes and functionalities are restricted based on user roles.
- User profile management: Users can update their profile information, including username, email, and password.
- Account deletion: Users can request to delete their account, and administrators can delete user accounts.
- Session management: User sessions are managed using cookies, providing a seamless login experience.

## Technologies Used

- **Node.js**: Backend server environment for handling user authentication, authorization, and CRUD operations.
- **Express.js**: Web framework for Node.js used to create RESTful APIs.
- **React.js**: Frontend library for building user interfaces.
- **JWT (JSON Web Tokens)**: Used for user authentication and authorization.
- **Cookies**: Utilized for session management and maintaining user sessions.
- **MongoDB**: NoSQL database used for storing user account information.
- **Mongoose**: MongoDB object modeling for Node.js, providing a schema-based solution to model application data.

## Setup Instructions

1. Clone the repository: `git clone https://github.com/yourusername/user-management-system.git`
2. Navigate to the project directory: `cd user-management-system`
3. Install dependencies for the backend: `npm install`
4. Install dependencies for the frontend: `cd client && npm install`
5. Start the backend server: `npm start`
6. Start the frontend development server: `npm start` (in the client directory)

Make sure you have Node.js and MongoDB installed on your machine before running the project.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
