MyPos

Video Demo: https://youtu.be/qOcvCebG5Y4

Overview
The Point of Sale (POS) System is a web-based application designed to facilitate sales transactions in retail environments. This system provides functionalities for adding, managing, and selling products, as well as viewing available stocks. The POS system aims to streamline the checkout process and enhance user experience for businesses without inventory management needs.

Features
1. Product Management
Add Products: Users can add new products to the system, including details such as name, price, and description.
View Products: Users can view a list of available products with their respective details.

2. Sales Transactions
Add to Cart: Users can add products to their cart for purchase.
View Cart: The system displays the current contents of the cart, including product details and prices.
Checkout: Users can complete the purchase by processing the items in the cart and generating a receipt.

3. Stock Display
View Stocks: Users can view the available stocks of each product in the system.

4. User Authentication
Login: Users can securely log in to the system using their credentials.
Logout: Users can safely log out of the system to protect their account information.

5. User Interface
Responsive Design: The application is designed to be responsive and accessible on various devices, including desktops, tablets, and smartphones.
Intuitive Interface: The user interface is user-friendly and intuitive, making it easy for users to navigate and perform tasks efficiently.

Technologies Used

Frontend: The frontend of the POS system is built using React.js, a popular JavaScript library for building user interfaces.

Backend: The backend is developed using Spring Boot, providing a robust server-side framework for handling requests and managing data.

Database: MySQL is used as the database to store product information and user data.

Authentication: JSON Web Tokens (JWT) are used for user authentication and session management, ensuring secure access to the system.

Styling: CSS is used for styling the user interface, with additional libraries or frameworks such as Bootstrap or Material-UI for enhanced styling and components.

Installation
To run the Point of Sale System locally, follow these steps:

Clone the repository to your local machine.
Set up the MySQL database by importing the provided SQL schema.
Navigate to the project directory.
Start the Spring Boot backend server.
Navigate to the client directory.
Install frontend dependencies by running npm install in the terminal.
Start the frontend server by running npm start.
Access the application in your web browser at http://localhost:3000.
Future Improvements
Advanced Reporting: Implement advanced reporting features to analyze sales data, track trends, and make informed business decisions.
User Roles and Permissions: Introduce user roles and permissions to restrict access to certain features or data based on user roles (e.g., admin, cashier).
Barcode Scanning: Incorporate barcode scanning functionality to expedite the checkout process and improve accuracy.
Offline Mode: Enable offline functionality to allow users to continue processing transactions even when internet connectivity is limited or unavailable.

Contributors
This project is maintained by Thenuk De Silva and contributions from the open-source community are welcome. Please feel free to submit bug reports, feature requests, or pull requests to help improve the POS system.