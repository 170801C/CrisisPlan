import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SymptomsModalPage } from '../symptoms-modal/symptoms-modal.page';
import { SymptomsService } from '../../services/symptoms.service';
import { Platform } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';
var ImportantPage = /** @class */ (function () {
    function ImportantPage(platform, modalController, symptomService, router) {
        var _this = this;
        this.platform = platform;
        this.modalController = modalController;
        this.symptomService = symptomService;
        this.router = router;
        this.symptoms = [];
        this.importants = [];
        this.router.events.subscribe(function (event) {
            if (event && event instanceof NavigationEnd && event.url) {
                _this.normalPath = event.url + '/normal';
            }
        });
    }
    ImportantPage.prototype.ngOnInit = function () {
        this.loadTempPlan();
    };
    ImportantPage.prototype.ionViewWillEnter = function () {
        this.loadTempPlan();
    };
    ImportantPage.prototype.emptyArray = function () {
        this.importants.length = 0;
    };
    ImportantPage.prototype.sortInputs = function (symptoms) {
        console.log("Sorting inputs: ", symptoms);
        for (var _i = 0, symptoms_1 = symptoms; _i < symptoms_1.length; _i++) {
            var symptom = symptoms_1[_i];
            if (symptom.level == "important") {
                this.importants.push(symptom);
            }
        }
    };
    ImportantPage.prototype.loadTempPlan = function () {
        var _this = this;
        this.symptomService.getTempPlan()
            .then(function (result) {
            console.log("temp getPlan() result: ", result);
            _this.symptoms = result;
            _this.emptyArray();
            _this.sortInputs(_this.symptoms);
            console.log('important array: ', _this.importants);
        });
    };
    // Create a modal to add a new symptom input
    ImportantPage.prototype.addInput = function () {
        var _this = this;
        this.modalController.create({
            component: SymptomsModalPage,
            componentProps: { symptoms: this.symptoms, level: "important", importants: this.importants }
        }).then(function (modal) {
            modal.present();
            // Get the data passed when the modal is dismissed 
            modal.onWillDismiss().then(function (data) {
                if (data.data && data.data['reload']) {
                    console.log("Reload important page");
                    _this.loadTempPlan();
                }
            });
        });
    };
    ImportantPage.prototype.openInput = function (id) {
        var _this = this;
        this.modalController.create({
            component: SymptomsModalPage,
            componentProps: { symptoms: this.symptoms, id: id, importants: this.importants }
        }).then(function (modal) {
            modal.present();
            // Get the data passed when the modal is dismissed 
            modal.onWillDismiss().then(function (data) {
                if (data.data && data.data['reload']) {
                    console.log("Reload important page");
                    _this.loadTempPlan();
                }
            });
        });
    };
    ImportantPage = tslib_1.__decorate([
        Component({
            selector: 'app-important',
            templateUrl: './important.page.html',
            styleUrls: ['./important.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Platform, ModalController, SymptomsService,
            Router])
    ], ImportantPage);
    return ImportantPage;
}());
export { ImportantPage };
//# sourceMappingURL=important.page.js.map