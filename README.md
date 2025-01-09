# Authentication System

This project is a robust Authentication System built with a full-stack approach, utilizing modern technologies to ensure security, scalability, and ease of use. The backend is built using Node.js, Express, and MongoDB, while the frontend leverages React, Vite, and TailwindCSS to provide a responsive and user-friendly interface.

## 📂 Project Structure

```
Authentication_System/
|-- backend/
|   |-- config/
|   |-- controllers/
|   |-- mailtrap/
|   |-- middleware/
|   |-- models/
|   |-- routes/
|   |-- utils/
|   |-- server.js
|
|-- frontend/
    |-- node_modules/
    |-- public/
    |-- src/
        |-- components/
        |-- pages/
        |-- store/
        |-- utils/
        |-- App.jsx
        |-- index.css
        |-- main.jsx
    |-- index.html
    |-- package.json
    |-- tailwind.config.js
    |-- vite.config.js
```

## 🌟 Key Features

- **User Authentication**: Secure login and signup functionality.
- **Password Encryption**: Utilizes bcrypt for secure password storage.
- **JWT Integration**: Secure and scalable session handling with JSON Web Tokens.
- **Email Verification**: Integration with Mailtrap for sending and verifying emails.
- **Forgot Password**: Allows users to reset their passwords securely via email.
- **Responsive Design**: A user-friendly interface powered by TailwindCSS.
- **Environment Configuration**: Sensitive data securely managed using environment variables.

## 🔖 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or above)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A Mailtrap account for email testing

## 🚀 Setup and Installation

### Backend
1. Navigate to the root directory and install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory and add the required environment variables:
   ```env
   MONGO_URI=your_mongo_connection_string
   PORT=5000
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   MAILTRAP_TOKEN=your_mailtrap_token
   MAILTRAP_ENDPOINT=your_mailtrap_endpoint
   CLIENT_URL=your_client_url
   ```

3. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

- Visit the frontend URL (e.g., `http://localhost:3000`) in your browser.
- Use the authentication features such as login and signup.

## 🛠️ Technologies Used

### Backend
- **Node.js**: JavaScript runtime for building the server-side application.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for data storage.
- **Mailtrap**: Email testing platform.
- **JSON Web Tokens (JWT)**: Secure session handling.

### Frontend
- **React.js**: JavaScript library for building user interfaces.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **Vite**: Fast build tool for modern web projects.

<!--## Features in Detail

1. **User Signup and Login**:
   - Users can create an account and log in securely.
   - Passwords are hashed before storage.

2. **JWT-based Authentication**:
   - Authentication tokens are issued to logged-in users for session management.

3. **Email Notifications**:
   - The application sends confirmation emails for account verification.

4. **Error Handling**:
   - Comprehensive error messages for better user experience.

5. **Responsive UI**:
   - Fully responsive design to ensure usability on all devices.-->
## Contributing

Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## 🧰 Languages and Tools:
<p align="left">
<img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" width="50" height="50">
<img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" alt="Express.js" width="100" height="50">  
<img src="https://nodejs.org/static/images/logo.svg" alt="Node.js" width="50" height="50">
<img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg" alt="Visual Studio Code" width="50" height="50">  
<img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="Postman" width="50" height="50">
<img src="https://www.vectorlogo.zone/logos/mongodb/mongodb-ar21.svg" alt="MongoDB" width="100" height="50">
<img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="Tailwind CSS" width="50" height="50">
</p>

## 📧 Contact

For any inquiries or feedback, feel free to reach out at dilushar10@gmail.com.
