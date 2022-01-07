import { Anket } from './../../models/anket';
import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-anketsil',
  templateUrl: './anketsil.component.html',
  styleUrls: ['./anketsil.component.scss']
})
export class AnketsilComponent implements OnInit {
  uid: string;
  key: string;
  secAnket: Anket = new Anket();
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

  Sil() {
    this.fbServis.AnketSil(this.key).then(d => {
      this.router.navigate(['/anketler']);
    });
  }
  ToastSuccess(){
    this.toast.success("İşlem Başarılı");
  }
  ToastDanger(){
    this.toast.error("İşlem Başarısız");
  }
}

