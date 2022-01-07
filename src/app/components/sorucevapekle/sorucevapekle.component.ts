import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Anket } from 'src/app/models/anket';
import { Sonuc } from 'src/app/models/sonuc';

@Component({
  selector: 'app-sorucevapekle',
  templateUrl: './sorucevapekle.component.html',
  styleUrls: ['./sorucevapekle.component.scss']
})
export class SorucevapekleComponent implements OnInit {
  key: string;
  secAnket: Anket = new Anket();
  uid: string;
  constructor(
    public route: ActivatedRoute,
    public fbServis: FbservisService,
    public router: Router
  ) { }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem("user"));
    this.uid = user.uid;
    this.route.params.subscribe(p => {
      this.key = p.key;
      this.AnketGetir();
    });
  }
  AnketGetir() {
    this.fbServis.SoruByKey(this.key).snapshotChanges().subscribe(data => {
      const y = { ...data.payload.toJSON(), key: this.key };
      this.secAnket = (y as Anket);
      if (this.uid != this.secAnket.uid) {
        this.router.navigate(['/anketler']);
      }
    });
  }

  Kaydet() {
    var user = JSON.parse(localStorage.getItem("user"));
    this.secAnket.uid=user.uid;
    var tarih = new Date();
    this.secAnket.duzTarih = tarih.getTime().toString();
    this.secAnket.kayTarih = tarih.getTime().toString();
    this.fbServis.AnketEkle(this.secAnket).then(d=>{
      this.router.navigate(['/anketler'])
    });
  }
}
