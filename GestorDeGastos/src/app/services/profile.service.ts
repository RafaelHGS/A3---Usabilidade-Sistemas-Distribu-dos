import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private alertController: AlertController) { }

  private email : String = "";
  private username : String = "";
  private userId : Number = 0;

  public setEmail(email : String){
    this.email = email;
  }

  public getEmail(){
    return this.email;
  }

  
  public setUsername(username : String){
    this.username = username;
  }

  public getUsername(){
    return this.username;
  }

  public setUserId(userId : Number){
    this.userId = userId;
  }

  public getUserId(){
    return this.userId;
  }


  public async setProfile() {
    try {
      const url = "http://localhost:8080/loggedUser/"+this.getEmail();
      const response = await axios.get(url);
      this.setUserId(response.data.id);
      this.setUsername(response.data.name);

    } catch (error : any) {

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

  
  public async editProfile(){
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
          handler: (dadosAlert) => {
            if (dadosAlert.name != "" && dadosAlert.email != "")
            //Implementar inserção de dados da API
                console.log("aroba");
            else{
              console.log("aroba2")
              //Implementar Erros de dados 

              // this.presentToast();
              // this.presentAlertPromptAdicionar();
            }
          }
        }
      ]
    })
    await alert.present();
  
  }


  public async deleteProfile(){

  }
  

  // async presentToast(){
  //   const toast = await this.toastController.create({
  //     message: "Preencha os campos!",
  //     duration: 2500
  //   });
  //   toast.present();
  // }


}
