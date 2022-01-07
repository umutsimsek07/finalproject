import { Uye } from 'src/app/models/uye';
import { FbservisService } from './../../services/fbservis.service';
import { Anket } from './../../models/anket';
import { Component, OnInit } from '@angular/core';
import { Sonuc } from 'src/app/models/sonuc';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-anket',
  templateUrl: './anket.component.html',
  styleUrls: ['./anket.component.scss']
})
export class AnketComponent implements OnInit {
  uyeler: Uye[];
  adsoyad: string;
  uid: string;
  sonuc: Sonuc = new Sonuc();
  anketler: Anket[];
  secAnket: Anket = new Anket();
  gostergizle: boolean = true;
  secUye: Uye = new Uye();
  constructor(
    public fbServis: FbservisService,
    public router: Router,
    public toast:ToastrService

  ) { }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem("user"));
    this.uid = user.uid;
    this.adsoyad = user.displayName;
    this.AnketListele();
    this.UyeListele();
  }
  // AnketListele() {
  //   this.fbServis.AnketListeleByUID(this.uid).snapshotChanges().subscribe(data => {
  //     this.anketler = [];
  //     data.forEach(satir => {
  //       const y = { ...satir.payload.toJSON(), key: satir.key };
  //       this.anketler.push(y as Anket);
  //     });
  //   });
  // }
  AnketListele() {
    this.fbServis.AnketListele().snapshotChanges().subscribe(data => {
      this.anketler = [];
      data.forEach(satir => {
        const y = { ...satir.payload.toJSON(), key: satir.key };
        this.anketler.push(y as Anket);
      });
    });
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
  Kaydet() {
    var tarih = new Date();
    this.secAnket.duzTarih = tarih.getTime().toString();
    if (this.secAnket.key == null) {
      this.secAnket.kayTarih = tarih.getTime().toString();
      this.fbServis.AnketEkle(this.secAnket).then(() => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Anket Eklendi";
      });
    }
    else {
      this.fbServis.AnketDuzenle(this.secAnket).then(() => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Anket Düzenlendi";
      });
    }
  }

  AnketSil(anket: Anket) {
    this.fbServis.AnketSil(anket.key).then(() => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Anket silindi";
    });
  }
  Vazgec() {
    this.secAnket = new Anket();
    this.secAnket.key = null;
  }
  AnketSec(k: Anket) {
    Object.assign(this.secAnket, k);
  }
  TamamlaIptal(k: Anket, islem: boolean) {
    k.islem = islem;
    this.fbServis.AnketDuzenle(k).then(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Güncellendi";
    });
  }
  OturumKapat() {
    this.fbServis.OturumKapat().then(() => {
      localStorage.removeItem("user");
      this.router.navigate(['/login']);
    });
  }

}
