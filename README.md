# SPECTRE
_Worship at the Altar_

<br/>

## Dependencies
```
We use react, express, node (v12.2), [mongodb](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/) (v4.2) and yarn (v1.21)
```

<br/>

## Installation (OS X or linux)
```
git clone https://github.com/dhowe/spectre.git 
cd spectre
```

Note: all instructions below assume you are within the _spectre_ folder:

```
yarn run full-install
```


## Client+Server (production, requires mongodb)

```
yarn start
```

<br/>

## Server-only (no client required)

### Start (requires a local mongodb)

```
yarn run server
```


### Test (without starting the server)

```
yarn test
```

<br/>

## Client-only

### Start (for development)

```
yarn run client-start
```

### Build (for deployment)

```
yarn run client-build
```

For more details on the client, see [these instructions](client/README.md)
<br>
