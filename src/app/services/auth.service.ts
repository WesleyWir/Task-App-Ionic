import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { auth } from 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuarioDados: any;
  constructor(public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone) {
    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.usuarioDados = user;
        localStorage.setItem('user', JSON.stringify(this.usuarioDados));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  public login(email: string, password: string) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  public loginWithEmailPassword(email: string, password: string) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password)
  }

  public AuthLogin(provider) {
    return this.ngFireAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['task-list']);
        })
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error)
      })
  }

  public signInWithGoogle() {
    this.AuthLogin(new auth.GoogleAuthProvider());
  }

  public SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  public estaLogado(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  public getUsuarioLogado(): User {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user != null) {
      return user;
    } else {
      return null;
    }
  }

  public recuperarSenha(email: string) {
    return this.ngFireAuth.sendPasswordResetEmail(email)
      .then(() => {
        console.log("Enviado para o Email")
      }).catch((error) => {
        console.log(error)
      })
  }

  public signOut() {
    return this.ngFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['signIn']);
    })
  }
}
