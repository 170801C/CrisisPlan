import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const SYMPTOMS_KEY = "mySymptoms";

@Injectable({
  providedIn: 'root'
})
export class SymptomsService {

  constructor(private storage: Storage) { }

  addSymptoms(mySymptoms) {
    // Ionic storage uses, in this case, SQLite.
    // Get the value of the key in storage
    return this.storage.get(SYMPTOMS_KEY)
      .then(result => {
        // If there is no value for this key, create a new symptoms array with the new mySymptoms inserted 
        if (!result) {
          return this.storage.set(SYMPTOMS_KEY, [mySymptoms]);
        }
        else {
          // Push the new mySymptoms into the existing symptoms array
          result.push(mySymptoms);
          return this.storage.set(SYMPTOMS_KEY, result);
        }
      })
  }

  getAllSymptoms() {
    return this.storage.get(SYMPTOMS_KEY).then(result => {
      // If there is no symptoms array value in storage, return an empty Array.  
      if (!result) {
        return [];
      }
      else {
        return result;
      }
    })
  }

  // Delete all symptoms in the SYMPTOM_KEY
  deleteSymptoms() {
    this.storage.remove(SYMPTOMS_KEY);
  }
}