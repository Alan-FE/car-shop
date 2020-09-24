import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase/app";
import "firebase/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  
  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyDHNh8zAD4xgflFv3I83aKgZLzktSDW74I",
      authDomain: "car-shop-92256.firebaseapp.com"
    });
  }
}
