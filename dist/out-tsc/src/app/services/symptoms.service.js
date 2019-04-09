import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
var PLAN_KEY = "myPlan";
var SymptomsService = /** @class */ (function () {
    function SymptomsService(storage) {
        this.storage = storage;
    }
    SymptomsService.prototype.addSymptom = function (mySymptom) {
        var _this = this;
        return this.storage.get(PLAN_KEY).then(function (symptoms) {
            // If no value in key, create new with mySymptom
            if (!symptoms) {
                console.log("No existing symptoms");
                return _this.storage.set(PLAN_KEY, [mySymptom]);
            }
            else {
                // if there is existing value in key, push new mySymptom to symptoms array
                console.log("Existing symptoms: ", symptoms);
                console.log("mySymptom: ", mySymptom);
                symptoms.push(mySymptom);
                return _this.storage.set(PLAN_KEY, symptoms);
            }
        });
    };
    SymptomsService.prototype.getSymptomById = function (id) {
        return this.storage.get(PLAN_KEY).then(function (result) {
            return result.filter(function (item) { return item.id == id; });
        });
    };
    SymptomsService.prototype.updateSymptom = function (mySymptom) {
        var _this = this;
        return this.storage.get(PLAN_KEY).then(function (result) {
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
            return _this.storage.set(PLAN_KEY, updatedPlan);
        });
    };
    SymptomsService.prototype.deleteSymptomById = function (id) {
        var _this = this;
        return this.storage.get(PLAN_KEY)
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
            return _this.storage.set(PLAN_KEY, toKeep);
        });
    };
    SymptomsService.prototype.getPlan = function () {
        return this.storage.get(PLAN_KEY).then(function (result) {
            // If no value in key, return an empty array.  
            if (!result) {
                return [];
            }
            else {
                console.log("Value from storage: ", result);
                return result;
            }
        });
    };
    // Delete all value for the key
    SymptomsService.prototype.deletePlan = function () {
        this.storage.remove(PLAN_KEY);
    };
    // Delete everything in storage
    SymptomsService.prototype.deleteAll = function () {
        this.storage.clear();
    };
    // Return Promise<LocalForage> type!
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