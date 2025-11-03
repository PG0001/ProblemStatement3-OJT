import { Component, OnInit } from '@angular/core';
import { AuthService } from './Services/Auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ProjectAppManagement';
  load = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.isLoggedIn$.subscribe(status => {
      this.load = status;
    });
  }
}
