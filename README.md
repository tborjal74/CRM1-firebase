# Overview

 - Hello Everyone! This is a CRM integrated with a cloud database using Firebase to serve as a Baas platform for the application.

- The CRM app benefits from Google's Firebase since it provides the developer to access a cloud database for free just by using APIs. There's only a cost when a project will cater more users and may require more data collection and if other features will be used in Firebase. The CRM App allows users to apply CRUD functions (insert, modify, delete and retrieve). 

* Steps to Use the App:

1. Sign Up for an Account
2. Login with your credentials.
3. View Dashboard
4. Select Customer, Sales, or Tickets
5. Logout when done.

# Purpose

- My purpose for creating this application is to demonstrate my capability in using Cloud Databases like Firebase to create apps that can be secured and by making sure that data is more protected when other features in a Cloud Database is used like App Check and Realtime Database.

[Software Demo Video](https://youtu.be/slfyKPG9qdQ)

# Cloud Database

- Firebase offers a lot of features that can be fit and beneficial for a lot of simple projects. It also allows AI assistance for helping with code logic. 

- The database for this application has two parts. There's a separate database that handles all the created accounts and has a unique ID so everytime a different user logs in the app, it will only show the data created by that user in its session of the CRM. The data for the users belongs to the Authentication feature of Firebase.

- There's also a separate table/collection or database for the customers, sales and tickets which belongs to the Realtime Database feature of Firebase. All data added for customers, sales and tickets generates a UID (unique identifier). 

# Development Environment

* IDE: Visual Studio Code Node.js, Firebase CLI
* Programming Language: React, Javascript, HTML, CSS
* Libraries: Webpack, Tailwind, PostCSS, Swagger

# Useful Websites

- [Youtube](https://www.youtube.com/@WebDevSimplified)
- [w3Schools](https://www.w3schools.com/js/default.asp)

# Future Work

- Add visual analytics for the customers, sales and tickets in the Dashboard
- Add a profile page for the user
- Implement reset password feature using Firebase where an email will be sent to the user to reset his/her password