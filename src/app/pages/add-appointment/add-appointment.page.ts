import { Component, OnInit } from '@angular/core';
import { appointmentModel } from '../../models/appointmentModel';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.page.html',
  styleUrls: ['./add-appointment.page.scss'],
})
export class AddAppointmentPage implements OnInit {

  inputForm: FormGroup;
  appointment: appointmentModel = {
    apptDate: null,
    apptTime: null,
    clinicName: null
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

}
