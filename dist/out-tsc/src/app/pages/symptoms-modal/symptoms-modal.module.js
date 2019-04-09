import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SymptomsModalPage } from './symptoms-modal.page';
var routes = [
    {
        path: '',
        component: SymptomsModalPage
    }
];
var SymptomsModalPageModule = /** @class */ (function () {
    function SymptomsModalPageModule() {
    }
    SymptomsModalPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                ReactiveFormsModule
            ],
            declarations: [SymptomsModalPage]
        })
    ], SymptomsModalPageModule);
    return SymptomsModalPageModule;
}());
export { SymptomsModalPageModule };
//# sourceMappingURL=symptoms-modal.module.js.map