import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
var CONTACT_KEY = "myContact";
var TEMP_CONTACT_KEY = "myTempContact";
var ContactService = /** @class */ (function () {
    function ContactService(storage) {
        this.storage = storage;
    }
    ContactService.prototype.actualToTemp = function () {
        var _this = this;
        // Always return, probably to handle promises correctly 
        return this.getContact()
            .then(function (result) {
            console.log("Setting contact actual to temp");
            console.log("Result to be stored in temp: ", result);
            _this.storage.set(TEMP_CONTACT_KEY, result);
            return _this.getContact();
        });
    };
    ContactService.prototype.addTempContact = function (myContact) {
        var _this = this;
        return this.storage.get(TEMP_CONTACT_KEY).then(function (result) {
            // If no value in key, create new with myContact
            console.log("Existing temp contact: ", result);
            console.log("Replacing temp contact with: ", myContact);
            return _this.storage.set(TEMP_CONTACT_KEY, myContact);
        });
    };
    ContactService.prototype.getTempContact = function () {
        return this.storage.get(TEMP_CONTACT_KEY).then(function (result) {
            // If no value in key, return an empty array.  
            if (!result) {
                return {};
            }
            else {
                console.log("Temp Contact storage: ", result);
                return result;
            }
        });
    };
    ContactService.prototype.getContact = function () {
        return this.storage.get(CONTACT_KEY).then(function (result) {
            // If no value in key, return an empty array.  
            if (!result) {
                return {};
            }
            else {
                console.log("Contact storage: ", result);
                return result;
            }
        });
    };
    // Set temp contact to actual contact 
    ContactService.prototype.tempToActual = function () {
        var _this = this;
        return this.storage.get(TEMP_CONTACT_KEY).then(function (tempResult) {
            console.log("Setting contact temp to actual");
            return _this.storage.set(CONTACT_KEY, tempResult);
        });
    };
    // Delete value in TEMP_CONTACT_KEY
    ContactService.prototype.deleteTempContact = function () {
        return this.storage.remove(TEMP_CONTACT_KEY);
    };
    ContactService.prototype.deleteContact = function () {
        return this.storage.remove(CONTACT_KEY);
    };
    // Return Promise<LocalForage> type!
    ContactService.prototype.storageReady = function () {
        return this.storage.ready();
    };
    ContactService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Storage])
    ], ContactService);
    return ContactService;
}());
export { ContactService };
//# sourceMappingURL=contact.service.js.map