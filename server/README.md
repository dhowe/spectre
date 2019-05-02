## SPECTRE REST API

### /spectre/users

GET: finds all users

POST: creates a new user

<br>

### /spectre/users/:id

GET: finds user by id

PUT: updates user by id

DELETE: deletes user by id

<br>

### /spectre/users/test/:id

GET: checks the value of each property for use

<br>

### /spectre/users/similar/:id?limit=K

GET: returns the K closest users (by OCEAN score) to the user with id


<br>

## INSTALLATION

##### $ git clone https://github.com/dhowe/spectre.git

##### $ cd spectre/server 

##### $ npm install

##### $ npm test (to run tests)

##### $ npm start (to start the server)

