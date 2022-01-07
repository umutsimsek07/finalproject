import { Sonuc } from './../../models/sonuc';
import { Uye } from 'src/app/models/uye';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FbservisService } from 'src/app/services/fbservis.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adminpaneli',
  templateUrl: './adminpaneli.component.html',
  styleUrls: ['./adminpaneli.component.scss']
})
export class AdminpaneliComponent implements OnInit {
  secUye: Uye = new Uye();
  uyeler: Uye[];
  sonuc:Sonuc=new Sonuc();
  adsoyad:string;
  uid:string;
  constructor(
    public fbServis: FbservisService,
    public router: Router,
    public toast:ToastrService
  ) { }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem("user"));
    this.uid = user.uid;
    this.adsoyad = user.displayName;
    this.UyeListele();
  }

  UyeListele() {
    this.fbServis.UyeListele().snapshotChanges().subscribe(data => {
      this.uyeler = [];
      data.forEach(satir => {
        const y = { ...satir.payload.toJSON(), key: satir.key };
        this.uyeler.push(y as Uye);
      });
    });
  }
  UyeSec(k: Uye) {
    Object.assign(this.secUye, k);
  }
  UyeSil(uye: Uye) {
    if (this.secUye.admin=='1'){
      this.Vazgec();
    }else if(this.secUye.admin=='0'){
      this.fbServis.UyeSil(uye.key).then(() => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Uye silindi";
      });
    }
  }
  Duzenle(){
    this.fbServis.UyeDuzenle(this.secUye).then(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Uye Güncellendi";
      this.UyeListele();
    });
  }
  Vazgec(){
    this.secUye=new Uye();
    this.secUye.key=null;
  }
}
