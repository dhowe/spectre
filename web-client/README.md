# React-starter
Demo at https://spectre-dev.netlify.com/

## Installation

We use node, npm or yarn.

### Dependencies and Versions

Node version: v10.15.3
npm version: v6.4.1
yarn version: v1.15.2

Test versions with:

```
node -v && npm -v && yarn -v
```

NOTE: all instructions below assume you are within the /spectre/web-client folder:

```
cd spectre/web-client
```

### Installing Dependencies


When you have the correct version, install the required dependencies.

```
yarn install
```

## Running

### Main Project

Now we're ready to start:
```
yarn start
```

Build:
```
yarn build
```

Watch CSS:
```
yarn watch-css
```

## Testing
Install watchman to watch the tests:
```
brew install watchman
```
run tests:
```
yarn test
```

## Builds

To make sure our builds work in different environments

we introduce environment variables.
```
 "build-dev": "REACT_APP_BUILD=dev npm-run-all build-css build-js",
 "build-prod": "REACT_APP_BUILD=prod npm-run-all build-css build-js",
 "build-test": "REACT_APP_BUILD=test npm-run-all build-css build-js",
```
With environment variables in place we are able to add conditional statements

around what block of code we want to execute or what URLs we want to hit in different environments.

