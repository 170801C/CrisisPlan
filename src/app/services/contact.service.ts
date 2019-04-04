import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const CONTACT_KEY = "myContact";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private storage: Storage) { }

  addContact(myContact) {
    return this.storage.get(CONTACT_KEY).then(contact => {
      // If no value in key, create new with myContact
      if (!contact) {
        console.log("No existing contact, add contact")
        return this.storage.set(CONTACT_KEY, myContact);
      }
      else {
        // if there is existing value in key, push new myContact to contact array
        console.log("Existing contact: ", contact)
        console.log("Replacing contact with: ", myContact)

        return this.storage.set(CONTACT_KEY, myContact);
      }
    })
  }

  getContact() {
    return this.storage.get(CONTACT_KEY).then(result => {
      // If no value in key, return an empty array.  
      if (!result) {
        return [];
      }
      else {
        console.log("Contact storage: ", result);
        return result;
      }
    })
  }

   // Delete all value for the key
   deleteContact() {
    this.storage.remove(CONTACT_KEY);
  }

  // Return Promise<LocalForage> type!
  storageReady() {
    return this.storage.ready();
  }
}