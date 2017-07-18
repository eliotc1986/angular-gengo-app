# GengoApp

Angular 4 app utilizing FireStarter (Angular4 + Firebase Starter App)

## Requirements

- (Node version 7.0.0+ recommended)[https://github.com/riywo/ndenv]
- (Angular Cli)[https://cli.angular.io/]

## Features

- Authentication w/ Router Guard
- Realtime Database CRUD
- File Uploads to Firebase Storage
- SASS + Bulma + FontAwesome
- Reactive Form Validation

## Usage

Create an account at https://firebase.google.com/

- clone this project
- `cd gengo-app`
- `npm install`

Create the environment files below in `src/environments/`.

#### environment.ts
```typescript
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "APIKEY",
    authDomain: "DEV-APP.firebaseapp.com",
    databaseURL: "https://DEV-APP.firebaseio.com",
    storageBucket: "DEV-APP.appspot.com"
  }
};
```
#### environment.prod.ts
```typescript
export const environment = {
  production: true,
  firebaseConfig: {
    // same as above, or use a different firebase project to isolate environments
  }
};
```

And finally `ng serve --open`

## Setting up firebase functions

- coming soon