import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const CONTACT_KEY = "myContact";
const TEMP_CONTACT_KEY = "myTempContact";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private storage: Storage) { }

  addTempContact(myContact) {
    return this.storage.get(TEMP_CONTACT_KEY).then(result => {
      // If no value in key, create new with myContact
      console.log("Existing temp contact: ", result)
      console.log("Replacing temp contact with: ", myContact)

      return this.storage.set(TEMP_CONTACT_KEY, myContact);
    })
  }

  getTempContact() {
    return this.storage.get(TEMP_CONTACT_KEY).then(result => {
      // If no value in key, return an empty array.  
      if (!result) {
        return {};
      }
      else {
        console.log("Temp Contact storage: ", result);
        return result;
      }
    })
  }

  getContact() {
    return this.storage.get(CONTACT_KEY).then(result => {
      // If no value in key, return an empty array.  
      if (!result) {
        return {};
      }
      else {
        console.log("Contact storage: ", result);
        return result;
      }
    })
  }

  // Set temp contact to contact 
  setTempContact() {
    return this.storage.get(TEMP_CONTACT_KEY).then(tempResult => {
      return this.storage.set(CONTACT_KEY, tempResult);
    })
  }

  // Delete value in TEMP_CONTACT_KEY
  deleteTempContact() {
    this.storage.remove(TEMP_CONTACT_KEY);
  }

  // Return Promise<LocalForage> type!
  storageReady() {
    return this.storage.ready();
  }
}
