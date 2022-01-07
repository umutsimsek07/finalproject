import { Sonuc } from './../../models/sonuc';
import { Anket } from './../../models/anket';
import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-anketdetay',
  templateUrl: './anketdetay.component.html',
  styleUrls: ['./anketdetay.component.scss']
})
export class AnketdetayComponent implements OnInit {
key:string;
adsoyad: string;
  uid: string;
secAnket: Anket = new Anket();
sonuc: Sonuc = new Sonuc();
  constructor(
    public route: ActivatedRoute,
    public fbServis: FbservisService,
    public router: Router
  ) { }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem("user"));
    this.uid = user.uid;
    this.adsoyad = user.displayName;
    this.route.params.subscribe(p => {
      this.key = p.key;
      this.AnketGetir();
    });
  }
  AnketGetir() {
    this.fbServis.AnketByKey(this.key).snapshotChanges().subscribe(data => {
      const y = { ...data.payload.toJSON(), key: this.key };
      this.secAnket = (y as Anket);
    });
  }
  TamamlaIptal(k: Anket, islem: boolean) {
    var tarih = new Date();
    k.duzTarih = tarih.getTime().toString();
    k.islem = islem;
    this.fbServis.AnketDuzenle(k).then(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Kayıt Güncellendi";
    });

  }
}
