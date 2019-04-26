import { Component, OnInit } from '@angular/core';
import { appointmentModel } from '../../models/appointmentModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppointmentService } from 'src/app/services/appointment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Events } from '@ionic/angular';


@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.page.html',
  styleUrls: ['./appointment-detail.page.scss'],
})
export class AppointmentDetailPage implements OnInit {

  inputForm: FormGroup;
  appointment: appointmentModel = {
    id: null,
    apptDate: null,
    apptTime: null,
    clinicName: null
  }
  // Get existing input id, if tapped
  id = null;

  constructor(private formBuilder: FormBuilder, private appointmentService: AppointmentService,
    private route: ActivatedRoute, private router: Router, private events: Events) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.inputForm = this.formBuilder.group({
      id: Date.now(),
      apptDate: [null, Validators.required],
      apptTime: [null, Validators.required],
      clinicName: [null, Validators.required]
    })

    // If existing input is tapped, retrieve its form values by id, to be displayed in page form for editing/deletion.
    if (this.id != null) {

      console.log("Appointment id exists: ", this.id)

      this.appointmentService.getAppointmentById(this.id)
        .then((appointment) => {
          console.log("Symptom get by id: ", appointment[0])

          this.inputForm.get('id').setValue(appointment[0].id);
          this.inputForm.get('apptDate').setValue(appointment[0].apptDate);
          this.inputForm.get('apptTime').setValue(appointment[0].apptTime);
          this.inputForm.get('clinicName').setValue(appointment[0].clinicName);
        })
    }
  }

  // Getters for form validation
  get apptDate() { return this.inputForm.get('apptDate'); }
  get apptTime() { return this.inputForm.get('apptTime'); }
  get clinicName() { return this.inputForm.get('clinicName'); }

  saveInput() {
    // Assign the form values to the appointment model object
    this.appointment.id = this.inputForm.value.id;
    this.appointment.apptDate = this.inputForm.value.apptDate;
    this.appointment.apptTime = this.inputForm.value.apptTime;
    this.appointment.clinicName = this.inputForm.value.clinicName;

    console.log("Appointment model object: ", this.appointment);

    // Update existing appointment or add new appointment to plan
    if (this.id != null) {
      this.appointmentService.updateAppointment(this.appointment)
        .then(result => {
          // Create a subscription event that reloads the Appointments page on storage changes
          this.events.publish('Reload');
          console.log("Is storage updated: ", result)

          // this.router.navigateByUrl('/tabs/appointments');
        })
    }
    else {
      this.appointmentService.addAppointment(this.appointment)
        .then(result => {
          // Create a subscription event that reloads the Appointments page on storage changes
          this.events.publish('Reload');
          console.log("Is storage added: ", result)

          // this.router.navigateByUrl('/tabs/appointments');
        })
    }
  }
}
