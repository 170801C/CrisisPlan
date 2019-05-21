import { Component, OnInit } from '@angular/core';
import { appointmentModel } from '../../models/appointmentModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppointmentService } from 'src/app/services/appointment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Events, AlertController } from '@ionic/angular';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
// import { LocalNotifications, ELocalNotificationTriggerUnit, ILocalNotificationActionType, ILocalNotification } from '@ionic-native/local-notifications/ngx';


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
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  appointmentDateTime = null;
  currentDateTime = null;

  constructor(private formBuilder: FormBuilder, private appointmentService: AppointmentService,
    private route: ActivatedRoute, private router: Router, private events: Events, private localNotifications: LocalNotifications,
    private alertController: AlertController) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    // If existing input is tapped, retrieve its form values by id, to be displayed in page form for editing/deletion.
    if (this.id != null) {
      this.appointmentService.getAppointmentById(this.id)
        .then((appointment) => {
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
    this.year = parseInt(this.appointment.apptDate.slice(0, 4));
    // Javascript new Date month runs from 0 - 11, not 1 - 12. So minus 1 to get the correct month.
    this.month = parseInt(this.appointment.apptDate.slice(5, 7)) - 1;
    this.day = parseInt(this.appointment.apptDate.slice(8));
    this.hour = parseInt(this.appointment.apptTime.slice(0, 2));
    this.minute = parseInt(this.appointment.apptTime.slice(3));

    console.log("Date: ", new Date(this.year, this.month, this.day, this.hour, this.minute))

    this.appointmentDateTime = new Date(this.year, this.month, this.day, this.hour, this.minute).getTime();
    this.currentDateTime = new Date().getTime();

    // If the appointment dateTime is than the current dateTime (future appointment), schedule a notification for the appointment.
    console.log("appt datetime: ", this.appointmentDateTime)
    console.log("current date time: ", this.currentDateTime)

    if (this.appointmentDateTime > this.currentDateTime) {
      this.scheduleNotification(this.appointmentDateTime, this.appointment.apptDate, this.appointment.apptTime,  this.appointment.clinicName);
    }

    // Update existing appointment or add new appointment to plan
    if (this.id != null) {
      this.appointmentService.updateAppointment(this.appointment)
        .then(result => {
          // Create a subscription event that reloads the Appointments page on storage changes
          this.events.publish('Reload-appointment');
          // this.router.navigateByUrl('/tabs/appointments');
        })
    }
    else {
      this.appointmentService.addAppointment(this.appointment)
        .then(result => {
          // Create a subscription event that reloads the Appointments page on storage changes
          this.events.publish('Reload-appointment');
          // this.router.navigateByUrl('/tabs/appointments');
        })
    }
  }

  scheduleNotification(appointmentDateTime, appointmentDate, appointmentTime, clinic) {
    console.log("is this scheduled? ")
    this.localNotifications.schedule({
      id: 1,
      title: 'Crisis Plan Medical Appointment',
      text: 'Please be reminded that you have an upcoming medical appointment: ' + appointmentDate + ', ' + appointmentTime + ', ' + clinic,
      trigger: { at: new Date(appointmentDateTime) },
      foreground: true,
      // Android only features
      icon: "/resources/icon.png",
      lockscreen: true,
      vibrate: true,
      led: true
    });

    console.log("Is finished? ")
  }
}
