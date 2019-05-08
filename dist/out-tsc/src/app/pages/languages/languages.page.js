import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { LanguagesService } from './../../services/languages.service';
var LanguagesPage = /** @class */ (function () {
    function LanguagesPage(languagesService) {
        this.languagesService = languagesService;
        this.languages = [];
        this.selectedLanguage = '';
    }
    LanguagesPage.prototype.ngOnInit = function () {
        this.languages = this.languagesService.selectLanguageValues();
        this.selectedLanguage = this.languagesService.selectedLanguage;
    };
    // ionViewWillEnter() {
    //   this.languages = this.languagesService.selectLanguageValues();
    //   this.selectedLanguage = this.languagesService.selectedLanguage;
    // }
    LanguagesPage.prototype.select = function (lng) {
        // Set and store the selected language
        this.languagesService.setLanguage(lng);
        this.selectedLanguage = this.languagesService.selectedLanguage;
    };
    LanguagesPage = tslib_1.__decorate([
        Component({
            selector: 'app-languages',
            templateUrl: './languages.page.html',
            styleUrls: ['./languages.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [LanguagesService])
    ], LanguagesPage);
    return LanguagesPage;
}());
export { LanguagesPage };
//# sourceMappingURL=languages.page.js.map