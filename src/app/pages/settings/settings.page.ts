import { Component, OnInit } from '@angular/core';
import { LanguagesService } from './../../services/languages.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  selectedLanguage = '';

  constructor(private languagesService: LanguagesService) { }

  ngOnInit() {
    // Set the language value to text 
    if (this.languagesService.selectedLanguage == "en") {
      this.selectedLanguage = "English";
    }
    else if (this.languagesService.selectedLanguage == "ch") {
      this.selectedLanguage = "中文";
    }
    else if (this.languagesService.selectedLanguage == "ml") {
      this.selectedLanguage = "Malay";
    }
    else if (this.languagesService.selectedLanguage == "tam") {
      this.selectedLanguage = "தமிழ்";
    }
  }

  ionViewWillEnter() {
    if (this.languagesService.selectedLanguage == "en") {
      this.selectedLanguage = "English";
    }
    else if (this.languagesService.selectedLanguage == "ch") {
      this.selectedLanguage = "中文";
    }
    else if (this.languagesService.selectedLanguage == "ml") {
      this.selectedLanguage = "Malay";
    }
    else if (this.languagesService.selectedLanguage == "tam") {
      this.selectedLanguage = "தமிழ்";
    }
  }
}
