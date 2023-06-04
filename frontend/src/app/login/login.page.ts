import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ProfileService } from '../services/profile.service';
import { FinancesAPIService } from '../services/finances-api.service';
import axios from 'axios';
import urls from "src/assets/config/urls.json";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public profileService: ProfileService,
              public router: Router,
              public toastController : ToastController,
              public financeApi : FinancesAPIService) { }

  ngOnInit() {
  }

  loginData = {
    email: '',
    password: ''
  };


  async login() {
    try {
      const url= urls.login;
      const response = await axios.post(url, this.loginData);
      this.profileService.setEmail(this.loginData.email);
      this.profileService.setProfile();
      this.router.navigate(["home"])
      this.clearLogin();
      
    } catch (error : any) {
      try{
        const aux = error.response.data.message;
        this.presentToast(aux);
      }
      catch (error){
        this.presentToast("Erro de Conexão com servidor, tente novamente mais tarde");
      }
    }
  }

  public clearLogin(){
    this.loginData.email = '';
    this.loginData.password = '';
  }

  async presentToast(msg : string){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2500
    });
    toast.present();
  }


}

