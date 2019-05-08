import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { Router, NavigationEnd } from '@angular/router';
import { Platform, AlertController } from '@ionic/angular';
import { SymptomsService } from 'src/app/services/symptoms.service';
import { GeneralService } from 'src/app/services/general.service';
var ContactPage = /** @class */ (function () {
    // contactChanged = false;
    function ContactPage(formBuilder, contactService, symptomService, router, platform, alertController, generalService) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.contactService = contactService;
        this.symptomService = symptomService;
        this.router = router;
        this.platform = platform;
        this.alertController = alertController;
        this.generalService = generalService;
        this.contact = {
            name: null,
            number: null
        };
        // To convert [] to {}
        this.contactObject = {
            name: null,
            number: null
        };
        // For tabs navigation 
        this.router.events.subscribe(function (event) {
            if (event && event instanceof NavigationEnd && event.url) {
                // Visible back button 
                // this.defaultBackLink = event.url.replace('/contact', '');
                _this.criticalPath = event.url + '/critical'; // event.url : 'http://localhost:8100/tabs/plan/contact'
            }
        });
    }
    ContactPage.prototype.ngOnInit = function () {
        // // Upon pressing back button, prompt user if changes are to be discarded. Ok: Discard changes and return to Plan page. Cancel: Stay on Contact page
        // this.customBackActionSubscription = this.platform.backButton.subscribe(() => {
        //   console.log("Discard changes alert")
        //   this.discardTempAlert();
        //   // Will it auto return to Plan page?
        // });
        this.loadTempContact();
    };
    // Refresh/Update the state whenever user enters this page (solves problem: going back does not refresh)
    ContactPage.prototype.ionViewWillEnter = function () {
        // this.customBackActionSubscription = this.platform.backButton.subscribe(() => {
        //   console.log("Discard changes alert")
        //   this.discardTempAlert();
        // });
        this.loadTempContact();
    };
    // ionViewWillLeave() {
    //   if (this.customBackActionSubscription) {
    //     console.log("customBackActionSubscription2 unsubscribe")
    //     this.customBackActionSubscription.unsubscribe();
    //   }
    // }
    // Getters for form validation
    // get name() { return this.contactForm.get('name'); }
    // get number() { return this.contactForm.get('number'); }
    ContactPage.prototype.loadTempContact = function () {
        var _this = this;
        this.contactService.getTempContact()
            .then(function (result) {
            _this.contact = result;
            console.log("From temp contact: ", _this.contact);
        });
    };
    // loadContact() {
    //   console.log("Is contact changed?: ", this.contactChanged)
    //   // If contact has changed (Next button pressed), get contact from temp. Else, get from actual. 
    //   if (this.contactChanged) {
    //     this.contactService.getTempContact()
    //       .then((result) => {
    //         this.contact = result;
    //         console.log("From temp contact: ")
    //       })
    //   }
    //   else {
    //     this.contactService.getContact()
    //       .then((result) => {
    //         this.contact = result;
    //         console.log("From contact: ")
    //       })
    //   }
    // }
    ContactPage.prototype.saveTempContact = function () {
        // contactChanged = true whenever Next button is pressed
        // this.contactChanged = true;
        console.log("Saving temp contact: ", this.contact);
        // Convert [] to {}
        this.contactObject.name = this.contact.name;
        this.contactObject.number = this.contact.number;
        console.log("contactObject: ", this.contactObject);
        // Add contact inputs to temp contact 
        this.contactService.addTempContact(this.contactObject);
    };
    ContactPage.prototype.discardTempAlert = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Add new plan',
                            message: '<strong>Discard current changes?</strong>',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                }, {
                                    text: 'Ok',
                                    handler: function () {
                                        console.log('Confirm Okay');
                                        // Delete temp contact
                                        _this.contactService.deleteTempContact();
                                        // Delete temp plan
                                        _this.symptomService.deleteTempPlan();
                                        // Go to Plan page
                                        // this.router.navigateByUrl('/tabs/plan/contact');
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ContactPage = tslib_1.__decorate([
        Component({
            selector: 'app-contact',
            templateUrl: './contact.page.html',
            styleUrls: ['./contact.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, ContactService, SymptomsService,
            Router, Platform, AlertController, GeneralService])
    ], ContactPage);
    return ContactPage;
}());
export { ContactPage };
//# sourceMappingURL=contact.page.js.map