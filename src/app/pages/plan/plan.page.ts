import { Component, OnInit } from '@angular/core';
import { Platform, AlertController, IonRouterOutlet, NavController } from '@ionic/angular';
import { SymptomsService } from '../../services/symptoms.service';
import { ModalController } from '@ionic/angular';
import { SymptomsModalPage } from '../symptoms-modal/symptoms-modal.page';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastController } from '@ionic/angular';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss']
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
  // contactAndPlanSubscription: Subscription;
  pdfObj = null;

  constructor(private platform: Platform, private symptomService: SymptomsService, private modalController: ModalController,
    private router: Router, private contactService: ContactService, private alertController: AlertController, private toastController: ToastController,
    private file: File, private fileOpener: FileOpener, private routerOutlet: IonRouterOutlet) { }

  ngOnInit() {
    // this.symptomService.deleteAll();

    // platform.ready() is already called in app.component.ts, may omit in here 
    this.platform.ready()
      .then(() => {
        // Display a toast to inform user to press the back button again to exit the app
        // this.customBackActionSubscription = this.platform.backButton.subscribe(() => {
        //   if (new Date().getTime() - this.lastBackPressTime < this.timePeriodToExitApp) {
        //     // this.platform.exitApp(); 
        //     console.log("Exiting app")
        //     navigator['app'].exitApp();
        //   } else {
        //     // Display toast
        //     this.exitAppToast()
        //     this.lastBackPressTime = new Date().getTime();
        //   }
        // })

        // Prevent back button propagation with subscribeWithPriority()
        this.customBackActionSubscription = this.platform.backButton.subscribeWithPriority(1, () => {
          // this.navigateToPreviousPage();

          if ((this.router.url == '/tabs/plan') || (this.router.url == '/tabs') || (this.router.url == '/')) {
            if (new Date().getTime() - this.lastBackPressTime < this.timePeriodToExitApp) {
              navigator['app'].exitApp();
            }
            else {
              this.exitAppToast()
              this.lastBackPressTime = new Date().getTime();
            }
          }
          else if (this.router.url == '/tabs/plan/contact') {
            this.discardChangesAlert();
          }
          else {
            if (this.routerOutlet && this.routerOutlet.canGoBack()) {
              this.routerOutlet.pop();
            }
          }
        })

        // // Get the latest updated storage values 
        // this.contactAndPlanSubscription = this.generalService.currentMessage.subscribe(() => {
        //   this.loadContact();
        //   this.loadPlan();
        // })

        // this.loadContact().then((res) => {
        //   console.log("what is res: ", res)
        //   if (res == true) {
        //     this.contactExists = true;
        //   }
        //   else if (res == false) {
        //     this.contactExists = false;
        //   }
        // })

        // return this.contactService.getContact()
        // .then(result => {
        //   if ('name' in result) {
        //     this.contact = result;
        //     // this.contactExists = true;
        //     return true;
        //   }
        //   else {
        //     // this.contactExists = false;
        //     return false;
        //   }
  
        //   console.log("Plan page, actual contact: ", result)
        // })
        // var x = new Promise(function(resolve, reject) {

        //   this.loadContact() {

        //   }
        //   return Promise.resolve(message)
        //   setTimeout(function() {
        //     resolve('foo');
        //   }, 300);
        // });
        this.loadContact();
        this.loadPlan();
        this.getTemp();
        console.log("Plan page, contact object: ", this.contact)
      })
  }

  // public navigateToPreviousPage() {
  //   const url = this.router.url;
  //   // if (url.match("(^\/[a-zA-Z0-9\-\.]*)$")) {
  //     console.log("Route matches!!")
  //     navigator['app'].exitApp();
  //   }
  //   else {
  //     console.log("Route does not match!!")
  //     this.navController.navigateBack(url.replace(new RegExp("(\/([a-zA-Z0-9\-\.])*)$"), ""));
  //   }
  // }

  ionViewWillEnter() {
    // this.customBackActionSubscription = this.platform.backButton.subscribe(() => {
    //   if (new Date().getTime() - this.lastBackPressTime < this.timePeriodToExitApp) {
    //     // this.platform.exitApp(); 
    //     navigator['app'].exitApp();
    //   } else {
    //     // Show toast upon exiting app
    //     this.exitAppToast()
    //     this.lastBackPressTime = new Date().getTime();
    //   }
    // })

    // this.contactAndPlanSubscription = this.generalService.currentMessage.subscribe(() => {
    //   this.loadContact();
    //   this.loadPlan();
    // })

    // this.loadContact().then((res) => {
    //   console.log("what is res: ", res)
    //   if (res == true) {
    //     this.contactExists = true;
    //   }
    //   else if (res == false) {
    //     this.contactExists = false;
    //   }
    // })

    this.loadContact();
    this.loadPlan();
    this.getTemp()
    console.log("Plan page, contact object: ", this.contact)
  }

  // Unsubscribe for garbage colleciton, prevent memory leaks
  ionViewWillLeave() {
    // if (this.customBackActionSubscription) {
    //   console.log("customBackActionSubscription unsubscribe")
    //   this.customBackActionSubscription.unsubscribe();
    // }

    // if (this.contactAndPlanSubscription) {
    //   console.log("contactAndPlanSubscription unsubscribe")
    //   this.contactAndPlanSubscription.unsubscribe();
    // }
  }

  getTemp() {
    this.symptomService.getTempPlan().then((result) => {
      console.log("Plan page, temp plan: ", result)
    })
    this.contactService.getTempContact().then((result) => {
      console.log("Plan page, temp contact: ", result)
    })
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
    return this.contactService.getContact()
      .then(result => {
        if ('name' in result) {
          this.contact = result;
          this.contactExists = true;
        }
        else {
          this.contactExists = false;
        }

        console.log("Plan page, actual contact: ", result)
      })
  }

  loadPlan() {
    return this.symptomService.getPlan()
      .then(result => {
        this.symptoms = result;

        if (this.symptoms.length > 0) {
          this.planExists = true;
        }
        else {
          this.planExists = false;
        }

        this.emptyArrays();
        this.sortInputs(this.symptoms);

        console.log("Plan page, actual symptoms: ", result)
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
            // Empty storage
            this.contactService.deleteContact().then(() => {
              this.symptomService.deletePlan().then(() => {
                // Go to Contact page
                this.router.navigateByUrl('/tabs/plan/contact');
              })
            })
            // For plan and contact: Copy actual to temp
            // this.symptomService.actualToTemp();
            // this.contactService.actualToTemp();
          }
        }
      ]
    });

    await alert.present();
  }

  async discardChangesAlert() {
    const alert = await this.alertController.create({
      header: 'Discard changes',
      message: '<strong>Discard changes?</strong>',
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
            // Empty storage
            this.contactService.deleteTempContact();
            this.symptomService.deleteTempPlan();

            // Go to Plan page
            this.router.navigateByUrl('/tabs/plan');
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

  allActualToTemp() {
    // Promise chaining to ensure getting the resolved result before the next operation
    this.symptomService.actualToTemp().then(() => {
      this.contactService.actualToTemp().then(() => {
        this.router.navigateByUrl('/tabs/plan/contact');
      })
    })
  }

  doRefresh(event) {
    this.loadContact().then(() => {
      this.loadPlan().then(() => {
        event.target.complete();
      })
    })
    // setTimeout(() => {
    //   event.target.complete();
    // }, 2000);
  }

  // async createPDF() {
  createPDF() {
    let critRow1 = [];
    let critRow2 = [];
    let imptRow1 = [];
    let imptRow2 = [];
    let normRow1 = [];
    let normRow2 = [];

    let critBody = [];
    let imptBody = [];
    let normBody = [];

    let critHeader = {};
    let imptHeader = {};
    let normHeader = {};

    let type = {
      border: [true, true, false, false],
      text: null,
      style: null
    }
    let action = {
      border: [false, true, true, false],
      text: null,
      style: null
    }
    let typeDescription = {
      border: [true, false, false, true],
      text: null,
      style: null
    }
    let actionDescription = {
      border: [false, false, true, true],
      text: null,
      style: null
    }

    if (this.criticals.length != 0) {
      critHeader = { text: '\n\nCritical', bold: true };
      for (let critical of this.criticals) {

        type['text'] = critical['type'];
        action['text'] = critical['action'];
        typeDescription['text'] = critical['typeDescription'];
        actionDescription['text'] = critical['actionDescription'];

        // Manually populate the critical array. Cannot push the objects into the array as objects are copied by reference, not value/cloned. 
        critRow1[0] = {};
        critRow1[1] = {};

        critRow2[0] = {};
        critRow2[1] = {};

        for (let prop in type) {
          critRow1[0][prop] = type[prop];
        }
        for (let prop in action) {
          critRow1[1][prop] = action[prop];
        }

        for (let prop in typeDescription) {
          critRow2[0][prop] = typeDescription[prop];
        }
        for (let prop in actionDescription) {
          critRow2[1][prop] = actionDescription[prop];
        }

        critBody.push(critRow1, critRow2);

        // Empty the critType and critAction arrays for the next critical symptom
        critRow1 = [];
        critRow2 = [];
      }
    }
    else {
      // Required to insert something in the array, to accomodate pdfmake
      critBody = [[]];
    }

    if (this.importants.length != 0) {
      imptHeader = { text: '\n\nImportant', bold: true };
      for (let important of this.importants) {
        type['text'] = important['type'];
        action['text'] = important['action'];
        typeDescription['text'] = important['typeDescription'];
        actionDescription['text'] = important['actionDescription'];

        imptRow1[0] = {};
        imptRow1[1] = {};

        imptRow2[0] = {};
        imptRow2[1] = {};

        for (let prop in type) {
          imptRow1[0][prop] = type[prop];
        }
        for (let prop in action) {
          imptRow1[1][prop] = action[prop];
        }
        for (let prop in typeDescription) {
          imptRow2[0][prop] = typeDescription[prop];
        }
        for (let prop in actionDescription) {
          imptRow2[1][prop] = actionDescription[prop];
        }

        imptBody.push(imptRow1, imptRow2);

        imptRow1 = [];
        imptRow2 = [];
      }
    }
    else {
      imptBody = [[]];
    }

    if (this.normals.length != 0) {

      normHeader = { text: '\n\nNormal', bold: true };
      for (let normal of this.normals) {
        type['text'] = normal['type'];
        action['text'] = normal['action'];
        typeDescription['text'] = normal['typeDescription'];
        actionDescription['text'] = normal['actionDescription'];

        normRow1[0] = {};
        normRow1[1] = {};

        normRow2[0] = {};
        normRow2[1] = {};

        for (let prop in type) {
          normRow1[0][prop] = type[prop];
        }
        for (let prop in action) {
          normRow1[1][prop] = action[prop];
        }
        for (let prop in typeDescription) {
          normRow2[0][prop] = typeDescription[prop];
        }
        for (let prop in actionDescription) {
          normRow2[1][prop] = actionDescription[prop];
        }

        normBody.push(normRow1, normRow2);

        normRow1 = [];
        normRow2 = [];
      }
    }
    else {
      normBody = [[]];
    }

    // Create the document definition required by pdfmake,then create the pdf.
    var docDefinition = {
      content: [
        {
          alignment: 'justify',
          columns: [
            [
              { text: 'TCS Name', bold: true },
              this.contact.name
            ],
            [
              { text: 'TCS Number', bold: true },
              this.contact.number
            ]
          ]
        },
        critHeader,
        {
          style: 'tableExample',
          table: {
            widths: ['*', '*'],
            heights: ['*', '*'],
            headerRows: 0,
            body: critBody
          }
        },
        imptHeader,
        {
          style: 'tableExample',
          table: {
            widths: ['*', '*'],
            heights: ['*', '*'],
            headerRows: 0,
            body: imptBody
          }
        },
        normHeader,
        {
          style: 'tableExample',
          table: {
            widths: ['*', '*'],
            heights: ['*', '*'],
            headerRows: 0,
            body: normBody
          }
        },
      ],

      styles: {
        tableExample: {
          margin: [0, 5, 0, 15]
        }
      }
    }

    this.pdfObj = pdfMake.createPdf(docDefinition);

    if (this.platform.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        // Save the PDF to the data directory of our app
        this.file.writeFile(this.file.dataDirectory, 'CrisisPlan.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'CrisisPlan.pdf', 'application/pdf');
        })
      });
    }
    else {
      // On a browser simply use download. Remove this for production.
      this.pdfObj.download();
    }
  }
}