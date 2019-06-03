## SPECTRE REST API

### /spectre/users

GET: finds all users

POST: creates a new user

<br/>

### /spectre/users/:id

GET: finds user by id

PUT: updates user by id

DELETE: deletes user by id

<br/>

### /spectre/users/test/:id

GET: checks the value of each sent property for user with id

<br/>

### /spectre/users/similar/:id?limit=K

GET: returns the K closest users (by OCEAN score) to the user with id


<br/>

## INSTALLATION

##### $ git clone https://github.com/dhowe/spectre.git

##### $ cd spectre

##### $ yarn install

##### $ yarn test (to run tests)

##### $ yarn run server (to start the server on port 8083)

##### $ yarn run client (to start the webapp on port 3000)

##### $ yarn run client-server (to start server + webapp on port 8083)

<br/>
