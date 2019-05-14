import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SymptomsModalPage } from '../symptoms-modal/symptoms-modal.page';
import { SymptomsService } from '../../services/symptoms.service';
import { Platform } from '@ionic/angular';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-important',
  templateUrl: './important.page.html',
  styleUrls: ['./important.page.scss'],
})
export class ImportantPage implements OnInit {

  symptoms = [];
  importants = [];
  normalPath: string;

  constructor(private platform: Platform, private modalController: ModalController, private symptomService: SymptomsService,
    private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event instanceof NavigationEnd && event.url) {
        this.normalPath = event.url + '/normal';
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
    this.importants.length = 0;
  }

  sortInputs(symptoms) {
    for (let symptom of symptoms) {
      if (symptom.level == "important") {
        this.importants.push(symptom);
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
      componentProps: { symptoms: this.symptoms, level: "important", importants: this.importants }
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
      componentProps: { symptoms: this.symptoms, id: id, importants: this.importants }
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
