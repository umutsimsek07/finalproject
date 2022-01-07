import { Sonuc } from 'src/app/models/sonuc';
import { Uye } from 'src/app/models/uye';
import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Anket } from 'src/app/models/anket';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-anketduzenle',
  templateUrl: './anketduzenle.component.html',
  styleUrls: ['./anketduzenle.component.scss']
})
export class AnketduzenleComponent implements OnInit {
  key: string;
  secAnket: Anket = new Anket();
  uid: string;
  secUye: Uye = new Uye();
  sonuc: Sonuc=new Sonuc();
  constructor(
    public route: ActivatedRoute,
    public fbServis: FbservisService,
    public router: Router,
    public toast:ToastrService
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
    this.fbServis.AnketByKey(this.key).snapshotChanges().subscribe(data => {
      const y = { ...data.payload.toJSON(), key: this.key };
      this.secAnket = (y as Anket);
      if (this.uid != this.secAnket.uid) {
        this.router.navigate(['/anketler']);
      }
    });
  }

  Kaydet() {
    var tarih = new Date();
    this.secAnket.duzTarih = tarih.getTime().toString();
    this.fbServis.AnketDuzenle(this.secAnket).then(d => {
      this.router.navigate(['anketler']);
    });
  }
  Vazgec(){
    this.secAnket=new Anket();
    this.secAnket.key=null;
  }
  ToastSuccess(){
    this.toast.success("İşlem Başarılı");
  }
  TamamlaIptal(k: Anket, islem: boolean) {
    k.islem = islem;
    this.fbServis.AnketDuzenle(k).then(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Güncellendi";
    });
  }
}
