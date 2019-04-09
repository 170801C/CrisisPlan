import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AttentionPage } from './attention.page';
var routes = [
    {
        path: '',
        component: AttentionPage
    }
];
var AttentionPageModule = /** @class */ (function () {
    function AttentionPageModule() {
    }
    AttentionPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AttentionPage]
        })
    ], AttentionPageModule);
    return AttentionPageModule;
}());
export { AttentionPageModule };
//# sourceMappingURL=attention.module.js.map