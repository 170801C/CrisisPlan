import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const SYMPTOMS_KEY = "mySymptoms";

@Injectable({
  providedIn: 'root'
})
export class SymptomsService {

  constructor(private storage: Storage) { }

  addSymptoms(mySymptoms) {
    console.log("Save symptoms: ", mySymptoms);
    if (!this.storage.get(SYMPTOMS_KEY)) {console.log("no value in storage")}
    else {console.log("value in storage", this.storage.get(SYMPTOMS_KEY))}

    // Ionic storage uses, in this case, SQLite.
    // Get the value of the key in storage
    return this.storage.get(SYMPTOMS_KEY)
      .then(symptoms => {
        // If there is no value for this key, create a new symptoms array with the new mySymptoms inserted 
        if (!symptoms) {
          return this.storage.set(SYMPTOMS_KEY, [mySymptoms]);
        }
        else {
          // Push the new mySymptoms into the existing symptoms array
          symptoms.push(mySymptoms);
          return this.storage.set(SYMPTOMS_KEY, mySymptoms);
        }
    })
  }

  getSymptoms() {
    return this.storage.get(SYMPTOMS_KEY);
    // console.log("Symptoms in storage: ", this.storage.get(SYMPTOMS_KEY));
  }
}