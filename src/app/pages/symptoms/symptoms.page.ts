import { Component, OnInit } from '@angular/core';
import { SymptomsService } from '../../services/symptoms.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SymptomsModalPage } from '../symptoms-modal/symptoms-modal.page';

@Component({
  selector: 'app-symptoms',
  templateUrl: './symptoms.page.html',
  styleUrls: ['./symptoms.page.scss'],
})

export class SymptomsPage implements OnInit {

  plan = [];

  // Set up dependency injection 
  constructor(private symptomsService: SymptomsService, private router: Router, private modalController: ModalController) { }

  // Initialize variables 
  ngOnInit() {
  }

  // createPlan() {
  //   // Analyze the symptoms

  //   // level 0 - Normal. Continue your regular healthy living habits
  //   // level 1 - Attention. See a clinic/family doctor
  //   // level 2 - Important. Call TCS or see a clinic/family doctor
  //   // level 3 - Critical. Call 995


  //   // Add the symptoms to storage
  //   this.savePlan()
  //     .then(() => {
  //       // Go to plan page to view the symptoms from storage listed
  //       this.router.navigate(['plan']);
  //     })
  // }

  // savePlan() {
  //   // Push all symptoms model objects into the plan array 
  //   // this.plan.push(this.temperature, this.bloodSugar);
  //   console.log("Plan before adding to storage: ", this.plan)
  //   // Add the plan array to storage
  //   return this.symptomsService.addPlans(this.plan);

  //   // Extract the FormGroup values and assign them to toSave, which is an object 
  //   // let toSave = this.symptomForm.value;
  //   // Add the symptoms to storage
  //   // return this.symptomsService.addSymptoms(toSave)
  //   // .then(_ => {
  //   //   console.log(this.symptomsService.getAllSymptoms());
  //   // });
  // }

  // // Create a modal to add symptom inputs
  // addInput() {
  //   this.modalController.create({
  //     component: SymptomsModalPage
  //   }).then(modal => {
  //     modal.present();

  //     // Get the data passed when the modal is dismissed 
  //     modal.onWillDismiss().then(data => {
  //       console.log(data)
  //     })
  //   })
  // }
}
