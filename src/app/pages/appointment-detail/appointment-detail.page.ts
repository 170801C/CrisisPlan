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
    id: Date.now(),
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

    // If existing input is tapped, retrieve its form values by id, to be displayed in page form for editing/deletion.
    if (this.id != null) {

      console.log("Appointment id exists: ", this.id)

      this.appointmentService.getAppointmentById(this.id)
        .then((appointment) => {
          console.log("Symptom get by id: ", appointment[0])
          // Get appointment by id and insert its values into the form
          this.appointment = appointment[0]
        })
    }
  }

  // Getters for form validation
  // get date() { return this.inputForm.get('date'); }
  // get time() { return this.inputForm.get('time'); }
  // get name() { return this.inputForm.get('name'); }

  saveInput() {
    console.log("Appointment model object: ", this.appointment);

    // Update existing appointment or add new appointment to plan
    if (this.id != null) {
      this.appointmentService.updateAppointment(this.appointment)
        .then(result => {
          // Create a subscription event that reloads the Appointments page on storage changes
          this.events.publish('Reload-appointment');
          console.log("Is storage updated: ", result)

          // this.router.navigateByUrl('/tabs/appointments');
        })
    }
    else {
      this.appointmentService.addAppointment(this.appointment)
        .then(result => {
          // Create a subscription event that reloads the Appointments page on storage changes
          this.events.publish('Reload-appointment');
          console.log("Is storage added: ", result)

          // this.router.navigateByUrl('/tabs/appointments');
        })
    }
  }
}
