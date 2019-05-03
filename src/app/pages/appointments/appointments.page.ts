import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
})
export class AppointmentsPage implements OnInit {

  appointments = [];

  constructor(private router: Router, private appointmentService: AppointmentService, private events: Events) {
    // Subscribe to the Reload event to reload the Appointments page on storage changes
    this.events.subscribe('Reload-appointment', () => {
      this.loadAppointments();
    });
  }

  ngOnInit() {
    this.loadAppointments();
  }

  ionViewWillEnter() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentService.getAppointments()
      .then(result => {
        console.log("Appointments: ", result)
        this.appointments = result;
      })
  }

  async deleteInput(id) {
    await this.appointmentService.deleteAppointmentById(id)
    console.log("Deleted appointment")
    this.loadAppointments();
  }

  openInput(id) {
    this.router.navigateByUrl(`/tabs/appointments/appointment-detail/${id}`);
  }
}
