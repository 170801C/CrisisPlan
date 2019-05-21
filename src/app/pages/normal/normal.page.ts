import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SymptomsModalPage } from '../symptoms-modal/symptoms-modal.page';
import { SymptomsService } from '../../services/symptoms.service';
import { ContactService } from '../../services/contact.service';
import { Platform } from '@ionic/angular';
import { GeneralService } from '../../services/general.service';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-normal',
  templateUrl: './normal.page.html',
  styleUrls: ['./normal.page.scss'],
})
export class NormalPage implements OnInit {

  symptoms = [];
  normals = [];
  // planChanged = false;
  defaultBackLink: string;

  constructor(private platform: Platform, private modalController: ModalController, private symptomService: SymptomsService,
    private contactService: ContactService, private generalService: GeneralService, private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event instanceof NavigationEnd && event.url) {
        // Visible back button 
        this.defaultBackLink = event.url.replace('/normal', '');
      }
    })
  }

  ngOnInit() {
    // console.log("Normal Initial plan changed? ", this.planChanged)

    // // If plan has changed, get contact from temp. Else, get from actual, set actual to temp (for array manipulation) and set this.planChanged = true  
    // if (this.planChanged) {
    //   // Load from temp
    //   this.loadTempPlan();
    // }
    // else {
    //   // Load from actual
    //   this.loadPlan();
    //   this.actualToTemp();
    // }
    this.loadTempPlan();
  }

  ionViewWillEnter() {
    // console.log("Normal Initial plan changed? ", this.planChanged)

    // if (this.planChanged) {
    //   this.loadTempPlan();
    // }
    // else {
    //   this.loadPlan();
    // }
    this.loadTempPlan();
  }

  emptyArray() {
    this.normals.length = 0;
  }

  sortInputs(symptoms) {
    for (let symptom of symptoms) {
      if (symptom.level == "normal") {
        this.normals.push(symptom);
      }
    }
  }

  // actualToTemp() {
  //   // Copy actual plan to temp plan
  //   this.symptomService.actualToTemp()

  //   this.planChanged = true;
  //   console.log("Is planChanged? ", this.planChanged)
  // }

  loadTempPlan() {
    this.symptomService.getTempPlan()
      .then(result => {
        this.symptoms = result;

        this.emptyArray();

        this.sortInputs(this.symptoms);
      })
  }

  // loadPlan() {
  //   this.symptomService.getPlan()
  //     .then(result => {
  //       console.log("actual getPlan() result: ", result)
  //       this.symptoms = result;

  //       this.emptyArray();

  //       this.sortInputs(this.symptoms);

  //       console.log('normal array: ', this.normals);
  //     })
  // }

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
          this.loadTempPlan();
        }
      })
    })
  }

  // Set temp to actual, then delete temp, for all data 
  allTempToActual() {
    this.contactService.tempToActual().then(() => {
      this.symptomService.tempToActual().then(() => {
        this.contactService.deleteTempContact().then(() => {
          this.symptomService.deleteTempPlan().then(() => {
            this.router.navigateByUrl('/tabs/plan');
          })
        })
      })
    })

    // Need not promise chain the deletion, becuase user is not allowed to press back to enter previous plan steps 
    // this.contactService.deleteTempContact();
    // this.symptomService.deleteTempPlan();

    // Send value to observable to emit to Plan page to get latest storage values 
    // this.generalService.changeMessage(true)
  }
}


