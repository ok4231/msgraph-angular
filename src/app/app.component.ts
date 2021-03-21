import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'graph-intro';

  get authenticated(): boolean {
    return this.authService.authenticated;
  }

  get user(): User | undefined {
    return this.authService.user;
  }

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    
  }

  async signIn(): Promise<void> {
    await this.authService.signIn();
  }

}
