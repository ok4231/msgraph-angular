# Microsoft Graph in Angular
* Make sure the app in Azure has a platform with a redirect URI to http://localhost

* Check if the app has the correct permissions: User.Read and User.ReadBasic.All

* npm install @microsoft/microsoft-graph-client@2.1.0 @microsoft/microsoft-graph-types@1.24.0 @azure/msal-angular@1.1.1

* Change the client id and the tenant id from the app in Azure in the OAuth.ts file

* In terminal run the angular CLI command: ng serve --open
