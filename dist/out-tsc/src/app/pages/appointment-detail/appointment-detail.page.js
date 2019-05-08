import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AppointmentService } from 'src/app/services/appointment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Events } from '@ionic/angular';
var AppointmentDetailPage = /** @class */ (function () {
    function AppointmentDetailPage(formBuilder, appointmentService, route, router, events) {
        this.formBuilder = formBuilder;
        this.appointmentService = appointmentService;
        this.route = route;
        this.router = router;
        this.events = events;
        this.appointment = {
            id: Date.now(),
            apptDate: null,
            apptTime: null,
            clinicName: null
        };
        // Get existing input id, if tapped
        this.id = null;
    }
    AppointmentDetailPage.prototype.ngOnInit = function () {
        var _this = this;
        this.id = this.route.snapshot.paramMap.get('id');
        // If existing input is tapped, retrieve its form values by id, to be displayed in page form for editing/deletion.
        if (this.id != null) {
            console.log("Appointment id exists: ", this.id);
            this.appointmentService.getAppointmentById(this.id)
                .then(function (appointment) {
                console.log("Symptom get by id: ", appointment[0]);
                // Get appointment by id and insert its values into the form
                _this.appointment = appointment[0];
            });
        }
    };
    // Getters for form validation
    // get date() { return this.inputForm.get('date'); }
    // get time() { return this.inputForm.get('time'); }
    // get name() { return this.inputForm.get('name'); }
    AppointmentDetailPage.prototype.saveInput = function () {
        var _this = this;
        console.log("Appointment model object: ", this.appointment);
        // Update existing appointment or add new appointment to plan
        if (this.id != null) {
            this.appointmentService.updateAppointment(this.appointment)
                .then(function (result) {
                // Create a subscription event that reloads the Appointments page on storage changes
                _this.events.publish('Reload-appointment');
                console.log("Is storage updated: ", result);
                // this.router.navigateByUrl('/tabs/appointments');
            });
        }
        else {
            this.appointmentService.addAppointment(this.appointment)
                .then(function (result) {
                // Create a subscription event that reloads the Appointments page on storage changes
                _this.events.publish('Reload-appointment');
                console.log("Is storage added: ", result);
                // this.router.navigateByUrl('/tabs/appointments');
            });
        }
    };
    AppointmentDetailPage = tslib_1.__decorate([
        Component({
            selector: 'app-appointment-detail',
            templateUrl: './appointment-detail.page.html',
            styleUrls: ['./appointment-detail.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, AppointmentService,
            ActivatedRoute, Router, Events])
    ], AppointmentDetailPage);
    return AppointmentDetailPage;
}());
export { AppointmentDetailPage };
//# sourceMappingURL=appointment-detail.page.js.map