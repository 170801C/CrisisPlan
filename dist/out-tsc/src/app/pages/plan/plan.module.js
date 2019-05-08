import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PlanPage } from './plan.page';
var routes = [
    {
        path: '',
        component: PlanPage
    }
];
var PlanPageModule = /** @class */ (function () {
    function PlanPageModule() {
    }
    PlanPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [PlanPage]
        })
    ], PlanPageModule);
    return PlanPageModule;
}());
export { PlanPageModule };
//# sourceMappingURL=plan.module.js.map