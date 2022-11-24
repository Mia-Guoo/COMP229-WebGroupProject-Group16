import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/shared/auth.service'
import { User } from 'src/app/shared/user'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User

  constructor(private authService: AuthService,
    private router: Router) {
    this.user = new User()
  }

  ngOnInit(): void {

  }


  isLoggedIn(): boolean {
    const result = this.authService.isLoggedIn
    if (result) {
      this.user = this.authService.getUser()
    }
    return result
  }
  onLogoutClick(): void {
    this.authService.doLogout()

  }
}
