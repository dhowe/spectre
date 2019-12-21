# SPECTRE
Worship at the Altar of Dataism

<br/>

## Installation

We use yarn

### Dependencies and Versions

```
Yarn version: v1.16
```

Test versions with:

```
yarn -v
```

NOTE: all instructions below assume you are within the /spectre folder:

```
cd spectre
```

### Installing Dependencies


When you have the correct versions, install the required dependencies.

```
yarn run full-install
```

<br/>

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
