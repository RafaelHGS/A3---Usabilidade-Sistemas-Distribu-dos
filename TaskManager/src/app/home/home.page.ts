import { Component } from '@angular/core';
import { AlertController, ToastController, PopoverController } from '@ionic/angular';
import { TkService } from '../services/tk.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  type: string = "pendente";

  constructor(private alertController: AlertController,
              public tkService: TkService,
              public toastController: ToastController,
              public popoverController : PopoverController) {}

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


  async presentAlertPromptLimpar(index : number){
    const alert = await this.alertController.create({
      header: "Limpar Tarefa!",
      message: 'Deseja Excluir essa tarefa ?',
      buttons: [
        {
          text: "cancelar",
          role: "cancel",
        }, {
          text: "Excluir",
          handler: () => this.tkService.limparTarefa(index)
          }
      ]
    })
    await alert.present();
  }


  async presentAlertPromptAtualizar(index: number, tarefa: any){
    const alert = await this.alertController.create({
      header: "Modificar Tarefa",
      inputs: [
        {
          name: "Tarefa",
          type: "text",
          placeholder: "Tarefa",
          value: tarefa.value
        },
        {
          name: "Data",
          type: "date",
          min: '2023-05-01',
          value: tarefa.date.getFullYear() + "-" 
          + ((tarefa.date.getMonth()+1) < 10 ? '0' + (tarefa.date.getMonth()+1) : (tarefa.date.getMonth()+1)) + "-" 
          + ((tarefa.date.getDay()+1) < 10 ? '0' + (tarefa.date.getDay()) : (tarefa.date.getMonth()))

        },
      ],
      buttons: [
        {
          text: "cancelar",
          role: "cancel",
          handler: () => {
            console.log("Confirm Cancel");
          }
        }, {
          text: "Salvar",
          handler: (dadosAlert) => {
            if (dadosAlert.Tarefa != "")
              this.tkService.atualizarTarefa(index, dadosAlert.Tarefa, dadosAlert.Data)
            else{
              this.presentToast();
              this.tkService.atualizarTarefa(index, dadosAlert.Tarefa, dadosAlert.Data)
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

  // async presentPopover(ev: any){
  //   const popover = await this.popoverController.create({
  //     component: PopoverComponent,
  //     event: ev,
  //     translucent: true
  //   });
  //   return await popover.present();
  // }
}