import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SymptomsService } from '../../services/symptoms.service';
import { Router } from '@angular/router';
import { temperatureModel } from '../../models/temperatureModel';
import { bloodSugarModel } from 'src/app/models/bloodSugarModel';

@Component({
  selector: 'app-symptoms',
  templateUrl: './symptoms.page.html',
  styleUrls: ['./symptoms.page.scss'],
})

export class SymptomsPage implements OnInit {

  // Declare variables
  symptomForm: FormGroup;
  colors = [
    '#FF0000',   // Red
    '#FFA500',   // Orange
    '#FFFF00',   // Yellow
    '#008000'    // Green
  ];
  temperature: temperatureModel = {
    id: null,
    temperature: null,
    level: null,
    description: null,
    action: null,
    color: null
  };
  bloodSugar: bloodSugarModel = {
    id: null,
    bloodSugar: null,
    level: null,
    description: null,
    action: null,
    color: null
  }
  plan = [];

  // Set up dependency injection 
  constructor(private formBuilder: FormBuilder, private symptomsService: SymptomsService, private router: Router) { }

  // Initialize variables 
  ngOnInit() {
    this.symptomForm = this.formBuilder.group({
      id: null,
      temperature: [null, Validators.required],
      temperatureLevel: null,
      temperatureDescription: null,
      temperatureAction: null,
      temperatureColor: null,
      bloodSugar: [null, Validators.required],
      bloodSugarLevel: null,
      bloodSugarDescription: null,
      bloodSugarAction: null,
      bloodSugarColor: null
    })
  }

  ngAfterViewInit(): void {
  }

  createPlan() {
    // Analyze the symptoms

    // level 0 - Normal. Continue your regular healthy living habits
    // level 1 - Attention. See a clinic/family doctor
    // level 2 - Important. Call TCS or see a clinic/family doctor
    // level 3 - Critical. Call 995

    // Temperature
    if (this.symptomForm.value.temperature > 35 && this.symptomForm.value.temperature < 38) {
      this.symptomForm.value.temperatureLevel = 0;
      this.symptomForm.value.temperatureColor = this.colors[3];
      this.symptomForm.value.temperatureDescription = "You have a normal body temperature";
      this.symptomForm.value.temperatureAction = "Maintain your regular healthy living habits"
    }
    else if (this.symptomForm.value.temperature >= 38 && this.symptomForm.value.temperature < 39 || this.symptomForm.value.temperature <= 35 && this.symptomForm.value.temperature > 34) {
      this.symptomForm.value.temperatureLevel = 1;
      this.symptomForm.value.temperatureColor = this.colors[2];
      this.symptomForm.value.temperatureDescription = "You may have: \n1. Fever and chills \n2. Hyperthermia";
      this.symptomForm.value.temperatureAction = "Visit a clinic or see a family doctor";
    }
    else if (this.symptomForm.value.temperature >= 39 && this.symptomForm.value.temperature < 41 || this.symptomForm.value.temperature <= 34 && this.symptomForm.value.temperature > 32) {
      this.symptomForm.value.temperatureLevel = 2;
      this.symptomForm.value.temperatureColor = this.colors[1];
      this.symptomForm.value.temperatureDescription = "You may have: \n1. Convulsions \n2. Severe sweating, flushed and red \n3. Fast heart rate \n4. Breathlessness \n5. Exhaustion \n6. Dizziness \n7. Vomiting \n8. Dehydration \n9. Fainting";
      this.symptomForm.value.temperatureAction = "Call TCS, visit a clinic or see a family doctor";
    }
    else if (this.symptomForm.value.temperature >= 41 || this.symptomForm.value.temperature <= 32) {
      this.symptomForm.value.temperatureLevel = 3;
      this.symptomForm.value.temperatureColor = this.colors[0];
      this.symptomForm.value.temperatureDescription = "You may have: \n1. Hallucinations \n2. Delirium \n3. Fainting \n4. Vomiting \n5. Dizziness \n6. Breathlessness \n7. Convulsions \n8. Fast heart rate \n9. Comatose \n10. Shock \n11. Brain damage \n12. Cardio-respiratory collapse";
      this.symptomForm.value.temperatureAction = "Call 995";
    }

    // Blood sugar, before meal
    if (this.symptomForm.value.bloodSugar <= 2.78 || this.symptomForm.value.bloodSugar >= 16.65) {
      this.symptomForm.value.bloodSugarLevel = 3;
      this.symptomForm.value.bloodSugarColor = this.colors[0];
      this.symptomForm.value.bloodSugarAction = "Call 995";
    }
    else if (this.symptomForm.value.bloodSugar >= 8.88 && this.symptomForm.value.bloodSugar < 16.65) {
      this.symptomForm.value.bloodSugarLevel = 2;
      this.symptomForm.value.bloodSugarColor = this.colors[1];
      this.symptomForm.value.bloodSugarAction = "Call TCS, visit a clinic or see a family doctor";
    }
    else if (this.symptomForm.value.bloodSugar > 2.78 && this.symptomForm.value.bloodSugar < 4 || this.symptomForm.value.bloodSugar >= 6.66 && this.symptomForm.value.bloodSugar < 8.88) {
      this.symptomForm.value.bloodSugarLevel = 1;
      this.symptomForm.value.bloodSugarColor = this.colors[2];
      this.symptomForm.value.bloodSugarAction = "Visit a clinic or see a family doctor";
    }
    else if (this.symptomForm.value.bloodSugar >= 4 && this.symptomForm.value.bloodSugar < 6.66) {
      this.symptomForm.value.bloodSugarLevel = 0;
      this.symptomForm.value.bloodSugarColor = this.colors[3];
      this.symptomForm.value.bloodSugarAction = "Maintain your regular healthy living habits"
    }
    console.log("Temperature: ", this.symptomForm.value.temperature);
    // Add the symptoms to storage
    this.savePlan()
      .then(_ => {
        // Go to plan page to view the symptoms from storage listed
        this.router.navigate(['plan']);
      })
  }

  savePlan() {
    // Insert temperature form values into temperature model object 
    this.temperature.temperature = this.symptomForm.value.temperature;
    this.temperature.level = this.symptomForm.value.temperatureLevel;
    this.temperature.description = this.symptomForm.value.temperatureDescription;
    this.temperature.action = this.symptomForm.value.temperatureAction;
    this.temperature.color = this.symptomForm.value.temperatureColor;

    // Insert bloodSugar form values into bloodSugar model object 
    this.bloodSugar.bloodSugar = this.symptomForm.value.bloodSugar;
    this.bloodSugar.level = this.symptomForm.value.bloodSugarLevel;
    this.bloodSugar.description = this.symptomForm.value.bloodSugarDescription;
    this.bloodSugar.action = this.symptomForm.value.bloodSugarAction;
    this.bloodSugar.color = this.symptomForm.value.bloodSugarColor;

    // Push all symptoms model objects into the plan array 
    this.plan.push(this.temperature, this.bloodSugar);
    console.log("Plan before adding to storage: ", this.plan)
    // Add the plan array to storage
    return this.symptomsService.addPlans(this.plan);

    // Extract the FormGroup values and assign them to toSave, which is an object 
    // let toSave = this.symptomForm.value;
    // Add the symptoms to storage
    // return this.symptomsService.addSymptoms(toSave)
    // .then(_ => {
    //   console.log(this.symptomsService.getAllSymptoms());
    // });
  }
}


