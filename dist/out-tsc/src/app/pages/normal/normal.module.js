import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NormalPage } from './normal.page';
var routes = [
    {
        path: '',
        component: NormalPage
    }
];
var NormalPageModule = /** @class */ (function () {
    function NormalPageModule() {
    }
    NormalPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [NormalPage]
        })
    ], NormalPageModule);
    return NormalPageModule;
}());
export { NormalPageModule };
//# sourceMappingURL=normal.module.js.map