import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  counter: number = 0;
  subscription: Subscription;

  constructor(public authService: AuthService, private dataStorageService: DataStorageService,
              private router: Router ) { }

  ngOnInit(): void {
    this.loadCount();
    this.subscription = this.dataStorageService.subject.subscribe(
      (counter) => {
        this.counter += counter;
      }
    )
  }

  loadCount() {
    this.dataStorageService.getCarFromServer().subscribe(
      (response) => { for (let obj in response) {
      let result = response[obj];
        if(result.isClicked) {
          this.counter++;
        }
      } },
      (error) => {console.log(error)}
    );
  }

  onLogOut() {
    this.authService.logOut();
    this.router.navigate(['/sign-in']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
