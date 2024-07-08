# User List Management and Email API

## Overview

This project is a user list management and email API application built using Express, Mongoose, and MongoDB. It allows the creation and management of user lists, bulk user addition via CSV upload, and sending customized emails to users in the lists.

## Tech Stack

- **Backend**: Express
- **Database**: MongoDB (via Mongoose)
- **Packages**:
  - `csv-writer` & `fast-csv`: For CSV file reading and creating.
  - `multer`: For handling user file uploads.
- **Deployment**: Render Web Services

## Deployed URL

[User List Management and Email API](https://user-list-management-and-email-api.onrender.com)

## Postman Documentation

[API Documentation](https://documenter.getpostman.com/view/28031403/2sA3QmCZbg)

## API Endpoints

### List Management
- **POST** Create List
- **PATCH** Add Users To List
  - Requirements:
    - CSV File: A form-data field named `user` containing the CSV file with user details.
    - ID: The ID of the list to which users will be added, specified in the URL (either from the recently created list or manually provided).
- **GET** Get All Lists (Paginated)
- **GET** Get List by ID (Paginated for the users of the list)

### Email Management
- **POST** Send Email
- **GET** Unsubscribe from Mailing List

## Features

1. **List Creation**: 
   - Admin can create a list with a title and custom properties. Custom properties have a title and a default/fallback value.
   
2. **User Addition**:
   - Admin can add users to the list via CSV upload. The application efficiently handles CSVs with 10,000+ records.
   - **CSV Format**: The first row of the CSV should have header values. `name` and `email` are required fields for a user, and `email` should be unique. Custom properties can be set for a user by defining headers matching the custom properties title in the CSV. If no value is defined, the fallback value is used.
     - **Sample CSV Format**:
     
       `city` is a custom property:
       | name     | email              | city      |
       | -------- | ------------------ | --------- |
       | John Doe | john.doe@email.com | Bengaluru |
       | Jane Doe | jane.doe@email.com |           |
       
       Since the second record doesn’t have the city value defined in the CSV, the fallback value present in the list should be used for this record.
   - **Unique Emails**: No two users with the same email can be present in a list.
   - **Error Handling**: If some users are not added due to errors, return the CSV with the list and the error. The response must mention the count of users successfully added, count of users not added, and the current total count in the list.
   
3. **Email Sending**:
   - Admin can send an email to the complete list.
   - Custom properties can be included as placeholders in the email body, to be replaced when the email is sent. The format for placeholders is `[name_of_the_property]`.
     - For example, if the email body looks like this:
     
       ```markdown
       Hey [name]!
       
       Thank you for signing up with your email [email]. We have received your city as [city].
       
       Team XYZ.
       ```
       
       The final email received by John Doe will be:
       
       ```markdown
       Hey John Doe!
       
       Thank you for signing up with your email john.doe@email.com. We have received your city as Bengaluru.
       
       Team XYZ.
       ```
   - The email will contain an unsubscribe link. Clicking it will unsubscribe the user from the list i.e., when admin sends email to this specific list, the respective user should no longer receive the email.

## Deployment

The application is deployed on Render Web Services.



