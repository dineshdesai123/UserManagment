 ## Users Management App

A React-based application for managing users. It includes features like searching, editing, deleting, and pagination. This app is designed to allow easy management and display of user data in a clean and intuitive interface.


## Features

1. User Management: Add, edit, or delete users.

2. Search Functionality: Filter users based on a search term.

3. Pagination: Navigate through a large list of users with page navigation.

4. Responsive Design: Optimized for different screen sizes.


## Main Components

1. Login: Manages the login functionality for the app.

2. Users: Displays the list of users, along with options to edit, delete, and search users.


## Main Files
1. App.js: The entry point of the app, where the main routing and logic reside.

2. Users.css: The main stylesheet for styling the user management components.

## API Used for This Project

fetch('https://reqres.in/api/users')
  .then(response => response.json())
  .then(data => console.log(data));

## BASE URL: https://reqres.in/       (for more information)


## Dependencies

1. react-toastify: For showing toast notifications (used in Login and Users components).
   npm install react-toastify

2. react-router-dom: To handle routing in the React app (used in Login, Users, and App components).
   npm install react-router-dom


## Installation

1. Clone the repository:
git clone https://github.com/yourusername/users-management-app.git

2. Navigate to the project directory:
cd users-management-app

3. Install dependencies:
npm install

4. Start the development server:
npm run dev

## To Login

1. Email: eve.holt@reqres.in
2. Password: cityslicka