import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
var ContactPage = /** @class */ (function () {
    function ContactPage(formBuilder, contactService) {
        this.formBuilder = formBuilder;
        this.contactService = contactService;
        this.contact = {
            name: null,
            number: null
        };
    }
    ContactPage.prototype.ngOnInit = function () {
        var _this = this;
        this.contactService.getContact()
            .then(function (result) { return _this.contact = result; });
    };
    // Refresh/Update the state whenever user enters this page (solves problem: going back does not refresh)
    ContactPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.contactService.getContact()
            .then(function (result) { return _this.contact = result; });
    };
    Object.defineProperty(ContactPage.prototype, "name", {
        // Getters for form validation
        get: function () { return this.contactForm.get('name'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactPage.prototype, "number", {
        get: function () { return this.contactForm.get('number'); },
        enumerable: true,
        configurable: true
    });
    ContactPage.prototype.saveContact = function () {
        var _this = this;
        this.contactService.addContact(this.contact)
            .then(function () { _this.contactService.getContact(); }); // Remove this 
    };
    ContactPage = tslib_1.__decorate([
        Component({
            selector: 'app-contact',
            templateUrl: './contact.page.html',
            styleUrls: ['./contact.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, ContactService])
    ], ContactPage);
    return ContactPage;
}());
export { ContactPage };
//# sourceMappingURL=contact.page.js.map