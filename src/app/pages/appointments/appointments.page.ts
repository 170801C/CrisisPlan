import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
})
export class AppointmentsPage implements OnInit {

  appointments = [];

  constructor(private router: Router, private appointmentService: AppointmentService) { }

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

  deleteInput(id) {
    this.appointmentService.deleteAppointmentById(id);
    console.log("Deleted appointment")
  }
  
  openInput(id) {
    this.router.navigateByUrl(`/tabs/appointments/appointment-detail/${id}`);
  }
}
