import { Anket } from './../../models/anket';
import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sonuc } from 'src/app/models/sonuc';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-anketekle',
  templateUrl: './anketekle.component.html',
  styleUrls: ['./anketekle.component.scss']
})

export class AnketekleComponent implements OnInit {
  
  sonuc: Sonuc = new Sonuc();
  secAnket: Anket = new Anket();
  adsoyad: string;
  uid: string;
  constructor(
    public fbServis: FbservisService,
    public router: Router,
    public toast:ToastrService
  ) { }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem("user"));
    this.uid = user.uid;
    this.adsoyad = user.displayName;
  }

  Kaydet() {
    var user = JSON.parse(localStorage.getItem("user"));
    this.secAnket.uid=user.uid;
    var tarih = new Date();
    this.secAnket.duzTarih = tarih.getTime().toString();
    this.secAnket.kayTarih = tarih.getTime().toString();
    this.toast.success("Anket Eklendi");
    this.fbServis.AnketEkle(this.secAnket).then(d=>{
      this.router.navigate(['/anketler'])
    });
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

  ToastSuccess(){
    this.toast.success("İşlem Başarılı");
  }
  ToastDanger(){
    this.toast.error("İşlem Başarısız");
  }

}
