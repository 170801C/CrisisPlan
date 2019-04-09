import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SymptomsPage } from './symptoms.page';
var routes = [
    {
        path: '',
        component: SymptomsPage
    }
];
var SymptomsPageModule = /** @class */ (function () {
    function SymptomsPageModule() {
    }
    SymptomsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                ReactiveFormsModule
            ],
            declarations: [SymptomsPage]
        })
    ], SymptomsPageModule);
    return SymptomsPageModule;
}());
export { SymptomsPageModule };
//# sourceMappingURL=symptoms.module.js.map