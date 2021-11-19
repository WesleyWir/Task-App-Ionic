import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  private _formCadastrar: FormGroup;
  isSubmitted = false;

  constructor(public alertController: AlertController,
    private _router: Router,
    public formbuilder: FormBuilder) { }

  ngOnInit() {
    this._formCadastrar = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confSenha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get errorControl() {
    return this._formCadastrar.controls;
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this._formCadastrar.valid) {
      this.presentAlert("Agenda", "Cadastrar", "Todos os Campos são Obrigatórios!");
      return false;
    } else {
      this.cadastrar()
    }
  }

  private cadastrar(): void {

    console.log(this._formCadastrar.value['email'],
      this._formCadastrar.value['senha'])

    this.presentAlert("Agenda", "Cadastrar", "Seja Bem vindo!");
    this._router.navigate(["/signin"]);
  }

  async presentAlert(titulo: string, subtitulo: string, mensagem: string) {
    const alert = await this.alertController.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensagem,
      buttons: ['OK']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }
}
