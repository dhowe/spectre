# Spectre Client

Demo at https://spectre-dev.netlify.com/

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

NOTE: all instructions below assume you are within the /spectre/web-client folder:

```
cd spectre/web-client
```

### Installing Dependencies


When you have the correct versions, install the dependencies:

```
yarn install
```

## Running

### The client

Now we're ready to develop:
```
yarn start
```

Or to create a build:
```
yarn build
```

or to watch the CSS:
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

To verify builds work in different contexts, we use environment variables.
```
 "build-dev": "REACT_APP_BUILD=dev npm-run-all build-css build-js",
 "build-prod": "REACT_APP_BUILD=prod npm-run-all build-css build-js",
 "build-test": "REACT_APP_BUILD=test npm-run-all build-css build-js",
```
With environment variables in place we are able to add conditional statements for differernt cases

