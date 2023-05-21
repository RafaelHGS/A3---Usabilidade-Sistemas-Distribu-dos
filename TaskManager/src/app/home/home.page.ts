import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { TkService } from '../services/tk.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private alertController: AlertController,
              public tkService: TkService,
              public toastController: ToastController) {}

  async presentAlertPromptAdicionar(){
    const alert = await this.alertController.create({
      header: "Nova Tarefa",
      inputs: [
        {
          name: "Tarefa",
          type: "text",
          placeholder: "Tarefa"
        },
        {
          name: "Data",
          type: "date",
          min: '2023-05-01',
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
          text: "Ok",
          handler: (dadosAlert) => {
            if (dadosAlert.Tarefa != "")
              this.tkService.adicionarTarefa(dadosAlert.Tarefa, dadosAlert.Data)
            else{
              this.presentToast();
              this.presentAlertPromptAdicionar();
            }
          }
        }
      ]
    })
    await alert.present();
  }

  async presentToast(){
    const toast = await this.toastController.create({
      message: "Digite uma Tarefa!",
      duration: 2500
    });
    toast.present();
  }
}

