import { Component, OnInit } from '@angular/core';
import { contactModel } from '../../models/contactModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { Platform } from '@ionic/angular';


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
  // Convert [] to {}
  contactObject: contactModel = {
    name: null,
    number: null
  }
  criticalPath: string;
  // Back button 
  // defaultBackLink: string;
  customBackActionSubscription: Subscription;
  contactChanged = false;

  constructor(private formBuilder: FormBuilder, private contactService: ContactService, private router: Router,
    private platform: Platform) {
    // For tabs navigation 
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event instanceof NavigationEnd && event.url) {
        // Back button 
        // this.defaultBackLink = event.url.replace('/contact', '');
        this.criticalPath = event.url + '/critical';  // event.url : 'http://localhost:8100/tabs/plan/contact'
      }
    });
  }

  ngOnInit() {
    // Upon pressing back button, prompt user if changes are to be discarded. Ok: Discard changes and return to Plan page. Cancel: Stay on Contact page
    this.customBackActionSubscription = this.platform.backButton.subscribe(() => {
      // To do
    });

    this.loadContact();
  }

  // Refresh/Update the state whenever user enters this page (solves problem: going back does not refresh)
  ionViewWillEnter() {
    this.customBackActionSubscription = this.platform.backButton.subscribe(() => {
      // To do
    });

    this.loadContact();
  }

  ionViewDidLeave() {
    if (this.customBackActionSubscription) {
      this.customBackActionSubscription.unsubscribe();
    }
  }

  // Getters for form validation
  get name() { return this.contactForm.get('name'); }
  get number() { return this.contactForm.get('number'); }

  loadContact() {
    console.log("Is contact changed?: ", this.contactChanged)

    if (this.contactChanged) {
      this.contactService.getTempContact()
        .then((result) => {
          this.contact = result;
          console.log("From temp contact: ")
        })
    }
    else {
      this.contactService.getContact()
      .then((result) => {
        this.contact = result;
        console.log("From contact: ")
      })
    }
  }

  saveTempContact() {
    // contactChanged = true whenever Next button is pressed, except when key in storage is emptied 
    this.contactChanged = true;

    console.log("Saving contact: ", this.contact)
    // Convert [] to {}
    this.contactObject.name = this.contact.name
    this.contactObject.number = this.contact.number
    console.log("contactObject: ", this.contactObject)

    // Add contact inputs to temp contact 
    this.contactService.addTempContact(this.contactObject)
  }
}
