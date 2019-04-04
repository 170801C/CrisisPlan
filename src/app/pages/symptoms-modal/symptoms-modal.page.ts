import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { symptomModel } from '../../models/symptomModel'
import { SymptomsService } from '../../services/symptoms.service';
import { ModalController, NavParams } from '@ionic/angular';
import { controlNameBinding } from '@angular/forms/src/directives/reactive_directives/form_control_name';


@Component({
  selector: 'app-symptoms-modal',
  templateUrl: './symptoms-modal.page.html',
  styleUrls: ['./symptoms-modal.page.scss'],
})

export class SymptomsModalPage implements OnInit {

  inputForm: FormGroup;
  color_levels = {
    critical: '#FF0000',    // Red
    important: '#FFA500',   // Orange
    attention: '#FFFF00',   // Yellow
    normal: '#008000'       // Green
  };
  symptom: symptomModel = {
    id: null,
    icon: null,
    value: null,
    unit: null,
    type: null,
    level: null,
    description: null,
    action: null,
    color: null
  };
  symptomsStorage = this.navParams.get('symptoms');

  constructor(private formBuilder: FormBuilder, private symptomsService: SymptomsService, private modalController: ModalController, private navParams: NavParams) { }

  ngOnInit() {
    this.inputForm = this.formBuilder.group({
      id: [null],
      icon: [null],
      value: [null, Validators.required],
      unit: [null, Validators.required],
      type: [null, Validators.compose([Validators.required, this.checkForSameType()])],
      level: [null],
      description: [null],
      action: [null, Validators.required],
      color: [null],
    })
  }

  // Getters for form validation
  get action() { return this.inputForm.get('action'); }
  get type() { return this.inputForm.get('type'); }
  get value() { return this.inputForm.get('value'); }
  get unit() { return this.inputForm.get('unit'); }

  // Set the color property of inputForm 
  setColorAndLevel(color) {
    this.inputForm.patchValue({ color: color });

    // Set the level property of inputForm
    if (color == '#FF0000') {
      this.inputForm.patchValue({ level: 'critical' });
    }
    else if (color == '#FFA500') {
      this.inputForm.patchValue({ level: 'important' });
    }
    else if (color == '#FFFF00') {
      this.inputForm.patchValue({ level: 'attention' });
    }
    else if (color == '#008000') {
      this.inputForm.patchValue({ level: 'normal' });
    }
  }

  // Custom validation: Check if type already exist, invalidate if it exist
  checkForSameType(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      console.log("Checking...")
      for (let symptom in this.symptomsStorage) {
        console.log("symptomSyorate?: ", this.symptomsStorage[symptom]['type'])
        console.log("typeFormControl.value before: ", control.value)

        if (this.symptomsStorage[symptom]['type'] == control.value) {
          console.log("typeFormControl.value exissts: ", control.value)
          return { 'existingType': true }
        }
      }

      // Validation passed
      return null;
    }
  }

  setUnitAndIcon() {
    console.log("setUnit() called")
    console.log("setUnit() type: ", this.inputForm.value.type)
    if (this.inputForm.value.type == "bloodSugar") {
      this.inputForm.value.unit = "mmol/L";
      this.inputForm.value.icon = "thermometer";
    }
    else if (this.inputForm.value.type == "bloodPressure") {
      this.inputForm.value.unit = "mmHg";
      // this.inputForm.value.icon = "";
    }
    else if (this.inputForm.value.type == "temperature") {
      this.inputForm.value.unit = "degreeCelcius";
      // this.inputForm.value.icon = "";
    }

    console.log(this.inputForm.value.unit)
  }

  saveInput() {
    // Assign the form values to the symptom model object
    this.symptom.id = this.inputForm.value.id;
    this.symptom.value = this.inputForm.value.value;
    this.symptom.unit = this.inputForm.value.unit;
    this.symptom.type = this.inputForm.value.type;
    this.symptom.description = this.inputForm.value.description;
    this.symptom.action = this.inputForm.value.action;
    this.symptom.color = this.inputForm.value.color;
    this.symptom.level = this.inputForm.value.level;
    this.symptom.icon = this.inputForm.value.icon;

    console.log("Symptom model object: ", this.symptom);

    // Add the symptom to Ionic storage
    this.symptomsService.addSymptom(this.symptom)
      .then(res => {
        // Close the modal and return data --> reload key: true value  
        this.modalController.dismiss({ reload: true });
      })
  }
}

