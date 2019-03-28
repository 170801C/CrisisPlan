import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const PLANS_KEY = "myPlans";

@Injectable({
  providedIn: 'root'
})
export class SymptomsService {

  constructor(private storage: Storage) { }

  addPlans(myPlan) {
    // Ionic storage uses, in this case, SQLite.
    // Get the value of the key in storage
    return this.storage.set(PLANS_KEY, [myPlan]);
    // return this.storage.get(PLANS_KEY)
    //   .then(result => {
    //     // If there is no value for this key, create a new plans array with the new myPlans inserted 
    //     if (!result) {
    //       return this.storage.set(PLANS_KEY, [myPlan]);
    //     }
    //     else {
    //       // Push the new myPlans into the existing plans array
    //       result.push(myPlan);
    //       return this.storage.set(PLANS_KEY, result);
    //     }
    //   })
  }

  getAllPlans() {
    return this.storage.get(PLANS_KEY).then(result => {
      // this.deletePlans();

      // If there is no plans array value in storage, return an empty array.  
      if (!result) {
        return [];
      }
      else {
        return result;
      }
    })
  }

  // Delete all value for the key
  deletePlans() {
    this.storage.remove(PLANS_KEY);
  }

  // Return Promise<LocalForage> type!
  storageReady() {
    return this.storage.ready();
  }
}