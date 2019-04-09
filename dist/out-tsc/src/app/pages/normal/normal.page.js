import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SymptomsModalPage } from '../symptoms-modal/symptoms-modal.page';
import { SymptomsService } from '../../services/symptoms.service';
import { Platform } from '@ionic/angular';
var NormalPage = /** @class */ (function () {
    function NormalPage(platform, modalController, symptomService) {
        this.platform = platform;
        this.modalController = modalController;
        this.symptomService = symptomService;
        this.symptoms = [];
        this.normals = [];
    }
    NormalPage.prototype.ngOnInit = function () {
        this.loadPlan();
    };
    NormalPage.prototype.ionViewWillEnter = function () {
        this.loadPlan();
    };
    NormalPage.prototype.emptyArray = function () {
        this.normals.length = 0;
    };
    NormalPage.prototype.sortInputs = function (symptoms) {
        console.log("Sorting inputs: ", symptoms);
        for (var _i = 0, symptoms_1 = symptoms; _i < symptoms_1.length; _i++) {
            var symptom = symptoms_1[_i];
            if (symptom.level == "normal") {
                this.normals.push(symptom);
            }
        }
    };
    NormalPage.prototype.loadPlan = function () {
        var _this = this;
        this.symptomService.getPlan()
            .then(function (result) {
            console.log("getPlan() result: ", result);
            _this.symptoms = result;
            _this.emptyArray();
            _this.sortInputs(_this.symptoms);
            console.log('normal array: ', _this.normals);
        });
    };
    // Create a modal to add a new symptom input
    NormalPage.prototype.addInput = function () {
        var _this = this;
        this.modalController.create({
            component: SymptomsModalPage,
            componentProps: { symptoms: this.symptoms, level: "normal", normals: this.normals }
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
    NormalPage.prototype.openInput = function (id) {
        var _this = this;
        this.modalController.create({
            component: SymptomsModalPage,
            componentProps: { symptoms: this.symptoms, id: id, normals: this.normals }
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
    NormalPage = tslib_1.__decorate([
        Component({
            selector: 'app-normal',
            templateUrl: './normal.page.html',
            styleUrls: ['./normal.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Platform, ModalController, SymptomsService])
    ], NormalPage);
    return NormalPage;
}());
export { NormalPage };
//# sourceMappingURL=normal.page.js.map