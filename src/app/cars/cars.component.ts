import { Component, OnInit } from '@angular/core';

import { DataStorageService } from './../services/data-storage.service';
import { CarProperty } from './../model/car-property';
import { AuthService } from './../services/auth.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {
  cars: any[] = [];
  loaded: boolean;
  p: number = 1;
  value: any;
  auth: any = this.authService.isAuthenticated();

  constructor(private dataStorageService: DataStorageService,
              public authService: AuthService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dataStorageService.getCarFromServer().subscribe(
      (response) => { for (let obj in response) {
      let result = response[obj];
      this.cars.push(result);
      } this.loaded= true },
      (error) => {console.log(error)}
    );
  }

  addRemoveWishlist(event: any, property: CarProperty) {
    if(this.auth) {
      let evt = event.target;
      if (evt.className === 'far fa-heart') {
        evt.className = 'fas fa-heart';
        property.isClicked = true;
        this.dataStorageService.addCarToServer(property, property.uniqueId);
        this.dataStorageService.addRemoveCounter(true);
      } else {
        evt.className = 'far fa-heart';
        property.isClicked = false;
        this.dataStorageService.addCarToServer(property, property.uniqueId);
        this.dataStorageService.addRemoveCounter(false);
      }
  } else {
    this.toastr.warning('You need to log in first!');
  }
  }

  removeCar(obj: CarProperty, i: number) {
    this.dataStorageService.removeCarFromServer(obj.uniqueId).subscribe(
      (response) => { 
        this.cars.splice(i, 1);
        console.log(response)},
      (error) => {console.log(error)}
    );
  }

  search(form: NgForm) {
    this.value = form.value.keyword;
  }
}
