import { Component, OnInit } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { SymptomsService } from '../../services/symptoms.service';
import { ModalController } from '@ionic/angular';
import { SymptomsModalPage } from '../symptoms-modal/symptoms-modal.page';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { GeneralService } from '../../services/general.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { stringify } from '@angular/compiler/src/util';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss'],
})
export class PlanPage implements OnInit {

  // Declare an array to hold all plans from storage, to be used in template
  contact = {
    name: null,
    number: null
  };
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
  contactAndPlanSubscription: Subscription;
  pdfObj = null;

  constructor(private platform: Platform, private symptomService: SymptomsService, private modalController: ModalController,
    private router: Router, private contactService: ContactService, private alertController: AlertController, private toastController: ToastController,
    private generalService: GeneralService, private file: File, private fileOpener: FileOpener) { }

  ngOnInit() {
    // this.symptomService.deleteAll();

    this.platform.ready()
      .then(() => {
        // Display a toast to inform user to press the back button again to exit the app
        this.customBackActionSubscription = this.platform.backButton.subscribe(() => {
          if (new Date().getTime() - this.lastBackPressTime < this.timePeriodToExitApp) {
            // this.platform.exitApp(); 
            console.log("Exiting app")
            navigator['app'].exitApp();
          } else {
            // Display toast
            this.exitAppToast()
            this.lastBackPressTime = new Date().getTime();
          }
        });

        // Get the latest updated storage values 
        this.contactAndPlanSubscription = this.generalService.currentMessage.subscribe(() => {
          this.loadContact();
          this.loadPlan();
        })
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

    this.contactAndPlanSubscription = this.generalService.currentMessage.subscribe(() => {
      this.loadContact();
      this.loadPlan();
    })
  }

  // Unsubscribe for garbage colleciton, prevent memory leaks
  ionViewWillLeave() {
    if (this.customBackActionSubscription) {
      console.log("customBackActionSubscription unsubscribe")
      this.customBackActionSubscription.unsubscribe();
    }
    if (this.contactAndPlanSubscription) {
      console.log("contactAndPlanSubscription unsubscribe")
      this.contactAndPlanSubscription.unsubscribe();
    }
  }

  // Clear the colored arrays
  emptyArrays() {
    this.criticals.length = 0;
    this.importants.length = 0;
    this.attentions.length = 0;
    this.normals.length = 0;
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

  async loadContact() {
    this.contactService.getContact()
      .then(result => {
        if ('name' in result) {
          console.log()
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

  async loadPlan() {
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
            // Empty storage
            this.symptomService.deleteAll();

            // For plan and contact: Copy actual to temp
            this.symptomService.actualToTemp();
            this.contactService.actualToTemp();

            // Go to Contact page
            this.router.navigateByUrl('/tabs/plan/contact');
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

  planActualToTemp() {
    this.symptomService.actualToTemp();
    this.contactService.actualToTemp();
  }

  async createPDF() {
    console.log("Anything in contact: ", this.contact)
    let body = [];
    let crit = [];
    let type = {
      text: null,
      style: null
    }
    let value = {
      text: null,
      style: null
    }
    let unit = {
      text: null,
      style: null
    }
    let action = {
      text: null,
      style: null
    }
    let typeDescription = {
      text: null,
      style: null
    }
    let actionDescription = {
      text: null,
      style: null
    }

    console.log("Whats in this.criticals: ", this.criticals)
    for (let critical of this.criticals) {
      console.log("Whats in 1 critical: ", critical)

      type['text'] = critical['type'];
      value['text'] = critical['value'];
      unit['text'] = critical['unit'];
      action['text'] = critical['action'];
      typeDescription['text'] = critical['typeDescription'];
      actionDescription['text'] = critical['actionDescription'];

      console.log("actiondescription:  ", actionDescription['text'])

      // Manually populate the critical array. Cannot push the objects into the array as objects are copied by reference, not value/cloned. 
      crit[0] = {};
      crit[1] = {};
      crit[2] = {};
      crit[3] = {};
      crit[4] = {};
      crit[5] = {};

      for (let prop in type) {
        crit[0][prop] = type[prop];
      }
      for (let prop in value) {
        crit[1][prop] = value[prop];
      }
      for (let prop in unit) {
        crit[2][prop] = unit[prop];
      }
      for (let prop in action) {
        crit[3][prop] = action[prop];
      }
      for (let prop in typeDescription) {
        crit[4][prop] = typeDescription[prop];
      }
      for (let prop in actionDescription) {
        crit[5][prop] = actionDescription[prop];
      }

      console.log("WHat is crit: ", crit)

      body.push(crit);

      // Empty the crit array for the next critical symptom
      crit = [];
    }
    console.log("Whats in body: ", body)

    // Create the document definition required by pdfmake,then create the pdf.
    var docDefinition = {
      content: [
        {
          alignment: 'justify',
          columns: [
            [
              'TCS Name',
              this.contact.name
            ],
            [
              'TCS Number',
              this.contact.number
            ]
          ]
        },

        {
          style: 'tableExample',
          layout: 'noBorders',
          table: {
            headerRows: 0,
            body:
              body
            // [{ text: 'Critical', style: 'tableHeader' }, ],
            // [this.criticals],
            // ['Sample value 1'],
            // ['Sample value 1']

          }
        }
      ],
      styles: {
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      }
    }

    this.pdfObj = pdfMake.createPdf(docDefinition);

    if (this.platform.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        // Save the PDF to the data directory of our app
        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        })
      });
    }
    else {
      // On a browser simply use download. Remove this.
      this.pdfObj.download();
    }
  }
}


