import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const PLAN_KEY = "myPlan";
const SYMPTOMS_KEY = "mySymptoms"

@Injectable({
  providedIn: 'root'
})
export class SymptomsService {

  // symptomsArray = [];

  constructor(private storage: Storage) { }

  addSymptom(mySymptom) {
    return this.storage.get(PLAN_KEY).then(symptoms => {
      // If no value in key, create new with mySymptom
      if (!symptoms) {
        console.log("No existing symptoms")
        return this.storage.set(PLAN_KEY, [mySymptom]);
      }
      else {
        // if there is existing value in key, push new mySymptom to symptoms array
        console.log("Existing symptoms: ", symptoms)
        console.log("mySymptom: ", mySymptom)

        // this.symptomsArray = symptomsArray.push()
        symptoms.push(mySymptom);

        return this.storage.set(PLAN_KEY, symptoms);
      }
    })
  }

  getPlan() {
    return this.storage.get(PLAN_KEY).then(result => {
      // If no value in key, return an empty array.  
      if (!result) {
        return [];
      }
      else {
        console.log("Value from storage: ", result);
        return result;
      }
    })
  }

  // Delete all value for the key
  deletePlan() {
    // this.storage.remove(PLANS_KEY);
    this.storage.clear();
  }

  // Return Promise<LocalForage> type!
  storageReady() {
    return this.storage.ready();
  }
}