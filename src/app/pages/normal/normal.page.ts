import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SymptomsModalPage } from '../symptoms-modal/symptoms-modal.page';
import { SymptomsService } from '../../services/symptoms.service';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-normal',
  templateUrl: './normal.page.html',
  styleUrls: ['./normal.page.scss'],
})
export class NormalPage implements OnInit {

  symptoms = [];
  normals = [];

  constructor(private platform: Platform, private modalController: ModalController, private symptomService: SymptomsService) { }

  ngOnInit() {
    this.loadPlan();
  }

  ionViewWillEnter() {
    this.loadPlan();
  }

  emptyArray() {
    this.normals.length = 0;
  }

  sortInputs(symptoms) {
    console.log("Sorting inputs: ", symptoms)
    for (let symptom of symptoms) {
      if (symptom.level == "normal") {
        this.normals.push(symptom);
      }
    }
  }

  loadPlan() {
    this.symptomService.getPlan()
      .then(result => {
        console.log("getPlan() result: ", result)
        this.symptoms = result;

        this.emptyArray();

        this.sortInputs(this.symptoms);

        console.log('normal array: ', this.normals);
      })
  }

  // Create a modal to add a new symptom input
  addInput() {
    this.modalController.create({
      component: SymptomsModalPage,
      componentProps: { symptoms: this.symptoms, level: "normal" }
    }).then(modal => {
      modal.present();

      // Get the data passed when the modal is dismissed 
      modal.onWillDismiss().then(data => {
        if (data.data && data.data['reload']) {
          console.log("Reload normal page");
          this.loadPlan();
        }
      })
    })
  }

  openInput(id) {
    this.modalController.create({
      component: SymptomsModalPage,
      componentProps: { symptoms: this.symptoms, id: id }
    }).then(modal => {
      modal.present();

      // Get the data passed when the modal is dismissed 
      modal.onWillDismiss().then(data => {
        if (data.data && data.data['reload']) {
          console.log("Reload normal page");
          this.loadPlan();
        }
      })
    })
  }
}
