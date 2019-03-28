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
  criticals = [];
  importants = [];
  attentions = [];
  normals = [];

  constructor(private platform: Platform, private symptomService: SymptomsService) { }

  ngOnInit() {
    // When the platform is ready, load all the plans from storage
    this.platform.ready()
      .then(() => {
        this.criticals.length = 0;
        this.importants.length = 0;
        this.attentions.length = 0;
        this.normals.length = 0;
        console.log("on change? criticals arr: ", this.criticals);
        this.loadPlans();
      })
  }

  ionViewWillEnter() {
    // Empty the arrays
    this.criticals.length = 0;
    this.importants.length = 0;
    this.attentions.length = 0;
    this.normals.length = 0;
    console.log("ioionViewWillEnter. Check criticals array: ", this.criticals);

    // Get the plans array, sort them, to be displayed
    this.loadPlans();
  }

  // Try another lifecycle hook to get latest data from storage after submitting form
  ionViewDidEnter() {
  }

  // Sort the plans array into their level categories 
  sortInputs(plans) {
    for (let plan of plans) {
      for (let input of plan) {
        if (input.level == 3) {
          this.criticals.push(input);
        }
        else if (input.level == 2) {
          this.importants.push(input);
        }
        else if (input.level == 1) {
          this.attentions.push(input);
        }
        else if (input.level == 0) {
          this.normals.push(input);
        }
      }
    }
  }

  loadPlans() {
    this.symptomService.getAllPlans()
      .then(result => {
        this.plans = result;
        this.sortInputs(this.plans);
        console.log('normal: ', this.normals);
        console.log('attention: ', this.attentions);
        console.log('important: ', this.importants);
        console.log('critical: ', this.criticals);
      })
  }
}
