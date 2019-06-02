# SPECTRE
Worship at the Altar of Dataism


# Spectre Server

## Installation

We use node and yarn.

### Dependencies and Versions

```
Node version: v10.2
Yarn version: v1.16
```

Test versions with:

```
node -v && yarn -v
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

## Server (no client required)

### Start (requires a local mongodb)

```
yarn start
```


### Test (without starting the server)

```
yarn test
```

<br/>

## Client (no server required)

### Start (for dev)

```
yarn run start-client
```

### Build (for deploy)

```
yarn run build-client
```

For more details on the client, see [these instructions](web-client/README.md)
<br>
