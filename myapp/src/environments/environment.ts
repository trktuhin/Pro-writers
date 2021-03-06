// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  payment: {
    paypal: {
      clientId: 'AQJjp9iW2OZQZKTcUbilTt8bizVvT-yErn4WO42zA6HganQ8cbWH05-wNrxsOubdtXDqdVHNatV2eptm'
    },
    stripe: {
      publishableKey: 'pk_test_51HGek9LeMRingsIQtQP7MBGISaea70HKtCyKfS4q2lv911xDJhlzquuYsLAmF20mldaDa3trs1avNtH5p2zTSylX00tnjfmADX'
    }
  },
  baseDomain: 'http://localhost:4200/',
  baseServer: 'http://localhost:5000/api/',
  baseServerRoot: 'http://localhost:5000/files/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
