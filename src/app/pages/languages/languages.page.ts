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

  select(lng) {
    // Set and store the selected language
    this.languagesService.setLanguage(lng);

    this.selectedLanguage = this.languagesService.selectedLanguage;
  }
}
