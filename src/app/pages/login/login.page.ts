import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private headerTitle: string;
  private _formLogin: FormGroup;
  private _isSubmited: boolean = false;

  constructor(public alertController: AlertController,
    public router: Router, public auth: AuthService, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.headerTitle = 'Tarefas';
    this._formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get errorControl() {
    return this._formLogin.controls;
  }

  public submitForm() {
    this._isSubmited = true;
    if (!this._formLogin.valid) {
      this.presentAlert('Tarefas', 'Erro', 'Campos inválidos.');
      return false;
    }
    this.login();
  }

  private login(): void {
    this.auth.login(this._formLogin.value['email'], this._formLogin.value['senha'])
      .then((res) => {
        this.presentAlert('Tarefas', 'Sucesso', 'Seja bem vindo.');
        this.router.navigate(["/task-list"]);
      }).catch((error) => {
        this.presentAlert('Tarefas', 'Erro', 'Erro ao Logar: ' + error.message);
      });
  }

  private logarComGoogle(): void {
    this.auth.signInWithGoogle();
  }

  private logarComFacebook(): void {
    this.auth.signInWithFacebook();
  }

  private irParaCadastrar(): void {
    this.router.navigate(["/signup"]);
  }

  private irParaRecuperar(): void {
    this.router.navigate(["/esqueceu-senha"]);
  }

  async presentAlert(titulo: string, subtitulo: string, msg: string) {
    const alert = await this.alertController.create({
      header: titulo,
      subHeader: subtitulo,
      message: msg,
      buttons: ['OK']
    });
    await alert.present();

  }
}
