import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Events } from '@ionic/angular';
var AppointmentsPage = /** @class */ (function () {
    function AppointmentsPage(router, appointmentService, events) {
        var _this = this;
        this.router = router;
        this.appointmentService = appointmentService;
        this.events = events;
        this.appointments = [];
        // Subscribe to the Reload event to reload the Appointments page on storage changes
        this.events.subscribe('Reload-appointment', function () {
            _this.loadAppointments();
        });
    }
    AppointmentsPage.prototype.ngOnInit = function () {
        this.loadAppointments();
    };
    AppointmentsPage.prototype.ionViewWillEnter = function () {
        this.loadAppointments();
    };
    AppointmentsPage.prototype.loadAppointments = function () {
        var _this = this;
        this.appointmentService.getAppointments()
            .then(function (result) {
            console.log("Appointments: ", result);
            _this.appointments = result;
        });
    };
    AppointmentsPage.prototype.deleteInput = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.appointmentService.deleteAppointmentById(id)];
                    case 1:
                        _a.sent();
                        console.log("Deleted appointment");
                        this.loadAppointments();
                        return [2 /*return*/];
                }
            });
        });
    };
    AppointmentsPage.prototype.openInput = function (id) {
        this.router.navigateByUrl("/tabs/appointments/appointment-detail/" + id);
    };
    AppointmentsPage = tslib_1.__decorate([
        Component({
            selector: 'app-appointments',
            templateUrl: './appointments.page.html',
            styleUrls: ['./appointments.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, AppointmentService, Events])
    ], AppointmentsPage);
    return AppointmentsPage;
}());
export { AppointmentsPage };
//# sourceMappingURL=appointments.page.js.map