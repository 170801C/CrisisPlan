import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const PLANS_KEY = "myPlans";
const SYMPTOMS_KEY = "mySymptoms"

@Injectable({
  providedIn: 'root'
})
export class SymptomsService {

  constructor(private storage: Storage) { }

  addSymptom(mySymptom) {
    return this.storage.get(SYMPTOMS_KEY).then(symptoms => {
      if (!symptoms) {
        return this.storage.set(SYMPTOMS_KEY, mySymptom);
      }
      else {
        symptoms.push(mySymptom);
        return this.storage.set(SYMPTOMS_KEY, symptoms);
      }
    })
  }

  addPlans(myPlan) {
    // Ionic storage uses, in this case, SQLite.
    return this.storage.set(PLANS_KEY, myPlan);

    // return this.storage.get(PLANS_KEY)
    //   .then(result => {
    //     // If there is no value for this key, create a new plans array with the new myPlans inserted 
    //     if (!result) {
    //       console.log("No result in storage: ")
    //       return this.storage.set(PLANS_KEY, myPlan);
    //     }
    //     else {
    //       // Push the new myPlans into the existing plans array
    //       // result.push(myPlan);
    //       // return this.storage.set(PLANS_KEY, result);
    //       console.log("Result in storage before setting: ", result)
    //       return this.storage.set(PLANS_KEY, myPlan);
    //     }
    //   })
  }

  getAllPlans() {
    // this.deletePlans();

    return this.storage.get(PLANS_KEY).then(result => {
      // If there is no plans array value in storage, return an empty array.  
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
  deletePlans() {
    // this.storage.remove(PLANS_KEY);
    this.storage.clear();
  }

  // Return Promise<LocalForage> type!
  storageReady() {
    return this.storage.ready();
  }
}