import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { SymptomsService } from '../../services/symptoms.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
var SymptomsPage = /** @class */ (function () {
    // Set up dependency injection 
    function SymptomsPage(symptomsService, router, modalController) {
        this.symptomsService = symptomsService;
        this.router = router;
        this.modalController = modalController;
        this.plan = [];
    }
    // Initialize variables 
    SymptomsPage.prototype.ngOnInit = function () {
    };
    SymptomsPage = tslib_1.__decorate([
        Component({
            selector: 'app-symptoms',
            templateUrl: './symptoms.page.html',
            styleUrls: ['./symptoms.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [SymptomsService, Router, ModalController])
    ], SymptomsPage);
    return SymptomsPage;
}());
export { SymptomsPage };
//# sourceMappingURL=symptoms.page.js.map