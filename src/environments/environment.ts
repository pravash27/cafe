// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyBucevmPCBfyDq_86Y1-NtMXOJSrBrCFtY",
    authDomain: "cafe-70b95.firebaseapp.com",
    databaseURL: "https://cafe-70b95.firebaseio.com",
    projectId: "cafe-70b95",
    storageBucket: "cafe-70b95.appspot.com",
    messagingSenderId: "2665250742",
    appId: "1:2665250742:web:2cc2b2a1f2cddd3b1c8b17",
    measurementId: "G-N4XP3LKJJ8"
  },
  nodeUrl: {
    dev: 'http://localhost:3000'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
