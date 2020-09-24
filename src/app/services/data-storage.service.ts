import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { CarProperty } from '../model/car-property';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService  {
  
  subject = new Subject<number>();

  constructor(private httpClient: HttpClient, private toastr: ToastrService,
              private authService: AuthService ) { }

  addCarToServer(data: CarProperty, uniqueId: number, isTrue?: boolean) {
    const token = this.authService.getToken();
    this.httpClient.put(`https://car-shop-92256.firebaseio.com/car/car-${uniqueId}.json?auth=` + token, data).subscribe(
      (response) => { 
        if (isTrue) {
          this.toastr.success('The car was successfully added');
        }
        console.log(response)},
      (error) => { console.log(error) }
    );
  }
  
  getCarFromServer() {
    return this.httpClient.get('https://car-shop-92256.firebaseio.com/car.json');
  }

  removeCarFromServer(uniqueId: number) {
    const token = this.authService.getToken();
    return this.httpClient.delete(`https://car-shop-92256.firebaseio.com/car/car-${uniqueId}.json?auth=` + token);
  }

  addRemoveCounter(isAdded: boolean) {
    isAdded ? this.subject.next(1) : this.subject.next(-1);
  }
}
