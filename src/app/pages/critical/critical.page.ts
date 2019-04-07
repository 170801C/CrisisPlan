import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SymptomsModalPage } from '../symptoms-modal/symptoms-modal.page';
import { SymptomsService } from '../../services/symptoms.service';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-critical',
  templateUrl: './critical.page.html',
  styleUrls: ['./critical.page.scss'],
})
export class CriticalPage implements OnInit {

  symptoms = [];
  criticals = [];

  constructor(private platform: Platform, private modalController: ModalController, private symptomService: SymptomsService, private router: Router) { }

  ngOnInit() {
    this.loadPlan();
  }

  ionViewWillEnter() {
    this.loadPlan();
  }

  emptyArray() {
    this.criticals.length = 0;
  }

  sortInputs(symptoms) {
    console.log("Sorting inputs: ", symptoms)
    for (let symptom of symptoms) {
      if (symptom.level == "critical") {
        this.criticals.push(symptom);
      }
    }
  }

  loadPlan() {
    this.symptomService.getPlan()
      .then(result => {
        console.log("getPlan() result: ", result)
        this.symptoms = result;

        this.emptyArray();
        console.log('critical array bef sort: ', this.criticals);

        this.sortInputs(this.symptoms);

        console.log('critical array: ', this.criticals);
      })
  }

  // Create a modal to add a new symptom input
  addInput() {
    this.modalController.create({
      component: SymptomsModalPage,
      componentProps: { symptoms: this.symptoms, level: "critical" }    
    }).then(modal => {  
      modal.present();

      // Get the data passed when the modal is dismissed 
      modal.onWillDismiss().then(data => {
        if (data.data && data.data['reload']) {
          console.log("Reload critical page");
          this.loadPlan();
        }
      })
    })
  }

  openInput(id) {
    this.modalController.create({
      component: SymptomsModalPage,
      componentProps: { symptoms: this.symptoms, id: id}
    }).then(modal => {
      modal.present();

      // Get the data passed when the modal is dismissed 
      modal.onWillDismiss().then(data => {
        if (data.data && data.data['reload']) {
          console.log("Reload critical page");
          this.loadPlan();
        }
      })
    })
  }
}
