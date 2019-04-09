import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SymptomsModalPage } from '../symptoms-modal/symptoms-modal.page';
import { SymptomsService } from '../../services/symptoms.service';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
var CriticalPage = /** @class */ (function () {
    function CriticalPage(platform, modalController, symptomService, router) {
        this.platform = platform;
        this.modalController = modalController;
        this.symptomService = symptomService;
        this.router = router;
        this.symptoms = [];
        this.criticals = [];
    }
    CriticalPage.prototype.ngOnInit = function () {
        this.loadPlan();
    };
    CriticalPage.prototype.ionViewWillEnter = function () {
        this.loadPlan();
    };
    CriticalPage.prototype.emptyArray = function () {
        this.criticals.length = 0;
    };
    CriticalPage.prototype.sortInputs = function (symptoms) {
        console.log("Sorting inputs: ", symptoms);
        for (var _i = 0, symptoms_1 = symptoms; _i < symptoms_1.length; _i++) {
            var symptom = symptoms_1[_i];
            if (symptom.level == "critical") {
                this.criticals.push(symptom);
            }
        }
    };
    CriticalPage.prototype.loadPlan = function () {
        var _this = this;
        this.symptomService.getPlan()
            .then(function (result) {
            console.log("getPlan() result: ", result);
            _this.symptoms = result;
            _this.emptyArray();
            console.log('critical array bef sort: ', _this.criticals);
            _this.sortInputs(_this.symptoms);
            console.log('critical array: ', _this.criticals);
        });
    };
    // Create a modal to add a new symptom input
    CriticalPage.prototype.addInput = function () {
        var _this = this;
        this.modalController.create({
            component: SymptomsModalPage,
            componentProps: { symptoms: this.symptoms, level: "critical", criticals: this.criticals }
        }).then(function (modal) {
            modal.present();
            // Get the data passed when the modal is dismissed 
            modal.onWillDismiss().then(function (data) {
                if (data.data && data.data['reload']) {
                    console.log("Reload critical page");
                    _this.loadPlan();
                }
            });
        });
    };
    CriticalPage.prototype.openInput = function (id) {
        var _this = this;
        this.modalController.create({
            component: SymptomsModalPage,
            componentProps: { symptoms: this.symptoms, id: id, criticals: this.criticals }
        }).then(function (modal) {
            modal.present();
            // Get the data passed when the modal is dismissed 
            modal.onWillDismiss().then(function (data) {
                if (data.data && data.data['reload']) {
                    console.log("Reload critical page");
                    _this.loadPlan();
                }
            });
        });
    };
    CriticalPage = tslib_1.__decorate([
        Component({
            selector: 'app-critical',
            templateUrl: './critical.page.html',
            styleUrls: ['./critical.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Platform, ModalController, SymptomsService, Router])
    ], CriticalPage);
    return CriticalPage;
}());
export { CriticalPage };
//# sourceMappingURL=critical.page.js.map