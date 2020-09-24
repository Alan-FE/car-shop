import { Component, OnInit } from '@angular/core';

import { CarProperty } from '../model/car-property';
import { DataStorageService } from '../services/data-storage.service';
import { AuthService } from './../services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  array: any[] = [];
  loaded: boolean;
  isEmpty: boolean;

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dataStorageService.getCarFromServer().subscribe(
      (response) => { for (let position in response) {
      let result = response[position];
        if (result.isClicked) {
          this.array.push(result);
        }
        this.array.length !== 0 ? this.isEmpty = false : this.isEmpty = true;
      } this.loaded= true },
      (error) => {console.log(error)}
    );
  }

  removeFromWishlist(item: CarProperty, i: number) {
    if(this.authService.isAuthenticated()) {
      this.array.splice(i, 1);
      item.isClicked = false;
      this.dataStorageService.addCarToServer(item, item.uniqueId);
      this.dataStorageService.addRemoveCounter(false);
      this.array.length !== 0 ? this.isEmpty = false : this.isEmpty = true;
    } else {
      this.toastr.warning('You need to log in first!');
    }
  }

}
