import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SymptomsModalPage } from '../symptoms-modal/symptoms-modal.page';
import { SymptomsService } from '../../services/symptoms.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-important',
  templateUrl: './important.page.html',
  styleUrls: ['./important.page.scss'],
})
export class ImportantPage implements OnInit {

  symptoms = [];
  importants = [];

  constructor(private platform: Platform, private modalController: ModalController, private symptomService: SymptomsService) { }

  ngOnInit() {
    this.loadPlan();
  }

  emptyArray() {
    for (let item = 0; item < this.importants.length; item++) {
      this.importants.pop();
    }
  }

  sortInputs(symptoms) {
    console.log("Sorting inputs: ", symptoms)
    for (let symptom of symptoms) {
      if (symptom.level == "important") {
        this.importants.push(symptom);
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

        console.log('important array: ', this.importants);
      })
  }

  // Create a modal to add a new symptom input
  addInput() {
    this.modalController.create({
      component: SymptomsModalPage,
      componentProps: { symptoms: this.symptoms }
    }).then(modal => {
      modal.present();

      // Get the data passed when the modal is dismissed 
      modal.onWillDismiss().then(data => {
        if (data.data && data.data['reload']) {
          console.log("Reload important page");
          this.loadPlan();
        }
      })
    })
  }
}
