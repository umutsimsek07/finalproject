import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sonuc } from 'src/app/models/sonuc';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  sonuc: Sonuc=new Sonuc();
  constructor(
    public fbservis:FbservisService,
    public router: Router,
    public toast:ToastrService
  ) { }

  ngOnInit() {
  }
  GirisYap(mail:string,parola:string){
    this.fbservis.OturumAc(mail,parola).then(d=>{
      if (d.user){
        localStorage.setItem("user", JSON.stringify(d.user));
        this.toast.success("Giriş Başarılı");
        this.router.navigate(['/anketler']);
      }
    }, err => {
      this.sonuc.islem= false;
      this.toast.error("E-posta Adresi veya Parola geçersiz");

      // this.sonuc.mesaj="E-posta Adresi veya Parola geçersiz"
    });
  }
}
