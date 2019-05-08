import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SymptomsModalPage } from '../symptoms-modal/symptoms-modal.page';
import { SymptomsService } from '../../services/symptoms.service';
import { ContactService } from '../../services/contact.service';
import { Platform } from '@ionic/angular';
import { GeneralService } from '../../services/general.service';
import { Router } from '@angular/router';
var NormalPage = /** @class */ (function () {
    // planChanged = false;
    function NormalPage(platform, modalController, symptomService, contactService, generalService, router) {
        this.platform = platform;
        this.modalController = modalController;
        this.symptomService = symptomService;
        this.contactService = contactService;
        this.generalService = generalService;
        this.router = router;
        this.symptoms = [];
        this.normals = [];
    }
    NormalPage.prototype.ngOnInit = function () {
        // console.log("Normal Initial plan changed? ", this.planChanged)
        // // If plan has changed, get contact from temp. Else, get from actual, set actual to temp (for array manipulation) and set this.planChanged = true  
        // if (this.planChanged) {
        //   // Load from temp
        //   this.loadTempPlan();
        // }
        // else {
        //   // Load from actual
        //   this.loadPlan();
        //   this.actualToTemp();
        // }
        this.loadTempPlan();
    };
    NormalPage.prototype.ionViewWillEnter = function () {
        // console.log("Normal Initial plan changed? ", this.planChanged)
        // if (this.planChanged) {
        //   this.loadTempPlan();
        // }
        // else {
        //   this.loadPlan();
        // }
        this.loadTempPlan();
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
    // actualToTemp() {
    //   // Copy actual plan to temp plan
    //   this.symptomService.actualToTemp()
    //   this.planChanged = true;
    //   console.log("Is planChanged? ", this.planChanged)
    // }
    NormalPage.prototype.loadTempPlan = function () {
        var _this = this;
        this.symptomService.getTempPlan()
            .then(function (result) {
            console.log("temp getPlan() result: ", result);
            _this.symptoms = result;
            _this.emptyArray();
            _this.sortInputs(_this.symptoms);
            console.log('normal array: ', _this.normals);
        });
    };
    // loadPlan() {
    //   this.symptomService.getPlan()
    //     .then(result => {
    //       console.log("actual getPlan() result: ", result)
    //       this.symptoms = result;
    //       this.emptyArray();
    //       this.sortInputs(this.symptoms);
    //       console.log('normal array: ', this.normals);
    //     })
    // }
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
                    _this.loadTempPlan();
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
                    _this.loadTempPlan();
                }
            });
        });
    };
    // Set temp to actual, then delete temp, for all data 
    NormalPage.prototype.allTempToActual = function () {
        var _this = this;
        console.log("Contact: tempToActual then delete temp contact");
        this.contactService.tempToActual().then(function () {
            _this.symptomService.tempToActual().then(function () {
                _this.contactService.deleteTempContact().then(function () {
                    _this.symptomService.deleteTempPlan().then(function () {
                        _this.router.navigateByUrl('/tabs/plan');
                    });
                });
            });
        });
        // Need not promise chain the deletion, becuase user is not allowed to press back to enter previous plan steps 
        // this.contactService.deleteTempContact();
        // this.symptomService.deleteTempPlan();
        // Send value to observable to emit to Plan page to get latest storage values 
        // this.generalService.changeMessage(true)
    };
    NormalPage = tslib_1.__decorate([
        Component({
            selector: 'app-normal',
            templateUrl: './normal.page.html',
            styleUrls: ['./normal.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Platform, ModalController, SymptomsService,
            ContactService, GeneralService, Router])
    ], NormalPage);
    return NormalPage;
}());
export { NormalPage };
//# sourceMappingURL=normal.page.js.map