# Toko Mini

## What is this?
Mini Project.

**NOTE: For simplifying purposes I intentionally pushed the .env file to make the database setup much easier.**

## Tech stacks

The project is using these tech stacks : 
- Language : Javascript
- Framework : Node.js Express.js
- Database : PostgreSQL
- Token : JWT
- API Documentation : Postman

## How to run this project

- Please make sure you have npm installed locally. If you don't have it yet, download it via [download npm](https://nodejs.org/en/download)
- Execute this in your console ```$ npm run start```
- Restore the backed-up database located inside `./db-backup/tokominibackup.sql`
  - Restore using pgadmin
    - Download pgadmin from [pgadmin](https://www.pgadmin.org/download/)
    - Complete the setup
    - Create a new empty database called `tokomini`
    - Make sure to match the database setup with the **pushed .env file**
    - Click on the `tokomini` database and restore it using the `.\db-backup\tokominibackup.sql`
- Import the **exported postman** located inside `.\docs\TokoMiniDocumentation_Postman.json`
- For admin credentials :
  - Email : `admin@example.com`
  - Password : `adminpassword`
