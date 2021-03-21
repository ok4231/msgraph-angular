export const OAuthSettings = {
  appId: 'APP_CLIENT_ID',
  authority: 'https://login.microsoftonline.com/DIRECTORY_TENANT_ID',
  redirectUri: 'http://localhost:4200',
  scopes: [
    "User.Read",
    "User.ReadBasic.All"
  ]
};