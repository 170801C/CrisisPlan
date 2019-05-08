import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppointmentDetailPage } from './appointment-detail.page';
var routes = [
    {
        path: '',
        component: AppointmentDetailPage
    }
];
var AppointmentDetailPageModule = /** @class */ (function () {
    function AppointmentDetailPageModule() {
    }
    AppointmentDetailPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                ReactiveFormsModule
            ],
            declarations: [AppointmentDetailPage]
        })
    ], AppointmentDetailPageModule);
    return AppointmentDetailPageModule;
}());
export { AppointmentDetailPageModule };
//# sourceMappingURL=appointment-detail.module.js.map