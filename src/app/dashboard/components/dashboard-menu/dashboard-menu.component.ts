import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCog, faDoorOpen, faUsers } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.scss']
})
export class DashboardMenuComponent implements OnInit {

  faUsers = faUsers;
  faCog = faCog;
  faDoorOpen = faDoorOpen;

  constructor(private router:Router, private authService:AuthService ) { }

  ngOnInit(): void {
  }


  onLogout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
