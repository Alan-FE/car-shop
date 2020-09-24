import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CarProperty } from '../model/car-property';
import { AuthService } from '../services/auth.service';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-sell-your-car',
  templateUrl: './sell-your-car.component.html',
  styleUrls: ['./sell-your-car.component.scss']
})
export class SellYourCarComponent implements OnInit {
  date: Date;
  images: any[] = [{
    images: ''
  }];

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  addCar(ngForm: NgForm) {
      this.date = new Date();
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      let time = this.date.toLocaleDateString('en-US', options);
      let obj: CarProperty = {
        make: ngForm.value.make.charAt(0).toUpperCase() + ngForm.value.make.slice(1).toLowerCase(),
        model: ngForm.value.model.charAt(0).toUpperCase() + ngForm.value.model.slice(1).toLowerCase(),
        engine: ngForm.value.engine.toUpperCase(),
        color: ngForm.value.color,
        year: ngForm.value.year,
        transmission: ngForm.value.transmission,
        mileage: ngForm.value.mileage,
        fuel: ngForm.value.fuel,
        seller: ngForm.value.seller,
        images: this.images,
        phoneNumber: ngForm.value.phoneNumber,
        description: ngForm.value.description,
        price: ngForm.value.price,
        time: time,
        uniqueId: Date.now(),
        email: this.authService.getEmail()
      }     
      console.log(ngForm.value);
      this.dataStorageService.addCarToServer(obj, obj.uniqueId, true);
      ngForm.resetForm();
  }

  resetForm(form: NgForm) {
    form.reset();
  }

  addInput() {
    this.images.push({
      images: ''
    })
  }

  removeInput(i: number) {
    this.images.splice(i, 1);
  }
}
