# JWT AUTH MONGO

## It is a simple authentication node-express application that configures mongoDb as database

### Can be cloned by anyone who is employing Jwt for Authentication, MongoDB as database and backend is node (express).

## .env configuration - before configuring .env you must have set an environment variable in your host machine named 'NODE_ENV' having value 'development'

#### It has three env variables - 

	1. PORT - specify the port on which app is listening,
	2. DB_URL - mongoDb uri string ( mongodb://localhost:27017/<dbname> - for local host), replace <dbname> with your database name
	3. SECRET_KEY - your jwt secret key

### To run app

	1. After configuring your .env file
	2. run -> npm install
	3. run -> npm start ( or node app.js )


