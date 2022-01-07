import { HomeComponent } from './components/home/home.component';
import { AdminpaneliComponent } from './components/adminpaneli/adminpaneli.component';
import { SorucevapekleComponent } from './components/sorucevapekle/sorucevapekle.component';
import { AnketekleComponent } from './components/anketekle/anketekle.component';
import { RegisterComponent } from './components/register/register.component';
import { AnketsilComponent } from './components/anketsil/anketsil.component';
import { AnketduzenleComponent } from './components/anketduzenle/anketduzenle.component';
import { AnketdetayComponent } from './components/anketdetay/anketdetay.component';
import { AnketComponent } from './components/anket/anket.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
const redirectLogin = () => redirectUnauthorizedTo(['/login']);


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'anketler', component: AnketComponent , canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLogin } },
  { path: 'anketdetay/:key', component: AnketdetayComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLogin } },
  { path: 'anketduzenle/:key', component: AnketduzenleComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLogin } },
  { path: 'anketsil/:key', component: AnketsilComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLogin } },
  { path: 'register', component: RegisterComponent },
  { path: 'anketekle', component: AnketekleComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLogin } },
  { path: 'adminpaneli', component: AdminpaneliComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLogin } },
  { path: 'sorucevapekle/:key', component: SorucevapekleComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLogin }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
