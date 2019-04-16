import { Component, OnInit } from '@angular/core';
import { contactModel } from '../../models/contactModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

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

  constructor(private formBuilder: FormBuilder, private contactService: ContactService, private router: Router) {
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
    this.contactService.getContact()
      .then((result) => this.contact = result[0])
  }

  // Refresh/Update the state whenever user enters this page (solves problem: going back does not refresh)
  ionViewWillEnter() {
    this.contactService.getContact()
      .then((result) => this.contact = result[0])
  }

  // Getters for form validation
  get name() { return this.contactForm.get('name'); }
  get number() { return this.contactForm.get('number'); }

  saveContact() {
    console.log("Saving contact: ", this.contact)
    // Convert [] to {}
    this.contactObject.name = this.contact.name
    this.contactObject.number = this.contact.number
    console.log("contactObject: ", this.contactObject)

    this.contactService.addContact(this.contactObject)
      .then(() => { this.contactService.getContact(); })  // Remove this 
  }
}
