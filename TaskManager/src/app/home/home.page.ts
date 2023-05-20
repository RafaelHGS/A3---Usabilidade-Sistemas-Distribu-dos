import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private alertController: AlertController) {}

  async presentAlertPromptAdicionar(){
    const alert = await this.alertController.create({
      header: "Adicionar tarefa",
      inputs: [
        {
          name: "nome1",
          type: "text",
          placeholder: "Placeholder"
        }  
      ],
      buttons: [
        {
          text: "cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          }
        }, {
          text: "Ok",
          handler: () => {
            console.log("Confirm Ok");
          }
        }
      ]
    })
    await alert.present();
  }
}
