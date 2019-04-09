import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppointmentsPage } from './appointments.page';
var routes = [
    {
        path: '',
        component: AppointmentsPage
    }
];
var AppointmentsPageModule = /** @class */ (function () {
    function AppointmentsPageModule() {
    }
    AppointmentsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AppointmentsPage]
        })
    ], AppointmentsPageModule);
    return AppointmentsPageModule;
}());
export { AppointmentsPageModule };
//# sourceMappingURL=appointments.module.js.map