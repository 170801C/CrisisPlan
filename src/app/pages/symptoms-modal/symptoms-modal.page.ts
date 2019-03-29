import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { symptomModel } from '../../models/symptomModel'
import { SymptomsService } from '../../services/symptoms.service';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-symptoms-modal',
  templateUrl: './symptoms-modal.page.html',
  styleUrls: ['./symptoms-modal.page.scss'],
})
export class SymptomsModalPage implements OnInit {

  inputForm: FormGroup;
  colors = [
    '#FF0000',   // Red
    '#FFA500',   // Orange
    '#FFFF00',   // Yellow
    '#008000'    // Green
  ];
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
      type: [null, Validators.required],
      level: null,
      description: null,
      action: null,
      color: null,
    })
  }

  saveInput() {
    // let toSave = this.inputForm.value;
    this.symptom = this.inputForm.value;
    console.log("Symptom model instance: ", this.symptom)

    // Add the memory to Ionic storage
    this.symptomService.addSymptom(this.symptom)
      .then(res => {
        // Close the modal and return data --> reload key: true value  
        this.modalController.dismiss({ reload: true });
      })
  }

}
