import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from "firebase/app";
import "firebase/auth";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  isAdmin: boolean;
  email: string;

  constructor(private router: Router, private toastr: ToastrService) { }

  signUpUser(email: string, password: string) {
   return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  signInUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(
      (response) => {
        this.router.navigate(['/']);
        console.log(response);
        this.email = response.user.email;
        if(response.user.email == 'administrator@gmail.com') {
          this.isAdmin = true;
        } 
        firebase.auth().currentUser.getIdToken()
          .then(
            (token: string) => this.token = token
          )
      }
    ).catch(
      error => {
        this.toastr.error("There is no user record corresponding to this identifier");
        console.log(error)
      }
    )
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
    .then(
      (token: string) => this.token = token
    );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  getAdminStatus() {
    return this.isAdmin;
  }

  getEmail() {
    return this.email;
  }

  logOut() {
    firebase.auth().signOut();
    this.token = null;
    this.isAdmin = false;
  }

}
