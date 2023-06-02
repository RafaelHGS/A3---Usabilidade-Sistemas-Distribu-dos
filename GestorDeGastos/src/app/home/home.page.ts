import { Component } from '@angular/core';
import { AlertController, ToastController, PopoverController } from '@ionic/angular';
import { TkService } from '../services/tk.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  type: string = "ganho";

  constructor(private alertController: AlertController,
    public tkService: TkService,
    public toastController: ToastController,
    public popoverController: PopoverController,
    public router: Router,) { }

  ngOnInit() {
    this.tkService.setGastoGanhos();
    // if (this.tkService.getGastoGanho() == null){
    //   this.tkService.getGastoGanhoFromStorage();
    // }

  }


  logout() {
    this.popoverController.dismiss();
    this.router.navigate(["login"])
  }

  profile() {
    this.popoverController.dismiss();
    this.router.navigate(["profile"])
  }

  async presentAlertPromptAdicionar() {
    const alert = await this.alertController.create({
      header: "Novo Gasto/Ganho",
      inputs: [
        {
          name: "gastoGanho",
          type: "text",
          placeholder: "Gasto/Ganho"
        },
        {
          name: "valor",
          type: "number",
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
            if (dadosAlert.gastoGanho != "" && dadosAlert.valor != "")
              this.tkService.adicionarGastoGanho(dadosAlert.gastoGanho, dadosAlert.valor)
            else {
              this.presentToast();
              this.presentAlertPromptAdicionar();
            }
          }
        }
      ]
    })
    await alert.present();
  }


  async presentAlertPromptLimpar(index: number, valor: Number) {
    const alert = await this.alertController.create({
      header: "Exclusão !!!",
      message: 'Deseja Excluir essa Entrada/Saída ?',
      buttons: [
        {
          text: "cancelar",
          role: "cancel",
        }, {
          text: "Excluir",
          handler: () => this.tkService.limparGastoGanho(index, Number(valor) * -1)
        }
      ]
    })
    await alert.present();
  }


  async presentAlertPromptAtualizar(index: number, gastoGanho: any) {
    const alert = await this.alertController.create({
      header: "Alterar Campo",
      inputs: [
        {
          name: "gastoGanho",
          type: "text",
          placeholder: "Gasto/Ganho",
          value: gastoGanho.nome
        },
        {
          name: "valor",
          type: "number",
          value: gastoGanho.valor
        }
      ],
      buttons: [
        {
          text: "cancelar",
          role: "cancel",
          handler: () => {
            console.log("Confirm Cancel");
          }
        },
        {
          text: "Salvar",
          handler: (dadosAlert) => {
            this.tkService.setSaldo(Number(gastoGanho.valor) * -1);
            if (dadosAlert.gastoGanho != "" && dadosAlert.valor != "") {
              this.tkService.atualizarGastoGanho(index, dadosAlert.gastoGanho, dadosAlert.valor)
            } else {
              this.presentToast();
              this.tkService.atualizarGastoGanho(index, dadosAlert.gastoGanho, dadosAlert.valor)
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