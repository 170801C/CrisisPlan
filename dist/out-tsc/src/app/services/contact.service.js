import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
var CONTACT_KEY = "myContact";
var ContactService = /** @class */ (function () {
    function ContactService(storage) {
        this.storage = storage;
    }
    ContactService.prototype.addContact = function (myContact) {
        var _this = this;
        return this.storage.get(CONTACT_KEY).then(function (contact) {
            // If no value in key, create new with myContact
            if (!contact) {
                console.log("No existing contact, add contact");
                return _this.storage.set(CONTACT_KEY, myContact);
            }
            else {
                // if there is existing value in key, push new myContact to contact array
                console.log("Existing contact: ", contact);
                console.log("Replacing contact with: ", myContact);
                return _this.storage.set(CONTACT_KEY, myContact);
            }
        });
    };
    ContactService.prototype.getContact = function () {
        return this.storage.get(CONTACT_KEY).then(function (result) {
            // If no value in key, return an empty array.  
            if (!result) {
                return [];
            }
            else {
                console.log("Contact storage: ", result);
                return result;
            }
        });
    };
    // Delete all value for the key
    ContactService.prototype.deleteContact = function () {
        this.storage.remove(CONTACT_KEY);
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