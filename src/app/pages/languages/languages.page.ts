import { Component, OnInit } from '@angular/core';
import { LanguagesService } from './../../services/languages.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.page.html',
  styleUrls: ['./languages.page.scss'],
})
export class LanguagesPage implements OnInit {

  languages = [];
  selectedLanguage = '';

  constructor(private languagesService: LanguagesService) { }

  ngOnInit() {
    this.languages = this.languagesService.selectLanguageValues();

    this.selectedLanguage = this.languagesService.selectedLanguage;
  }

  save() {
    // Set and store the selected language
    this.languagesService.setLanguage(this.selectedLanguage);

    // this.selectedLanguage = this.languagesService.selectedLanguage;
  }

  select(lng) {
    this.selectedLanguage = lng;
  }
}
