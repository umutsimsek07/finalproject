import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sonuc } from 'src/app/models/sonuc';
import { Uye } from 'src/app/models/uye';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  secUye: Uye = new Uye();
  sonuc: Sonuc = new Sonuc();
  constructor(
    public fbservis: FbservisService,
    public router: Router,
    public toast:ToastrService
  ) { }

  ngOnInit() {
  }
  KayitYap() {
    this.fbservis.UyeOl(this.secUye).then(d => {
      d.user.updateProfile({
        displayName: this.secUye.adsoyad
      }).then();
      this.secUye.uid=d.user.uid;
      this.secUye.admin="0";
      localStorage.setItem("user", JSON.stringify(d.user));
      this.UyeEkle();
      this.toast.success("Kayıt Başarı Ile Oluşturuldu");
    }, err => {
      this.sonuc.islem = false;
      this.toast.error("E-posta Adresi veya Parola geçersiz");
      // this.sonuc.mesaj = "E-posta Adresi veya Parola geçersiz"
    });
  }
  UyeEkle(){
    this.fbservis.UyeEkle(this.secUye).then(d=>{
      this.router.navigate(['/anketler']);
    });
  }
}
