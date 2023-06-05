import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ProfileService } from '../services/profile.service';
import { FinancesAPIService } from '../services/finances-api.service';
import axios from 'axios';
import urls from "src/assets/config/urls.json";
import { FinancesService } from '../services/finances.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public profileService: ProfileService,
              public router: Router,
              public toastController : ToastController,
              public financeApi : FinancesAPIService,
              public financeService : FinancesService) { }

  ngOnInit() {
    this.profileService.resetProfile();
    this.profileService.cleanStorage();
    this.financeService.cleanStorage();
  }

  //Dados para Login
  loginData = {
    email: '',
    password: ''
  };


  //Método de Login e definição de usuário/profile
  public async login() {
    try {
      const url= urls.login;   //Alterar URL, no arquivo de configuração, de acordo com sua aplicação
      const response = await axios.post(url, this.loginData);
      this.profileService.setEmail(this.loginData.email);
      await this.profileService.setProfile();
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

  //Limpeza de Login
  public clearLogin(){
    this.loginData.email = '';
    this.loginData.password = '';
  }

  //Mensagem Principal de Erro
  async presentToast(msg : string){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2500
    });
    toast.present();
  }


}

