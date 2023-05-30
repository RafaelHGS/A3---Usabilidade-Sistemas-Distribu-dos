import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.page.html',
  styleUrls: ['signup.page.scss'],
})
export class SignupPage {

  constructor(public router: Router,
    public toastController: ToastController) { }

  private _errorMessage: String = '';

  public getErrorMessage(): String {
    return this._errorMessage;
  }
  public setErrorMessage(value: String) {
    this._errorMessage = value;
  }


  signupData = {
    name: '',
    email: '',
    password: ''
  };

  async signup() {
    try{
      const url = 'http://localhost:8080/auth/signup'; // Altere a URL conforme necessário
      const response = await axios.post(url, this.signupData)

      console.log(response.data); // Exemplo de resposta bem-sucedida
      this.router.navigate(["login"])
    } catch (error : any) {
      this.setErrorMessage(error.response.data);
      this.presentToast();
      
    }
  }

  async presentToast(){
    const toast = await this.toastController.create({
      message: String(this.getErrorMessage()),
      duration: 2500
    });
    toast.present();
  }
}




