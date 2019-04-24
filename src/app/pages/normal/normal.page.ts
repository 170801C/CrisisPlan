import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SymptomsModalPage } from '../symptoms-modal/symptoms-modal.page';
import { SymptomsService } from '../../services/symptoms.service';
import { ContactService } from '../../services/contact.service';
import { Platform } from '@ionic/angular';
import { GeneralService } from '../../services/general.service';


@Component({
  selector: 'app-normal',
  templateUrl: './normal.page.html',
  styleUrls: ['./normal.page.scss'],
})
export class NormalPage implements OnInit {

  symptoms = [];
  normals = [];
  planChanged = false;


  // public messageEvent = new EventEmitter<boolean>();
  // @Output() messageEvent = new EventEmitter<boolean>();

  constructor(private platform: Platform, private modalController: ModalController, private symptomService: SymptomsService,
    private contactService: ContactService, private generalService: GeneralService) {
  }

  ngOnInit() {
    console.log("Initial plan changed? ", this.planChanged)

    // If plan has changed, get contact from temp. Else, get from actual, set actual to temp (for array manipulation) and set this.planChanged = true  
    if (this.planChanged) {
      // Load from temp
      this.loadTempPlan();
    }
    else {
      // Load from actual
      this.loadPlan();
      this.actualToTemp();
    }
  }

  ionViewWillEnter() {
    console.log("Initial plan changed? ", this.planChanged)

    if (this.planChanged) {
      this.loadTempPlan();
    }
    else {
      this.loadPlan();
    }
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

  actualToTemp() {
    // Copy actual plan to temp plan
    this.symptomService.actualToTemp()

    this.planChanged = true;
    console.log("Is planChanged? ", this.planChanged)
  }

  loadTempPlan() {
    this.symptomService.getTempPlan()
      .then(result => {
        console.log("temp getPlan() result: ", result)
        this.symptoms = result;

        this.emptyArray();

        this.sortInputs(this.symptoms);

        console.log('normal array: ', this.normals);
      })
  }

  loadPlan() {
    this.symptomService.getPlan()
      .then(result => {
        console.log("actual getPlan() result: ", result)
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
      componentProps: { symptoms: this.symptoms, level: "normal", normals: this.normals }
    }).then(modal => {
      modal.present();

      // Get the data passed when the modal is dismissed 
      modal.onWillDismiss().then(data => {
        if (data.data && data.data['reload']) {
          console.log("Reload normal page");
          this.loadTempPlan();
        }
      })
    })
  }

  openInput(id) {
    this.modalController.create({
      component: SymptomsModalPage,
      componentProps: { symptoms: this.symptoms, id: id, normals: this.normals }
    }).then(modal => {
      modal.present();

      // Get the data passed when the modal is dismissed 
      modal.onWillDismiss().then(data => {
        if (data.data && data.data['reload']) {
          console.log("Reload normal page");
          this.loadTempPlan();
        }
      })
    })
  }

  // Set temp to actual, then delete temp, for all data 
  async allTempToActual() {
    console.log("Contact: tempToActual then delete temp contact")
    await this.contactService.tempToActual();
    await this.contactService.deleteTempContact();

    console.log("Plan: tempToActual then delete temp plan")
    await this.symptomService.tempToActual();
    await this.symptomService.deleteTempPlan();

    // Send value to observable to emit to Plan page to get latest storage values 
    this.generalService.changeMessage(true)
  }
}


