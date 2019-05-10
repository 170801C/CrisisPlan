import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { symptomModel } from '../../models/symptomModel'
import { SymptomsService } from '../../services/symptoms.service';
import { ModalController, NavParams } from '@ionic/angular';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-symptoms-modal',
  templateUrl: './symptoms-modal.page.html',
  styleUrls: ['./symptoms-modal.page.scss'],
  animations: [
    trigger('showHide', [
      state('show', style({
        display: 'block'
      })),
      state('hide', style({
        display: 'none'
      })),
    ])
  ]
})

export class SymptomsModalPage implements OnInit {

  @ViewChild('typeInput') typeInput: ElementRef;

  inputForm: FormGroup;
  symptom: symptomModel = {
    id: null,
    icon: null,
    // value: null,
    // unit: null,
    type: null,
    typeDescription: null,
    level: null,
    actionDescription: null,
    action: null,
    color: null
  };
  symptomsStorage = this.navParams.get('symptoms');
  // Get existing input id, if tapped
  id = this.navParams.get('id');
  level = this.navParams.get('level');
  criticals = this.navParams.get('criticals');
  importants = this.navParams.get('importants');
  normals = this.navParams.get('normals');
  isVisible = false;
  selectedTypeInput = '';
  defaultTypes = ['Blood pressure', 'Temperature', 'Blood Sugar'];

  constructor(private formBuilder: FormBuilder, private symptomsService: SymptomsService, private modalController: ModalController,
    private navParams: NavParams) { }

  ngOnInit() {
    console.log("Any id here: ", this.id)

    this.inputForm = this.formBuilder.group({
      id: Date.now(),
      icon: [null],
      // value: [null, Validators.compose([Validators.required, this.checkForNaN()])],
      // unit: [null, Validators.required],
      type: [null, Validators.compose([Validators.required, this.checkForSameType()])],
      typeDescription: [null],
      level: [null],
      actionDescription: [null],
      action: [null, Validators.required],
      color: [null]
    })

    // For new input: Set level and color, based on level page 
    console.log("What is the level: ", this.level)
    if (this.level == "critical") {
      this.inputForm.get('level').setValue("critical");
      this.inputForm.get('color').setValue("#FF0000");
    }
    else if (this.level == "important") {
      this.inputForm.get('level').setValue("important");
      this.inputForm.get('color').setValue("#FFA500");
    }
    else if (this.level == "attention") {
      this.inputForm.get('level').setValue("attention");
      this.inputForm.get('color').setValue("#FFFF00");
    }
    else if (this.level == "normal") {
      this.inputForm.get('level').setValue("normal");
      this.inputForm.get('color').setValue("#008000");
    }

    // If existing input is tapped, retrieve its form values by id, to be displayed in modal for editing/deletion.
    if (this.id != null) {

      console.log("Symptom id exists: ", this.id)

      this.symptomsService.getTempSymptomById(this.id)
        .then((symptom) => {
          console.log("Symptom get by id: ", symptom[0])

          // this.inputForm.get('action').reset()

          this.inputForm.get('id').setValue(symptom[0].id);
          this.inputForm.get('type').setValue(symptom[0].type);
          // this.inputForm.get('value').setValue(symptom[0].value);
          // this.inputForm.get('unit').setValue(symptom[0].unit);
          this.inputForm.get('actionDescription').setValue(symptom[0].actionDescription);
          this.inputForm.get('typeDescription').setValue(symptom[0].typeDescription);
          this.inputForm.get('action').setValue(symptom[0].action);
          this.inputForm.get('color').setValue(symptom[0].color);
          this.inputForm.get('level').setValue(symptom[0].level);
          this.inputForm.get('icon').setValue(symptom[0].icon);

          console.log("Whats in id: ", this.inputForm.value.id)

          // console.log("Removing validators")
          // this.inputForm.get('type').clearValidators();
          // console.log("setting validators")
          // this.inputForm.get('type').setValidators([Validators.required, this.checkForSameType()]);
          // this.inputForm.get('type').updateValueAndValidity();
        })

      // console.log("Resetting validators")
      // this.inputForm.get('type').clearValidators();
      // this.inputForm.get('type').setValidators([Validators.required, this.checkForSameType()]);
      // this.inputForm.get('type').updateValueAndValidity();
    }

    // On changes to Type form field, call setUnitAndIcon()
    // this.inputForm.get('type').valueChanges.subscribe(val => {
    //   this.setUnitAndIcon(val)
    // })
  }

  ngAfterViewChecked() {
    console.log('anything here: ', this.selectedTypeInput)
    this.typeInput.nativeElement.value = this.selectedTypeInput;
  }

  // Getters for form validation
  get action() { return this.inputForm.get('action'); }
  get type() { return this.inputForm.get('type'); }
  // get value() { return this.inputForm.get('value'); }
  // get unit() { return this.inputForm.get('unit'); }

  // Custom validation: For new input: If type exists, invalidate. For existing input: if type is not the same as the previous value, invalidate.
  checkForSameType(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      console.log("anything in id? ", this.id)
      console.log("Checking...")

      // New input
      if (this.id == null) {
        // If there are existing inputs in Criticals page, check with them, else pass validation.
        if (this.criticals != null) {
          for (let symptom in this.criticals) {
            if (this.criticals[symptom]['type'] == control.value) {
              console.log("typeFormControl.value exissts on this page: ", control.value)
              return { 'sameType': true }
            }
          }
        }
        else if (this.importants != null) {
          for (let symptom in this.importants) {
            if (this.importants[symptom]['type'] == control.value) {
              console.log("typeFormControl.value exissts on this page: ", control.value)
              return { 'sameType': true }
            }
          }
        }
        else if (this.normals != null) {
          for (let symptom in this.normals) {
            if (this.normals[symptom]['type'] == control.value) {
              console.log("typeFormControl.value exissts on this page: ", control.value)
              return { 'sameType': true }
            }
          }
        }

        // Validation passed
        return null;
      }

      // Existing input
      else {
        if (this.criticals != null) {
          console.log("Whats in criticals: ", this.criticals)
          for (let symptom in this.criticals) {
            // Iterate through criticals array. If both types are the same, but not the same item, invalidate.
            if ((this.criticals[symptom]['type'] == control.value) && (this.criticals[symptom]['id'] != this.id)) {
              console.log("same type but diff item")
              console.log("type: ", this.criticals[symptom]['type'])
              console.log("control type: ", control.value)
              console.log("id: ", this.criticals[symptom]['id'])
              console.log("control id: ", this.id)
              return { 'sameType': true };
            }
          }
        }
        else if (this.importants != null) {
          for (let symptom in this.importants) {
            if ((this.importants[symptom]['type'] == control.value) && (this.importants[symptom]['id'] != this.id)) {
              return { 'sameType': true };
            }
          }
        }
        else if (this.normals != null) {
          for (let symptom in this.normals) {
            if ((this.normals[symptom]['type'] == control.value) && (this.normals[symptom]['id'] != this.id)) {
              return { 'sameType': true };
            }
          }
        }

        return null;
      }
    }
  }

  // Custom validation: Check value property of form. If NaN value, invalidate.
  checkForNaN(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (isNaN(control.value)) {
        console.log("Whats in value: ", isNaN(control.value))

        return { 'isNaN': true };
      }

      return null;
    }
  }

  // setUnitAndIcon() {
  //   console.log("setUnit() called")
  //   console.log("setUnit() type: ", this.inputForm.value.type)
  //   if (this.inputForm.value.type == "bloodSugar") {
  //     this.inputForm.value.unit = "mmol/L";
  //     this.inputForm.value.icon = "thermometer";
  //   }
  //   else if (this.inputForm.value.type == "bloodPressure") {
  //     this.inputForm.value.unit = "mmHg";
  //     // this.inputForm.value.icon = "";
  //   }
  //   else if (this.inputForm.value.type == "temperature") {
  //     this.inputForm.value.unit = "degreeCelcius";
  //     // this.inputForm.value.icon = "";
  //   }

  //   console.log(this.inputForm.value.unit)
  // }

  // setUnitAndIcon(val) {
  //   console.log("setUnit() called")
  //   console.log("setUnit() type: ", this.inputForm.get('type'))
  //   if (val == "Blood Sugar") {
  //     this.inputForm.get('unit').setValue("mmol/L");
  //     this.inputForm.get('icon').setValue("thermometer");
  //   }
  //   else if (val == "Blood Pressure") {
  //     this.inputForm.get('unit').setValue("mmHg");
  //     // this.inputForm.value.icon = "";
  //   }
  //   else if (val == "Temperature") {
  //     this.inputForm.get('unit').setValue("degreeCelcius");
  //     // this.inputForm.value.icon = "";
  //   }

  //   console.log(this.inputForm.value.unit)
  // }

  deleteInput(id) {
    this.symptomsService.deleteTempSymptomById(id)
      .then(res => {
        console.log("Is symptom deleted: ", res)
        // Close the modal and return data --> reload key: true value  
        this.modalController.dismiss({ reload: true });
      })
  }

  saveInput() {
    // Assign the form values to the symptom model object
    this.symptom.id = this.inputForm.value.id;
    // this.symptom.value = this.inputForm.value.value;
    // this.symptom.unit = this.inputForm.value.unit;
    this.symptom.type = this.inputForm.value.type;
    this.symptom.actionDescription = this.inputForm.value.actionDescription;
    this.symptom.typeDescription = this.inputForm.value.typeDescription;
    this.symptom.action = this.inputForm.value.action;
    this.symptom.color = this.inputForm.value.color;
    this.symptom.level = this.inputForm.value.level;
    this.symptom.icon = this.inputForm.value.icon;

    console.log("Symptom model object: ", this.symptom);

    // Update existing symptom & plan or add new symptom to plan
    if (this.id != null) {
      this.symptomsService.updateTempSymptom(this.symptom)
        .then(result => {
          console.log("Is storage updated: ", result)
          // Close the modal and return data --> reload key: true value  
          this.modalController.dismiss({ reload: true });
        })
    }
    else {
      // Add the new symptom to Ionic storage
      this.symptomsService.addTempSymptom(this.symptom)
        .then(result => {
          // Close the modal and return data --> reload key: true value  
          this.modalController.dismiss({ reload: true });
        })
    }
  }

  dropdown() {
    this.isVisible = !this.isVisible;
  }

  selectTypeInput(type) {
    console.log("what is type: ", type)
    this.selectedTypeInput = type;
  }
}

