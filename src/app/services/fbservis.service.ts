import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Anket } from '../models/anket';
import { Uye } from '../models/uye';


@Injectable({
  providedIn: 'root'
})
export class FbservisService {
  private dbAnket = '/Anketler';
  private dbUye = '/Uyeler';
  anketRef: AngularFireList<Anket> = null;
  uyeRef: AngularFireList<Uye> = null;
  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {
    this.uyeRef = db.list(this.dbUye);
    this.anketRef = db.list(this.dbAnket);
  }

  /* oturum kontrol */
  OturumAc(mail: string, parola: string) {
    return this.afAuth.signInWithEmailAndPassword(mail, parola);
  }
  OturumKapat() {
    return this.afAuth.signOut();
  }
  OturumKontrol() {
    if (localStorage.getItem("user")) {
      return true;

    } else {
      return false;
    }
  }
  /* oturum kontrol */
  /*/ uye islemleri */
  UyeOl(uye: Uye) {
    return this.afAuth.createUserWithEmailAndPassword(uye.mail, uye.parola)
  }
  UyeEkle(uye: Uye) {
    return this.uyeRef.push(uye);
  }
  UyeListele(){
    return this.uyeRef;
  }
  UyeDuzenle(uye: Uye) {
    return this.uyeRef.update(uye.key, uye);
  }
  UyeSil(uye: string) {
    return this.uyeRef.remove(uye);
  }
  /*/ uye islemleri */
  /* Anketlar firebase servis başlangıç*/
  AnketListele() {
    return this.anketRef;
  }
  AnketListeleByUID(uid: string) {
    return this.db.list("/Anketler", q => q.orderByChild("uid").equalTo(uid));
  }
  AnketByKey(key: string) {
    return this.db.object("/Anketler/" + key);
  }
  SoruByKey(key: string) {
    return this.db.object("/Anketler/" + key);
  }
  AnketEkle(anket: Anket) {
    return this.anketRef.push(anket);
  }
  AnketDuzenle(anket: Anket) {
    return this.anketRef.update(anket.key, anket);
  }
  AnketSil(key: string) {
    return this.anketRef.remove(key);
  }
  /* Anketlar firebase servis bitiş*/
}
