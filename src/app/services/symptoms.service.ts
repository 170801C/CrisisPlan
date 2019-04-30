import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const PLAN_KEY = "myPlan";
const TEMP_PLAN_KEY = "myTempPlan";

@Injectable({
  providedIn: 'root'
})
export class SymptomsService {

  constructor(private storage: Storage) { }

  actualToTemp() {
    return this.getPlan()
      .then((result) => {
        console.log("Result to be stored in temp: ", result)
        return this.storage.set(TEMP_PLAN_KEY, result);
      })
  }

  addTempSymptom(mySymptom) {
    return this.storage.get(TEMP_PLAN_KEY).then(symptoms => {
      // If no value in key, create new with mySymptom
      if (!symptoms) {
        console.log("No existing symptoms")
        return this.storage.set(TEMP_PLAN_KEY, [mySymptom]);
      }
      else {
        // if there is existing value in key, push new mySymptom to symptoms array
        console.log("Existing symptoms: ", symptoms)
        console.log("mySymptom: ", mySymptom)

        symptoms.push(mySymptom);

        return this.storage.set(TEMP_PLAN_KEY, symptoms);
      }
    })
  }

  getTempSymptomById(id) {
    return this.storage.get(TEMP_PLAN_KEY).then(result => {
      return result.filter(item => item.id == id)
    })
  }

  updateTempSymptom(mySymptom) {
    return this.storage.get(TEMP_PLAN_KEY).then(result => {
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

      return this.storage.set(TEMP_PLAN_KEY, updatedPlan);
    })
  }

  deleteTempSymptomById(id) {
    return this.storage.get(TEMP_PLAN_KEY)
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

        return this.storage.set(TEMP_PLAN_KEY, toKeep);
      })
  }

  getTempPlan() {
    return this.storage.get(TEMP_PLAN_KEY).then(result => {
      // If no value in key, return an empty array.  
      if (!result) {
        return [];
      }
      else {
        console.log("Value from temp plan: ", result);
        return result;
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
        // console.log("Value from actual plan: ", result);
        return result;
      }
    })
  }

  // Set temp contact to actual contact 
  tempToActual() {
    return this.storage.get(TEMP_PLAN_KEY).then(tempResult => {
      return this.storage.set(PLAN_KEY, tempResult);
    })
  }

  // Delete all value for the key
  deleteTempPlan() {
    this.storage.remove(TEMP_PLAN_KEY);
  }

  // Delete everything in storage
  deleteAll() {
    this.storage.clear();
  }

  // Return Promise<LocalForage> type! 
  // Does not ensure that all (async) storage operations are done. Just that storage is ready for use.
  storageReady() {
    return this.storage.ready();
  }
}