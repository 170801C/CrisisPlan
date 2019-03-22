import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SymptomsService } from '../../services/symptoms.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss'],
})
export class PlanPage implements OnInit {

  // Decalre a variable to hold all symptoms from storage, to use in template
  symptoms = [];

  constructor(private platform: Platform, private symptomService: SymptomsService) { }

  ngOnInit() {
    // When the platform is ready, load all the symptoms from the persistent storage
    this.platform.ready()
      .then(() => {
        this.loadSymptoms();
      })
  }

  // Try another lifecycle hook to get latest data from storage after submitting form
  ionViewDidEnter() {

  }

  loadSymptoms() {
    this.symptomService.getAllSymptoms()
      .then(result => {
        this.symptoms = result;
      })
  }
}
