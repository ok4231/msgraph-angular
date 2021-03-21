import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MsalService } from '@azure/msal-angular';
import { Client } from '@microsoft/microsoft-graph-client';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { OAuthSettings } from 'src/oauth';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authenticated: boolean = false;
  public user: User | undefined;

  constructor(private msalService: MsalService, private sanitizer: DomSanitizer) {
    this.authenticated = this.msalService.getAccount() != null;
    this.getUser().then((user) => {this.user = user});
  }

  async signIn(): Promise<void> {
    let result = await this.msalService.loginPopup(OAuthSettings)
      .catch((reason) => {
        console.error('Get token failed', JSON.stringify(reason, null, 2));
      });

    if (result) {
      this.authenticated = true;
      this.user = await this.getUser();
      alert("Logged in!");
    }
  }

  async getAccessToken(): Promise<string | undefined>  {
    let result = await this.msalService.acquireTokenSilent(OAuthSettings)
      .catch((reason) => {
        console.error('Get token failed', JSON.stringify(reason, null, 2));
      });

    if (result) {
      console.log('Token acquired', result.accessToken);
      return result.accessToken;
    }

    this.authenticated = false;
    return undefined;
  }

  private async getUser(): Promise<User> {
    if (!this.authenticated) return new User;
  
    let graphClient = Client.init({
      // Initialize the Graph client with an auth
      // provider that requests the token from the
      // auth service
      authProvider: async(done) => {
        let token = await this.getAccessToken()
          .catch((reason) => {
            done(reason, null);
          });
  
        if (token)
        {
          done(null, token);
        } else {
          done("Could not get an access token", null);
        }
      }
    });
  
    // Get user
    let graphUser: MicrosoftGraph.User = await graphClient
      .api('/me')
      .select('displayName,mail,userPrincipalName')
      .get();
  
    let user = new User();
    user.displayName = graphUser.displayName || undefined;
    user.email = graphUser.mail || graphUser.userPrincipalName || undefined;
  
    // Get user photo
    let graphUserPhoto: MicrosoftGraph.User = await graphClient
      .api('/me/photo/$value')
      .get();

    user.photo = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(graphUserPhoto)) || 'assets/no-profile-photo.png';
  
    return user;
  }
}
