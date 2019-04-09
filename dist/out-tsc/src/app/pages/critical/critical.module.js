import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CriticalPage } from './critical.page';
var routes = [
    {
        path: '',
        component: CriticalPage
    }
];
var CriticalPageModule = /** @class */ (function () {
    function CriticalPageModule() {
    }
    CriticalPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [CriticalPage]
        })
    ], CriticalPageModule);
    return CriticalPageModule;
}());
export { CriticalPageModule };
//# sourceMappingURL=critical.module.js.map