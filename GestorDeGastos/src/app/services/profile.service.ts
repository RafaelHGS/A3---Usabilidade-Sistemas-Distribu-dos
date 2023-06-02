import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(public alertController: AlertController,
    public toastController: ToastController,
    public router: Router) { }

  private email: String = "";
  private username: String = "";
  private userId: Number = 0;

  public setEmail(email: String) {
    this.email = email;
  }

  public getEmail() {
    return this.email;
  }


  public setUsername(username: String) {
    this.username = username;
  }

  public getUsername() {
    return this.username;
  }

  public setUserId(userId: Number) {
    this.userId = userId;
  }

  public getUserId() {
    return this.userId;
  }


  async verifyEmail(email: String) {
    try {
      const url = "http://localhost:8080/loggedUser/" + email;
      const response = await axios.get(url);
      console.log(response)
      return true;
    } catch (error) {
      console.error(error)
      return false;
    }
  }

  async setProfile() {
    try {
      const url = "http://localhost:8080/loggedUser/" + this.getEmail();
      const response = await axios.get(url);
      this.setUserId(response.data.id);
      this.setUsername(response.data.name);

    } catch (error: any) {

      const aux = error.response.data.message;
      console.error(aux);
    }
  }

  public getProfile() {
    try {
      const tempProfile: any[] = [
        this.getUsername(),
        this.getEmail()
      ];
      return tempProfile;
    } catch (error: any) {
      console.error(error);
      return [];
    }
  }


  async presentAlertPrompteditProfile() {
    const alert = await this.alertController.create({
      header: "Alterar Dados",
      inputs: [
        {
          name: "name",
          type: "text",
          placeholder: "Novo nome"
        },
        {
          name: "email",
          type: "text",
          placeholder: "Novo email"
        },
        {
          name: "senha",
          type: "text",
          placeholder: "Nova senha"
        }
      ],
      buttons: [
        {
          text: "cancelar",
          role: "cancel",
          handler: () => {
            console.log("Confirm Cancel");
          }
        }, {
          text: "Alterar",
          handler: async (dadosAlert) => {
            if (dadosAlert.name != "") {
              try {
                const userData = {
                  id: this.getUserId(),
                  name: dadosAlert.name,
                  email: dadosAlert.email,
                  password: dadosAlert.senha
                };

                if (dadosAlert.email == "" || dadosAlert.email == null) {
                  userData.email = this.getEmail();
                }
                if (dadosAlert.password == "" || dadosAlert.password == null) {
                  userData.password = null;
                }


                const url = "http://localhost:8080/loggedUser/User";
                const response = await axios.put(url, userData);

                this.setUsername(userData.name);
                this.setEmail(userData.email);

              } catch (error: any) {
                const aux = error.response.data.message;

                const toast = await this.toastController.create({
                  message: aux,
                  duration: 2500
                });
                toast.present();
                this.presentAlertPrompteditProfile();

              }
            }
            else {

              this.presentToast();
              this.presentAlertPrompteditProfile();
            }
          }
        }
      ]
    })
    await alert.present();

  }


  public async deleteProfile() {
    const alert = await this.alertController.create({
      header: "Exclusão !!!",
      message: 'Deseja Realmente excluir sua conta ? Essa Ação não poderá ser desfeita!',
      buttons: [
        {
          text: "cancelar",
          role: "cancel",
        }, {
          text: "Excluir",
          handler: async () => {
            try {
              const url = "http://localhost:8080/loggedUser/delete/" + this.getEmail();
              const response = await axios.delete(url);

              const toast = await this.toastController.create({
                message: "Usuário Excluído com sucesso",
                duration: 2500
              });
              toast.present();

              this.router.navigate(["login"]);

            } catch (error) {
              console.error(error);
            }
          }
        }
      ]
    })
    await alert.present();



  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: "Preencha os campos!",
      duration: 2500
    });
    toast.present();
  }


}
