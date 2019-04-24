import { Component, OnInit } from '@angular/core';
import { contactModel } from '../../models/contactModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { Platform, AlertController } from '@ionic/angular';
import { SymptomsService } from 'src/app/services/symptoms.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  contactForm: FormGroup;
  contact: contactModel = {
    name: null,
    number: null
  };
  // To convert [] to {}
  contactObject: contactModel = {
    name: null,
    number: null
  }
  criticalPath: string;
  // Visible back button 
  // defaultBackLink: string;
  customBackActionSubscription: Subscription;
  // contactChanged = false;

  constructor(private formBuilder: FormBuilder, private contactService: ContactService, private symptomService: SymptomsService,
    private router: Router, private platform: Platform, private alertController: AlertController) {
    // For tabs navigation 
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event instanceof NavigationEnd && event.url) {
        // Visible back button 
        // this.defaultBackLink = event.url.replace('/contact', '');
        this.criticalPath = event.url + '/critical';  // event.url : 'http://localhost:8100/tabs/plan/contact'
      }
    });
  }

  ngOnInit() {
    // Upon pressing back button, prompt user if changes are to be discarded. Ok: Discard changes and return to Plan page. Cancel: Stay on Contact page
    this.customBackActionSubscription = this.platform.backButton.subscribe(() => {
      console.log("Discard changes alert")
      this.discardTempAlert();

      // Will it auto return to Plan page?
    });

    this.loadTempContact();
  }

  // Refresh/Update the state whenever user enters this page (solves problem: going back does not refresh)
  ionViewWillEnter() {
    this.customBackActionSubscription = this.platform.backButton.subscribe(() => {
      console.log("Discard changes alert")
      this.discardTempAlert();
    });

    this.loadTempContact();
  }

  ionViewDidLeave() {
    if (this.customBackActionSubscription) {
      this.customBackActionSubscription.unsubscribe();
    }
  }

  // Getters for form validation
  get name() { return this.contactForm.get('name'); }
  get number() { return this.contactForm.get('number'); }

  loadTempContact() {
    this.contactService.getTempContact()
      .then((result) => {
        this.contact = result;
        console.log("From temp contact: ", this.contact)
      })
  }

  // loadContact() {
  //   console.log("Is contact changed?: ", this.contactChanged)

  //   // If contact has changed (Next button pressed), get contact from temp. Else, get from actual. 
  //   if (this.contactChanged) {
  //     this.contactService.getTempContact()
  //       .then((result) => {
  //         this.contact = result;
  //         console.log("From temp contact: ")
  //       })
  //   }
  //   else {
  //     this.contactService.getContact()
  //       .then((result) => {
  //         this.contact = result;
  //         console.log("From contact: ")
  //       })
  //   }
  // }

  saveTempContact() {
    // contactChanged = true whenever Next button is pressed
    // this.contactChanged = true;

    console.log("Saving temp contact: ", this.contact)
    // Convert [] to {}
    this.contactObject.name = this.contact.name
    this.contactObject.number = this.contact.number
    console.log("contactObject: ", this.contactObject)

    // Add contact inputs to temp contact 
    this.contactService.addTempContact(this.contactObject)
  }

  async discardTempAlert() {
    const alert = await this.alertController.create({
      header: 'Add new plan',
      message: '<strong>Discard current changes?</strong>',
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
            // Delete temp contact
            this.contactService.deleteTempContact();
            // Delete temp plan
            this.symptomService.deleteTempPlan();

            // Go to Plan page
            // this.router.navigateByUrl('/tabs/plan/contact');
          }
        }
      ]
    });
  }
}
