import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const CONTACT_KEY = "myContact";
const TEMP_CONTACT_KEY = "myTempContact";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private storage: Storage) { }

  actualToTemp() {
    // Always return, probably to handle promises correctly 
    return this.getContact()
      .then((result) => {
        this.storage.set(TEMP_CONTACT_KEY, result)
        return this.getContact()
      })
  }

  addTempContact(myContact) {
    return this.storage.get(TEMP_CONTACT_KEY).then(result => {
      // If no value in key, create new with myContact
      return this.storage.set(TEMP_CONTACT_KEY, myContact);
    })
  }

  getTempContact() {
    return this.storage.get(TEMP_CONTACT_KEY).then(result => {
      // If no value in key, return an empty object  
      if (!result) {
        return {};
      }
      else {
        return result;
      }
    })
  }

  getContact() {
    return this.storage.get(CONTACT_KEY).then(result => {
      // If no value in key, return an empty object
      if (!result) {
        return {};
      }
      else {
        return result;
      }
    })
  }

  // Set temp contact to actual contact 
  tempToActual() {
    return this.storage.get(TEMP_CONTACT_KEY).then(tempResult => {
      return this.storage.set(CONTACT_KEY, tempResult);
    })
  }

  // Delete value in TEMP_CONTACT_KEY
  deleteTempContact() {
    return this.storage.remove(TEMP_CONTACT_KEY);
  }

  deleteContact() {
    return this.storage.remove(CONTACT_KEY);
  }

  // Return Promise<LocalForage> type!
  storageReady() {
    return this.storage.ready();
  }
}
