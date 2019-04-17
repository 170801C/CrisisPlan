import { Component, OnInit } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { SymptomsService } from '../../services/symptoms.service';
import { ModalController } from '@ionic/angular';
import { SymptomsModalPage } from '../symptoms-modal/symptoms-modal.page';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss'],
})
export class PlanPage implements OnInit {

  // Declare an array to hold all plans from storage, to be used in template
  contact = {};
  symptoms = [];
  criticals = [];
  importants = [];
  attentions = [];
  normals = [];
  planExists: boolean;
  contactExists: boolean;
  customBackActionSubscription: Subscription;
  lastBackPressTime = 0;
  timePeriodToExitApp = 2000;

  constructor(private platform: Platform, private symptomService: SymptomsService, private modalController: ModalController,
    private router: Router, private contactService: ContactService, private alertController: AlertController, public toastController: ToastController) { }

  ngOnInit() {
    // this.symptomService.deleteAll();

    this.platform.ready()
      .then(() => {
        // Display a toast to inform user to press the back button again to exit the app
        this.customBackActionSubscription = this.platform.backButton.subscribe(() => {
          if (new Date().getTime() - this.lastBackPressTime < this.timePeriodToExitApp) {
            // this.platform.exitApp(); 
            navigator['app'].exitApp();

          } else {
            // Display toast
            this.exitAppToast()
            this.lastBackPressTime = new Date().getTime();
          }
        });

        this.loadContact();
        this.loadPlan();
      })
  }

  ionViewWillEnter() {
    this.customBackActionSubscription = this.platform.backButton.subscribe(() => {
      if (new Date().getTime() - this.lastBackPressTime < this.timePeriodToExitApp) {
        // this.platform.exitApp(); 
        navigator['app'].exitApp();

      } else {
        // Show toast upon exiting app
        this.exitAppToast()
        this.lastBackPressTime = new Date().getTime();
      }
    });

    this.loadContact();
    this.loadPlan();
  }

  ionViewDidLeave() {
    if (this.customBackActionSubscription) {
      this.customBackActionSubscription.unsubscribe();
    }
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
        if ('name' in result) {
          this.contact = result;
          this.contactExists = true;
        }
        else {
          this.contactExists = false;
        }
        console.log("getContact() called: ", result)
        console.log("Whats in contact: ", this.contact)
        console.log("contact exist: ", this.contactExists)
      })
  }

  loadPlan() {
    this.symptomService.getPlan()
      .then(result => {
        this.symptoms = result;
        console.log("getPlan() result: ", result)
        console.log("this.symptoms: ", this.symptoms)

        if (this.symptoms.length > 0) {
          this.planExists = true;
        }
        else {
          this.planExists = false;
        }
        console.log("plan exist: ", this.planExists)

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

  async addNewPlanAlert() {
    const alert = await this.alertController.create({
      header: 'Add new plan',
      message: '<strong>Adding a new plan will delete the existing plan.<br><br>Proceed?</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          // Optional properties
          // cssClass: 'secondary',
          // handler: (blah) => {
          //   console.log('Confirm Cancel: blah');
          // }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Okay');
            this.symptomService.deleteAll();
            // Go to Contact page
            this.router.navigateByUrl('/tabs/plan/contact');
            // this.loadContact();
            // this.loadPlan();
          }
        }
      ]
    });

    await alert.present();
  }

  async exitAppToast() {
    const toast = await this.toastController.create({
      message: 'Press the back button again to exit the app',
      duration: 2000,
      position: 'middle',
    });
    toast.present();
  }
}

