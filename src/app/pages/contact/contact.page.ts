import { Component, OnInit } from '@angular/core';
import { contactModel } from '../../models/contactModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

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

  constructor(private formBuilder: FormBuilder, private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.getContact()
      .then((result) => this.contact = result)
  }

  // Refresh/Update the state whenever user enters this page (solves problem: going back does not refresh)
  ionViewWillEnter() {
    this.contactService.getContact()
      .then((result) => this.contact = result)
  }

  // Getters for form validation
  get name() { return this.contactForm.get('name'); }
  get number() { return this.contactForm.get('number'); }

  saveContact() {
    this.contactService.addContact(this.contact)
      .then(() => { this.contactService.getContact(); })  // Remove this 
  }
}
