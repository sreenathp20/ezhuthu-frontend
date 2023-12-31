import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CreateLotteryComponent } from './create-lottery/create-lottery.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { LotteryComponent } from './lottery/lottery.component';
import { PriceComponent } from './price/price.component';
import { CreatePriceComponent } from './create-price/create-price.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'create-lottery', component: CreateLotteryComponent },
  { path: 'lottery', component: LotteryComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'price', component: PriceComponent },
  { path: 'create-price', component: CreatePriceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
