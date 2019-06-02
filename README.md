# SPECTRE
Worship at the Altar of Dataism


# Spectre Server

## Installation

We use node and yarn.

### Dependencies and Versions

Node version: v10.2
Yarn version: v1.16

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
yarn install && cd web-client && yarn install
```

## Running

### Start the server (note: requires a local mongodb install)

```
yarn start
```

## Testing

### Without starting the server, run the test suite

```
yarn test
```

### Start the client

To build, test and run the client, which does NOT require the server, see [these instructions](web-client/README.md)

<br>
