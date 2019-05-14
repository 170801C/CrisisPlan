import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SymptomsModalPage } from '../symptoms-modal/symptoms-modal.page';
import { SymptomsService } from '../../services/symptoms.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-attention',
  templateUrl: './attention.page.html',
  styleUrls: ['./attention.page.scss'],
})
export class AttentionPage implements OnInit {

  symptoms = [];
  attentions = [];

  constructor(private platform: Platform, private modalController: ModalController, private symptomService: SymptomsService) { }

  ngOnInit() {
    this.loadPlan();
  }
  
  ionViewWillEnter() {
    this.loadPlan();
  }

  emptyArray() {
    for (let item = 0; item < this.attentions.length; item++) {
      this.attentions.pop();
    }
  }

  sortInputs(symptoms) {
    for (let symptom of symptoms) {
      if (symptom.level == "attention") {
        this.attentions.push(symptom);
      }
    }
  }

  loadPlan() {
    this.symptomService.getPlan()
      .then(result => {
        this.symptoms = result;

        this.emptyArray();

        this.sortInputs(this.symptoms);
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
          this.loadPlan();
        }
      })
    })
  }
}
