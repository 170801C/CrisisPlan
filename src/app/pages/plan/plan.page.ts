import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SymptomsService } from '../../services/symptoms.service';
import { ModalController } from '@ionic/angular';
import { SymptomsModalPage } from '../symptoms-modal/symptoms-modal.page';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss'],
})
export class PlanPage implements OnInit {

  // Declare an array to hold all plans from storage, to be used in template
  contact = null;
  symptoms = [];
  criticals = [];
  importants = [];
  attentions = [];
  normals = [];
  planExists = false;

  constructor(private platform: Platform, private symptomService: SymptomsService, private modalController: ModalController, private router: Router, private contactService: ContactService) { }

  ngOnInit() {
    // this.symptomService.deleteAll();

    this.platform.ready()
      .then(() => {
        this.loadContact();
        this.loadPlan();
      })
  }

  ionViewWillEnter() {
    this.loadContact();
    this.loadPlan();
  }

  // Clear the colored arrays
  emptyArrays() {
    this.criticals.length = 0;
    this.importants.length = 0;
    this.attentions.length = 0;
    this.normals.length = 0;
    // for (let item = 0; item < this.criticals.length; item++) {
    //   this.criticals.pop();
    //   console.log("popppping")
    // }
    // for (let item = 0; item < this.importants.length; item++) {
    //   this.importants.pop();
    // }
    // for (let item = 0; item < this.attentions.length; item++) {
    //   this.attentions.pop();
    // }
    // for (let item = 0; item < this.normals.length; item++) {
    //   this.normals.pop();
    // }
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

  loadContact() {
    this.contactService.getContact()
      .then(result => {
        console.log("getContact() called: ", result)
        this.contact = result;
      })
  }

  loadPlan() {
    this.symptomService.getPlan()
      .then(result => {
        console.log("getPlan() result: ", result)
        this.symptoms = result;

        // Check if there is an existing plan. If yes, set planExists to true, which hides Create Plan button and shows Edit Button
        if (!(this.symptoms == [])) {
          this.planExists = true;
        }

        this.emptyArrays();
        console.log("Whats in crit arr:", this.criticals);

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
      component: SymptomsModalPage,
      componentProps: { symptoms: this.symptoms }
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

  goToContact() {
    this.router.navigateByUrl('/contact')
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

  addNewPlan() {
    // Create alert to warn whether to discard plan
    // Delete storage values 
    // Go to contact page 
  }
}
