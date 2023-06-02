import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ProfileService } from '../services/profile.service';
import { FinancesAPIService } from '../services/finances-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public profileService: ProfileService,
              public router: Router,
              public toastController : ToastController,
              public apiService : FinancesAPIService) { }

  ngOnInit() {
  }

  loginData = {
    email: '',
    password: ''
  };


  async login() {
    try {
      const url= "http://localhost:8080/auth/login";
      const response = await axios.post(url, this.loginData);
      this.profileService.setEmail(this.loginData.email);
      this.profileService.setProfile();
      this.router.navigate(["home"])
      this.clearLogin();
      
    } catch (error : any) {

      const aux = error.response.data.message;
      this.presentToast(aux);
    }
  }

  public clearLogin(){
    this.loginData.email = '';
    this.loginData.password = '';
  }

  async presentToast(msg : String){
    const toast = await this.toastController.create({
      message: String(msg),
      duration: 2500
    });
    toast.present();
  }


}

