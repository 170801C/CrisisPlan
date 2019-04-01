import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SymptomsService } from '../../services/symptoms.service';
import { ModalController } from '@ionic/angular';
import { SymptomsModalPage } from '../symptoms-modal/symptoms-modal.page';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss'],
})
export class PlanPage implements OnInit {

  // Declare an array to hold all plans from storage, to be used in template
  symptoms = [];
  criticals = [];
  importants = [];
  attentions = [];
  normals = [];

  constructor(private platform: Platform, private symptomService: SymptomsService, private modalController: ModalController) { }

  ngOnInit() {
    // this.symptomService.deletePlan();

    this.platform.ready()
      .then(() => {
        this.loadPlan();
      })
  }

  // Clear the colored arrays
  emptyArrays() {
    for (let item = 0; item < this.criticals.length; item++) {
      this.criticals.pop();
    }
    for (let item = 0; item < this.importants.length; item++) {
      this.importants.pop();
    }
    for (let item = 0; item < this.attentions.length; item++) {
      this.attentions.pop();
    }
    for (let item = 0; item < this.normals.length; item++) {
      this.normals.pop();
    }
  }

  // Sort the plans array into their level categories 
  sortInputs(symptoms) {
    console.log("Sorting inputs: ", symptoms)
    for (let symptom of symptoms) {
      if (symptom.level == "critical") {
        this.criticals.push(symptom);
      }
      else if (symptom.level == "important") {
        this.importants.push(symptom);
      }
      else if (symptom.level == "attention") {
        this.attentions.push(symptom);
      }
      else if (symptom.level == "normal") {
        this.normals.push(symptom);
      }
    }
  }

  loadPlan() {
    this.symptomService.getPlan()
      .then(result => {
        console.log("getPlan() result: ", result)
        this.symptoms = result;

        this.emptyArrays();

        this.sortInputs(this.symptoms);

        console.log('normal: ', this.normals);
        console.log('attention: ', this.attentions);
        console.log('important: ', this.importants);
        console.log('critical: ', this.criticals);
      })
  }

  // Create a modal to add a new symptom input
  addInput() {
    this.modalController.create({
      component: SymptomsModalPage
    }).then(modal => {
      modal.present();

      // Get the data passed when the modal is dismissed 
      modal.onWillDismiss().then(data => {
        if (data.data && data.data['reload']) {
          console.log("Reload page");
          this.loadPlan();
        }
      })
    })
  }
}
