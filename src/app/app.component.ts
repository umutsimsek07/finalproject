import { FbservisService } from './services/fbservis.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'finalproject';
  constructor(
    public fbServis: FbservisService,
    public router: Router
  ){}
  OturumKapat() {
    this.fbServis.OturumKapat().then(() => {
      localStorage.removeItem("user");
      this.router.navigate(['']);
    });
  }
  OturumKontrol(){
    if (localStorage.getItem("user")){
      return true;
    }else{
      return false;
    }
  }
}
