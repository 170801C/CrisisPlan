import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
var LANGUAGE_KEY = 'SELECTED_LANGUAGE';
var LanguagesService = /** @class */ (function () {
    function LanguagesService(translate, storage) {
        this.translate = translate;
        this.storage = storage;
        this.selectedLanguage = '';
    }
    LanguagesService.prototype.setInitialAppLanguage = function () {
        var _this = this;
        // Get the browser language (device/app language?)
        var language = this.translate.getBrowserLang();
        // Set the default language to fallback on when a selected language is not available
        this.translate.setDefaultLang(language);
        // Get the previously used set language from storage, and set it as the inital app language，elsefallback to the default language.
        return this.getLanguage()
            .then(function (result) {
            return _this.setLanguage(result);
        });
    };
    LanguagesService.prototype.selectLanguageValues = function () {
        return [
            // { text: 'English', value: 'en', img: 'assets/imgs/en.png' },
            { text: 'English', value: 'en' },
            { text: '中文', value: 'ch' },
            { text: 'Malay', value: 'ml' },
            { text: 'தமிழ்', value: 'tam' },
        ];
    };
    LanguagesService.prototype.getLanguage = function () {
        return this.storage.get(LANGUAGE_KEY);
    };
    LanguagesService.prototype.setLanguage = function (lng) {
        // Set currentLang property to use the previously used langauge from storage or a user-selected language 
        this.translate.use(lng);
        this.selectedLanguage = lng;
        return this.storage.set(LANGUAGE_KEY, lng);
    };
    LanguagesService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [TranslateService, Storage])
    ], LanguagesService);
    return LanguagesService;
}());
export { LanguagesService };
//# sourceMappingURL=languages.service.js.map