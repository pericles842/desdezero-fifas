import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  login: { correo: string, password: string } = {
    correo: '',
    password: ''
  }
  constructor(private userService: UserService) { }

  auth() {
    this.userService.auth(this.login).subscribe({
      next: (res) => {
        this.userService.createCookie('user', JSON.stringify(res), 5);

        console.log(this.userService.getCookie('user'))


      },
      error(err) {
        console.log(err);

      },
    })
  }
}
