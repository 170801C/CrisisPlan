import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SymptomsModalPage } from '../symptoms-modal/symptoms-modal.page';
import { SymptomsService } from '../../services/symptoms.service';
import { Platform } from '@ionic/angular';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-critical',
  templateUrl: './critical.page.html',
  styleUrls: ['./critical.page.scss'],
})
export class CriticalPage implements OnInit {

  symptoms = [];
  criticals = [];
  importantPath: string;

  constructor(private platform: Platform, private modalController: ModalController, private symptomService: SymptomsService,
    private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event instanceof NavigationEnd && event.url) {
        this.importantPath = event.url + '/important';
      }
    });
  }

  ngOnInit() {
    this.loadTempPlan();
  }

  ionViewWillEnter() {
    this.loadTempPlan();
  }

  emptyArray() {
    this.criticals.length = 0;
  }

  sortInputs(symptoms) {
    for (let symptom of symptoms) {
      if (symptom.level == "critical") {
        this.criticals.push(symptom);
      }
    }
  }

  loadTempPlan() {
    this.symptomService.getTempPlan()
      .then(result => {
        this.symptoms = result;

        this.emptyArray();

        this.sortInputs(this.symptoms);
      })
  }

  // Create a modal to add a new symptom input
  addInput() {
    this.modalController.create({
      component: SymptomsModalPage,
      componentProps: { symptoms: this.symptoms, level: "critical", criticals: this.criticals }
    }).then(modal => {
      modal.present();

      // Get the data passed when the modal is dismissed 
      modal.onWillDismiss().then(data => {
        if (data.data && data.data['reload']) {
          this.loadTempPlan();
        }
      })
    })
  }

  openInput(id) {
    this.modalController.create({
      component: SymptomsModalPage,
      componentProps: { symptoms: this.symptoms, id: id, criticals: this.criticals }
    }).then(modal => {
      modal.present();

      // Get the data passed when the modal is dismissed 
      modal.onWillDismiss().then(data => {
        if (data.data && data.data['reload']) {
          this.loadTempPlan();
        }
      })
    })
  }
}
