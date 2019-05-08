import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SymptomsModalPage } from '../symptoms-modal/symptoms-modal.page';
import { SymptomsService } from '../../services/symptoms.service';
import { Platform } from '@ionic/angular';
var AttentionPage = /** @class */ (function () {
    function AttentionPage(platform, modalController, symptomService) {
        this.platform = platform;
        this.modalController = modalController;
        this.symptomService = symptomService;
        this.symptoms = [];
        this.attentions = [];
    }
    AttentionPage.prototype.ngOnInit = function () {
        this.loadPlan();
    };
    AttentionPage.prototype.ionViewWillEnter = function () {
        this.loadPlan();
    };
    AttentionPage.prototype.emptyArray = function () {
        for (var item = 0; item < this.attentions.length; item++) {
            this.attentions.pop();
        }
    };
    AttentionPage.prototype.sortInputs = function (symptoms) {
        console.log("Sorting inputs: ", symptoms);
        for (var _i = 0, symptoms_1 = symptoms; _i < symptoms_1.length; _i++) {
            var symptom = symptoms_1[_i];
            if (symptom.level == "attention") {
                this.attentions.push(symptom);
            }
        }
    };
    AttentionPage.prototype.loadPlan = function () {
        var _this = this;
        this.symptomService.getPlan()
            .then(function (result) {
            console.log("getPlan() result: ", result);
            _this.symptoms = result;
            _this.emptyArray();
            _this.sortInputs(_this.symptoms);
            console.log('attention array: ', _this.attentions);
        });
    };
    // Create a modal to add a new symptom input
    AttentionPage.prototype.addInput = function () {
        var _this = this;
        this.modalController.create({
            component: SymptomsModalPage,
            componentProps: { symptoms: this.symptoms }
        }).then(function (modal) {
            modal.present();
            // Get the data passed when the modal is dismissed 
            modal.onWillDismiss().then(function (data) {
                if (data.data && data.data['reload']) {
                    console.log("Reload attention page");
                    _this.loadPlan();
                }
            });
        });
    };
    AttentionPage = tslib_1.__decorate([
        Component({
            selector: 'app-attention',
            templateUrl: './attention.page.html',
            styleUrls: ['./attention.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Platform, ModalController, SymptomsService])
    ], AttentionPage);
    return AttentionPage;
}());
export { AttentionPage };
//# sourceMappingURL=attention.page.js.map