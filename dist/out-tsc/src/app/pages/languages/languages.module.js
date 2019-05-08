import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LanguagesPage } from './languages.page';
import { TranslateModule } from '@ngx-translate/core';
var routes = [
    {
        path: '',
        component: LanguagesPage
    }
];
var LanguagesPageModule = /** @class */ (function () {
    function LanguagesPageModule() {
    }
    LanguagesPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                TranslateModule
            ],
            declarations: [LanguagesPage]
        })
    ], LanguagesPageModule);
    return LanguagesPageModule;
}());
export { LanguagesPageModule };
//# sourceMappingURL=languages.module.js.map