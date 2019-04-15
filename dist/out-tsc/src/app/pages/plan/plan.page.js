import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { SymptomsService } from '../../services/symptoms.service';
import { ModalController } from '@ionic/angular';
import { SymptomsModalPage } from '../symptoms-modal/symptoms-modal.page';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';
var PlanPage = /** @class */ (function () {
    function PlanPage(platform, symptomService, modalController, router, contactService, alertController) {
        this.platform = platform;
        this.symptomService = symptomService;
        this.modalController = modalController;
        this.router = router;
        this.contactService = contactService;
        this.alertController = alertController;
        // Declare an array to hold all plans from storage, to be used in template
        this.contact = null;
        this.symptoms = [];
        this.criticals = [];
        this.importants = [];
        this.attentions = [];
        this.normals = [];
        this.planExists = false;
    }
    PlanPage.prototype.ngOnInit = function () {
        var _this = this;
        this.symptomService.deleteAll();
        this.platform.ready()
            .then(function () {
            _this.loadContact();
            _this.loadPlan();
        });
    };
    PlanPage.prototype.ionViewWillEnter = function () {
        this.loadContact();
        this.loadPlan();
    };
    // Clear the colored arrays
    PlanPage.prototype.emptyArrays = function () {
        this.criticals.length = 0;
        this.importants.length = 0;
        this.attentions.length = 0;
        this.normals.length = 0;
        // for (let item = 0; item < this.criticals.length; item++) {
        //   this.criticals.pop();
        //   console.log("popppping")
        // }
        // for (let item = 0; item < this.importants.length; item++) {
        //   this.importants.pop();
        // }
        // for (let item = 0; item < this.attentions.length; item++) {
        //   this.attentions.pop();
        // }
        // for (let item = 0; item < this.normals.length; item++) {
        //   this.normals.pop();
        // }
    };
    // Sort the plans array into their level categories 
    PlanPage.prototype.sortInputs = function (symptoms) {
        console.log("Sorting inputs: ", symptoms);
        for (var _i = 0, symptoms_1 = symptoms; _i < symptoms_1.length; _i++) {
            var symptom = symptoms_1[_i];
            if (symptom.level == "critical") {
                this.criticals.push(symptom);
            }
            else if (symptom.level == "important") {
                this.importants.push(symptom);
            }
            else if (symptom.level == "attention") {
                this.attentions.push(symptom);
            }
            else if (symptom.level == "normal") {
                this.normals.push(symptom);
            }
        }
    };
    PlanPage.prototype.loadContact = function () {
        var _this = this;
        this.contactService.getContact()
            .then(function (result) {
            console.log("getContact() called: ", result);
            _this.contact = result;
            console.log("this.contact: ", _this.contact);
            console.log("typeof ", typeof _this.contact);
            var x = [1, 2];
            console.log("typeof x: ", typeof x);
            console.log("contact != null ", _this.contact != null);
        });
    };
    PlanPage.prototype.loadPlan = function () {
        var _this = this;
        this.symptomService.getPlan()
            .then(function (result) {
            console.log("getPlan() result: ", result);
            _this.symptoms = result;
            console.log("this.symptoms: ", _this.symptoms);
            // Check if there is an existing plan. If yes, set planExists to true, otherwise set to false.
            if (_this.symptoms.length > 0) {
                _this.planExists = true;
            }
            else {
                _this.planExists = false;
            }
            console.log("plan exist: ", _this.planExists);
            _this.emptyArrays();
            console.log("Whats in crit arr:", _this.criticals);
            _this.sortInputs(_this.symptoms);
            console.log('normal: ', _this.normals);
            console.log('attention: ', _this.attentions);
            console.log('important: ', _this.importants);
            console.log('critical: ', _this.criticals);
        });
    };
    // Create a modal to add a new symptom input
    PlanPage.prototype.addInput = function () {
        var _this = this;
        this.modalController.create({
            component: SymptomsModalPage,
            componentProps: { symptoms: this.symptoms }
        }).then(function (modal) {
            modal.present();
            // Get the data passed when the modal is dismissed 
            modal.onWillDismiss().then(function (data) {
                if (data.data && data.data['reload']) {
                    console.log("Reload page");
                    _this.loadPlan();
                }
            });
        });
    };
    PlanPage.prototype.openInput = function (id) {
        var _this = this;
        this.modalController.create({
            component: SymptomsModalPage,
            componentProps: { symptoms: this.symptoms, id: id }
        }).then(function (modal) {
            modal.present();
            // Get the data passed when the modal is dismissed 
            modal.onWillDismiss().then(function (data) {
                if (data.data && data.data['reload']) {
                    console.log("Reload normal page");
                    _this.loadPlan();
                }
            });
        });
    };
    PlanPage.prototype.addNewPlan = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Add new plan',
                            message: '<strong>Adding a new plan will delete the existing plan.<br><br>Proceed?</strong>',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                }, {
                                    text: 'Ok',
                                    handler: function () {
                                        console.log('Confirm Okay');
                                        _this.symptomService.deleteAll();
                                        _this.loadContact();
                                        _this.loadPlan();
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PlanPage = tslib_1.__decorate([
        Component({
            selector: 'app-plan',
            templateUrl: './plan.page.html',
            styleUrls: ['./plan.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Platform, SymptomsService, ModalController,
            Router, ContactService, AlertController])
    ], PlanPage);
    return PlanPage;
}());
export { PlanPage };
//# sourceMappingURL=plan.page.js.map