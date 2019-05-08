import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
var PLAN_KEY = "myPlan";
var TEMP_PLAN_KEY = "myTempPlan";
var SymptomsService = /** @class */ (function () {
    function SymptomsService(storage) {
        this.storage = storage;
    }
    SymptomsService.prototype.actualToTemp = function () {
        var _this = this;
        return this.getPlan()
            .then(function (result) {
            console.log("Result to be stored in temp: ", result);
            return _this.storage.set(TEMP_PLAN_KEY, result);
        });
    };
    SymptomsService.prototype.addTempSymptom = function (mySymptom) {
        var _this = this;
        return this.storage.get(TEMP_PLAN_KEY).then(function (symptoms) {
            // If no value in key, create new with mySymptom
            if (!symptoms) {
                console.log("No existing symptoms");
                return _this.storage.set(TEMP_PLAN_KEY, [mySymptom]);
            }
            else {
                // if there is existing value in key, push new mySymptom to symptoms array
                console.log("Existing symptoms: ", symptoms);
                console.log("mySymptom: ", mySymptom);
                symptoms.push(mySymptom);
                return _this.storage.set(TEMP_PLAN_KEY, symptoms);
            }
        });
    };
    SymptomsService.prototype.getTempSymptomById = function (id) {
        return this.storage.get(TEMP_PLAN_KEY).then(function (result) {
            return result.filter(function (item) { return item.id == id; });
        });
    };
    SymptomsService.prototype.updateTempSymptom = function (mySymptom) {
        var _this = this;
        return this.storage.get(TEMP_PLAN_KEY).then(function (result) {
            console.log("update mySymptom id: ", mySymptom);
            console.log("Updating.....");
            var updatedPlan = [];
            for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                var symptom = result_1[_i];
                if (symptom.id == mySymptom.id) {
                    console.log("Equals here");
                    updatedPlan.push(mySymptom);
                }
                else {
                    updatedPlan.push(symptom);
                }
            }
            return _this.storage.set(TEMP_PLAN_KEY, updatedPlan);
        });
    };
    SymptomsService.prototype.deleteTempSymptomById = function (id) {
        var _this = this;
        return this.storage.get(TEMP_PLAN_KEY)
            .then(function (result) {
            var toKeep = [];
            var toDelete = null;
            for (var _i = 0, result_2 = result; _i < result_2.length; _i++) {
                var symptom = result_2[_i];
                if (symptom.id != id) {
                    toKeep.push(symptom);
                }
                else {
                    toDelete = symptom;
                }
            }
            return _this.storage.set(TEMP_PLAN_KEY, toKeep);
        });
    };
    SymptomsService.prototype.getTempPlan = function () {
        return this.storage.get(TEMP_PLAN_KEY).then(function (result) {
            // If no value in key, return an empty array.  
            if (!result) {
                return [];
            }
            else {
                console.log("Value from temp plan: ", result);
                return result;
            }
        });
    };
    SymptomsService.prototype.getPlan = function () {
        return this.storage.get(PLAN_KEY).then(function (result) {
            // If no value in key, return an empty array.  
            if (!result) {
                return [];
            }
            else {
                // console.log("Value from actual plan: ", result);
                return result;
            }
        });
    };
    // Set temp contact to actual contact 
    SymptomsService.prototype.tempToActual = function () {
        var _this = this;
        return this.storage.get(TEMP_PLAN_KEY).then(function (tempResult) {
            return _this.storage.set(PLAN_KEY, tempResult);
        });
    };
    // Delete all value for the key
    SymptomsService.prototype.deleteTempPlan = function () {
        return this.storage.remove(TEMP_PLAN_KEY);
    };
    SymptomsService.prototype.deletePlan = function () {
        return this.storage.remove(PLAN_KEY);
    };
    // Delete everything in storage
    SymptomsService.prototype.deleteAll = function () {
        return this.storage.clear();
    };
    // Return Promise<LocalForage> type! 
    // Does not ensure that all (async) storage operations are done. Just that storage is ready for use.
    SymptomsService.prototype.storageReady = function () {
        return this.storage.ready();
    };
    SymptomsService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Storage])
    ], SymptomsService);
    return SymptomsService;
}());
export { SymptomsService };
//# sourceMappingURL=symptoms.service.js.map