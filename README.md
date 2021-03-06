# GengoApp

Angular4/Firebase app utilizing [FireStarter](https://github.com/codediodeio/angular-firestarter) (Angular4 + Firebase starter app)

More info at: [angularfirebase.com](https://angularfirebase.com/)

# What is it?

GengoApp is a study tool that gives you new abilities when studying Japanese!

## Add New Phrases

![screenshot](https://user-images.githubusercontent.com/6524512/28711426-802eceea-73c2-11e7-999e-04d656abcf5d.png)

Utilizing Google's translate API, automatically get English translations for Japanese phrases you upload. Edit posts and add notes to customize how the content of the phrases you add.

## Track Mistakes

![screenshot](https://user-images.githubusercontent.com/6524512/28711425-802e370a-73c2-11e7-8b74-bae61a9fcad3.png)

Keep track of the mistakes (and the correct way to say it) with the mistakes tracker function.
Add notes and keep a record of the number of time you made the mistake.

## More

- Authentication w/ Router Guard
- Realtime database
- File Uploads to Firebase Storage
- SASS + Bulma + FontAwesome
- Reactive Form Validation
- Filters

## Requirements

- [Node version 7.0.0+ recommended](https://github.com/riywo/ndenv)
- [Angular Cli](https://cli.angular.io/)
- [Firbase Tools](https://github.com/firebase/firebase-tools)

## Usage

Create an account at https://firebase.google.com/

- clone this project
- `cd gengo-app`
- `npm install`

Create the environment files below in `src/environments/`. For information on how this works see: [Development and Production Environments for Angular Firebase Projects
](https://angularfirebase.com/lessons/development-and-production-environments-for-angular-firebase-projects/)

#### environment.ts

```typescript
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'APIKEY',
    authDomain: 'DEV-APP.firebaseapp.com',
    databaseURL: 'https://DEV-APP.firebaseio.com',
    storageBucket: 'DEV-APP.appspot.com',
  },
};
```

#### environment.prod.ts

```typescript
export const environment = {
  production: true,
  firebaseConfig: {
    // same as above, or use a different firebase project to isolate environments
  },
};
```

And finally `npm start`

## Setting up firebase functions

- cd `functions`
- `npm install`
- `firebase login`
- `firebase deploy --only functions`

## Deploy

To deploy using firebase-tools, you will need to login. If you have an expired token, you can run `firebase logout`, then `firebase login`, which will allow you to login with refreshed access token.

The project is already set up to use aliases for the staging and production environments. To swithc, run:

```
$ firebase use <alias>
```

You can check your project aliases using the following command:

```
$ firebase projects:list
```

**Staging**

```
$ firebase use staging
$ firebase deploy
```

**Prod**

```
$ firebase use prod
$ npm run build-prod
$ firebase deploy
```
