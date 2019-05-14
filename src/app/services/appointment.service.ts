import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const APPOINTMENT_KEY = "myAppointment";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private storage: Storage) { }

  addAppointment(myAppointment) {
    return this.storage.get(APPOINTMENT_KEY).then(appointments => {
      if (!appointments) {
        return this.storage.set(APPOINTMENT_KEY, [myAppointment]);
      }
      else {
        appointments.push(myAppointment);

        return this.storage.set(APPOINTMENT_KEY, appointments);
      }
    })
  }

  getAppointmentById(id) {
    return this.storage.get(APPOINTMENT_KEY).then(result => {
      return result.filter(item => item.id == id)
    })
  }

  updateAppointment(myAppointment) {
    return this.storage.get(APPOINTMENT_KEY)
      .then(result => {
        let updatedAppointments = [];

        for (let appointment of result) {
          if (appointment.id == myAppointment.id) {
            updatedAppointments.push(myAppointment);
          }
          else {
            updatedAppointments.push(appointment);
          }
        }

        return this.storage.set(APPOINTMENT_KEY, updatedAppointments);
      })
  }

  deleteAppointmentById(id) {
    return this.storage.get(APPOINTMENT_KEY)
      .then(result => {
        let toKeep = [];
        let toDelete = null;

        for (let appointment of result) {
          if (appointment.id != id) {
            toKeep.push(appointment);
          }
          else {
            toDelete = appointment;
          }
        }

        return this.storage.set(APPOINTMENT_KEY, toKeep);
      })
  }

  getAppointments() {
    return this.storage.get(APPOINTMENT_KEY).then(result => {
      if (!result) {
        return [];
      }
      else {
        return result;
      }
    })
  }

  deleteAppointments() {
    this.storage.remove(APPOINTMENT_KEY);
  }
}
