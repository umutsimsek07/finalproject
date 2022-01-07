import { HomeComponent } from './components/home/home.component';
import { AdminpaneliComponent } from './components/adminpaneli/adminpaneli.component';
import { ToastrModule } from 'ngx-toastr';
import { SorucevapekleComponent } from './components/sorucevapekle/sorucevapekle.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AnketsilComponent } from './components/anketsil/anketsil.component';
import { AnketekleComponent } from './components/anketekle/anketekle.component';
import { AnketduzenleComponent } from './components/anketduzenle/anketduzenle.component';
import { AnketdetayComponent } from './components/anketdetay/anketdetay.component';
import { AnketComponent } from './components/anket/anket.component';
import { environment } from './../environments/environment.prod';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';


@NgModule({
  declarations: [
    AppComponent,
    AnketComponent,
    AnketdetayComponent,
    AnketduzenleComponent,
    AnketekleComponent,
    AnketsilComponent,
    LoginComponent,
    RegisterComponent,
    SorucevapekleComponent,
    AdminpaneliComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    ToastrModule.forRoot()
    
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
