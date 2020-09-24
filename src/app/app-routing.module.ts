import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { SellYourCarComponent } from './sell-your-car/sell-your-car.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './services/auth-guard.service';
import { CarsComponent } from './cars/cars.component';


const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "cars", component: CarsComponent },
  { path: "car-details/:name/:model/:id", component: CarDetailsComponent },
  { path: "wishlist", component: WishlistComponent },
  { path: "sell-your-car", component: SellYourCarComponent, canActivate: [AuthGuardService] },
  { path: "sign-in", component: SignInComponent },
  { path: "sign-up", component: SignUpComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
