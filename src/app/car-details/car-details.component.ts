import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {
  id: number;
  obj: any = {};

  constructor(private router: Router, private dataStorageService: DataStorageService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadCarDetails();
  }

  loadCarDetails() {
    this.dataStorageService.getCarFromServer().subscribe(
      (response) => {
        for (let obj in response) {
          let specificObj = response[obj];
          this.id = this.route.snapshot.params['id'];
          if(specificObj.uniqueId == this.id) {
            this.obj = specificObj;
          } } }, 
      (error) => {console.log(error)}
    );
  }

  back() {
    this.router.navigate(['/cars'])
  }

}
