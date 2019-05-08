import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ImportantPage } from './important.page';
var routes = [
    {
        path: '',
        component: ImportantPage
    }
];
var ImportantPageModule = /** @class */ (function () {
    function ImportantPageModule() {
    }
    ImportantPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ImportantPage]
        })
    ], ImportantPageModule);
    return ImportantPageModule;
}());
export { ImportantPageModule };
//# sourceMappingURL=important.module.js.map