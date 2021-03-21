import { MsalModule } from '@azure/msal-angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OAuthSettings } from '../oauth';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule.forRoot({
      auth: {
        clientId: OAuthSettings.appId,
        redirectUri: OAuthSettings.redirectUri,
        authority: OAuthSettings.authority
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
