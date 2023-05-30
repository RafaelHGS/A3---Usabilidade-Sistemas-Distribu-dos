import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { TkService } from '../services/tk.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public tkService: TkService,
              public router: Router,
              public toastController : ToastController) { }

  ngOnInit() {
  }

  loginData = {
    nome: '',
    email: '',
    password: ''
  };

  
  async login() {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', this.loginData);
      const email = response.data.email;
      this.tkService.setClientId(email);
      this.router.navigate(["home"])
    } catch (error : any) {

      const aux = error.response.data.message;
      this.presentToast(aux);
    }
  }


  async presentToast(msg : String){
    const toast = await this.toastController.create({
      message: String(msg),
      duration: 2500
    });
    toast.present();
  }


}

