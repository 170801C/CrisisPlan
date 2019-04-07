import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const PLAN_KEY = "myPlan";

@Injectable({
  providedIn: 'root'
})
export class SymptomsService {

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

        symptoms.push(mySymptom);

        return this.storage.set(PLAN_KEY, symptoms);
      }
    })
  }

  getSymptomById(id) {
    return this.storage.get(PLAN_KEY).then(result => {
      return result.filter(item => item.id == id)
    })
  }

  updateSymptom(mySymptom) {
    return this.storage.get(PLAN_KEY).then(result => {
      console.log("update mySymptom id: ", mySymptom)
      console.log("Updating.....")

      let updatedPlan = [];

      for (let symptom of result) {
        if (symptom.id == mySymptom.id) {
          console.log("Equals here")
          updatedPlan.push(mySymptom);
        }
        else {
          updatedPlan.push(symptom);
        }
      }

      return this.storage.set(PLAN_KEY, updatedPlan);
    })
  }

  deleteSymptomById(id) {
    return this.storage.get(PLAN_KEY)
      .then(result => {
        let toKeep = [];
        let toDelete = null;

        for (let symptom of result) {
          if (symptom.id != id) {
            toKeep.push(symptom);
          }
          else {
            toDelete = symptom;
          }
        }

        return this.storage.set(PLAN_KEY, toKeep);
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
    this.storage.remove(PLAN_KEY);
  }

  // Delete everything in storage
  deleteAll() {
    this.storage.clear();
  }

  // Return Promise<LocalForage> type!
  storageReady() {
    return this.storage.ready();
  }
}