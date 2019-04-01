import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { symptomModel } from '../../models/symptomModel'
import { SymptomsService } from '../../services/symptoms.service';
import { ModalController } from '@ionic/angular';
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
    type: null,
    level: null,
    description: null,
    action: null,
    color: null
  };

  constructor(private formBuilder: FormBuilder, private symptomService: SymptomsService, private modalController: ModalController) { }

  ngOnInit() {
    this.inputForm = this.formBuilder.group({
      id: null,
      type: [null, Validators.required, this.checkForSameType],
      level: [null, Validators.required],
      description: [null, Validators.required],
      action: [null, Validators.required],
      color: [null, Validators.required],
    })
  }

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

  // Check if input type exists. If yes, invalidate the form as user is to edit existing input instead. Param: formControlName="type" 
  checkForSameType(typeFormControl: AbstractControl) {
    console.log("typeFormControl: ", typeFormControl.value);

    this.symptomService.getPlan()
      .then((result) => {
        console.log("Symptom in iteration: ", result);

        for (let symptom in result) {
          if (result[symptom]['type'] == typeFormControl.value) {}

          // Validation passed
          return null; 
        }
      })
  }

  saveInput() {
    // Assign the form values to the symptom model object
    this.symptom.id = this.inputForm.value.id;
    this.symptom.type = this.inputForm.value.type;
    this.symptom.level = this.inputForm.value.level;
    this.symptom.description = this.inputForm.value.description;
    this.symptom.action = this.inputForm.value.action;
    this.symptom.color = this.inputForm.value.color;
    this.symptom.level = this.inputForm.value.level;

    console.log("Symptom model object: ", this.symptom);

    // Add the symptom to Ionic storage
    this.symptomService.addSymptom(this.symptom)
      .then(res => {
        // Close the modal and return data --> reload key: true value  
        this.modalController.dismiss({ reload: true });
      })
  }
}

