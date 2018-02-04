# Authentication Service #
---------------
### Boilerplate app built using: ###
* NodeJs
* ExpressJs
* PassportJs
* MongoDb

### Prerequisites: ###
* [NodeJs](https://nodejs.org/en/)
* [MongoDb](https://www.mongodb.com/) 

## Getting Started ##
---------------
The easiest way to get started is to clone the repository and run the server on your local machine:

```
# Clone the Rpository
git clone <repo-url>

# Navigate into the project folder
cd authentication-service

# Install Dependencies
npm install

# Start the development Server
npm start
```

## Using the Authentication Service ##
---------------
### Health Check Endpoint ###
* /healthcheck  
**Available HTTP Methods:** GET

### Auth Endpoints ###
* /auth/login  
**HTTP Method:** POST  
**Headers:** "Content-Type: application/x-www-form-urlencoded" or "Content-Type: application/json"  
**Body:**  
```
Key           | Value
------------- | -------------
username      | testuser 
password      | testpass
```  
or    
```
{"username":"testuser","password":"testpass"}
```   

* /auth/verifytoken/:token  
**Available HTTP Methods:** GET

### Users Endpoints ###
* /users  
**HTTP Method:** GET  
**Headers:** "Authorization: <token-extracted-from-login-response>"

* /users  
**HTTP Method:** POST  
**Headers:** "Authorization: <token-extracted-from-login-response>"

* /users/:id  
**HTTP Method:** GET  
**Headers:** "Authorization: <token-extracted-from-login-response>"

* /users/:id  
**HTTP Method:** PUT  
**Headers:** "Authorization: <token-extracted-from-login-response>"

* /users/:id  
**HTTP Method:** DELETE  
**Headers:** "Authorization: <token-extracted-from-login-response>"

* /users/resetpassword/:id  
**HTTP Method:** PUT  
**Headers:** "Authorization: <token-extracted-from-login-response>"
