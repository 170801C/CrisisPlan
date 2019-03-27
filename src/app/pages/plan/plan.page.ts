import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SymptomsService } from '../../services/symptoms.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss'],
})
export class PlanPage implements OnInit {

  // Decalre an array to hold all plans from storage, to be used in template
  plans = [];

  constructor(private platform: Platform, private symptomService: SymptomsService) { }

  ngOnInit() {
    // When the platform is ready, load all the symptoms from the persistent storage
    this.platform.ready()
      .then(() => {
        this.loadPlans();
      })
  }

  // Try another lifecycle hook to get latest data from storage after submitting form
  ionViewDidEnter() {
  }

  loadPlans() {
    this.symptomService.getAllPlans()
      .then(result => {
        this.plans = result;
      })
  }
}
