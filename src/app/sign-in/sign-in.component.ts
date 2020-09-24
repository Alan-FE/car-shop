import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSignIn(form: NgForm) {
    let email: any = form.value.email;
    let password: any = form.value.password;
    this.authService.signInUser(email, password);
  }
 
}
