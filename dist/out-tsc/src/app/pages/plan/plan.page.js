import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SymptomsService } from '../../services/symptoms.service';
import { ModalController } from '@ionic/angular';
import { SymptomsModalPage } from '../symptoms-modal/symptoms-modal.page';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';
var PlanPage = /** @class */ (function () {
    function PlanPage(platform, symptomService, modalController, router, contactService) {
        this.platform = platform;
        this.symptomService = symptomService;
        this.modalController = modalController;
        this.router = router;
        this.contactService = contactService;
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
        // this.symptomService.deleteAll();
        var _this = this;
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
        });
    };
    PlanPage.prototype.loadPlan = function () {
        var _this = this;
        this.symptomService.getPlan()
            .then(function (result) {
            console.log("getPlan() result: ", result);
            _this.symptoms = result;
            // Check if there is an existing plan. If yes, set planExists to true, which hides Create Plan button and shows Edit Button
            if (!(_this.symptoms == [])) {
                _this.planExists = true;
            }
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
    PlanPage.prototype.goToContact = function () {
        this.router.navigateByUrl('/contact');
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
        // Create alert to warn whether to discard plan
        // Delete storage values 
        // Go to contact page 
    };
    PlanPage = tslib_1.__decorate([
        Component({
            selector: 'app-plan',
            templateUrl: './plan.page.html',
            styleUrls: ['./plan.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Platform, SymptomsService, ModalController, Router, ContactService])
    ], PlanPage);
    return PlanPage;
}());
export { PlanPage };
//# sourceMappingURL=plan.page.js.map