import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

const LANGUAGE_KEY = 'SELECTED_LANGUAGE';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  selectedLanguage = '';

  constructor(private translate: TranslateService, private storage: Storage) { }

  setInitialAppLanguage() {
    // Get the browser language (device/app language?)
    let language = this.translate.getBrowserLang();
    // Set the default language to fallback on when a selected language is not available
    this.translate.setDefaultLang(language);

    // Get the previously used set language from storage, and set it as the inital app language，elsefallback to the default language.
    return this.getLanguage()
      .then((result) => {
        return this.setLanguage(result);
      })
  }

  selectLanguageValues() {
    return [
      // { text: 'English', value: 'en', img: 'assets/imgs/en.png' },
      { text: 'English', value: 'en' },
      { text: '中文', value: 'ch' },
      { text: 'Malay', value: 'ml' },
      { text: 'தமிழ்', value: 'tam' },
    ];
  }

  getLanguage() {
    return this.storage.get(LANGUAGE_KEY)
  }

  setLanguage(lng) {
    // Set currentLang property to use the previously used langauge from storage or a user-selected language 
    this.translate.use(lng);

    this.selectedLanguage = lng;

    return this.storage.set(LANGUAGE_KEY, lng);
  }
}