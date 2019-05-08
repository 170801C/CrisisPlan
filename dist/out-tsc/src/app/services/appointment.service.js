import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
var APPOINTMENT_KEY = "myAppointment";
var AppointmentService = /** @class */ (function () {
    function AppointmentService(storage) {
        this.storage = storage;
    }
    AppointmentService.prototype.addAppointment = function (myAppointment) {
        var _this = this;
        return this.storage.get(APPOINTMENT_KEY).then(function (appointments) {
            if (!appointments) {
                console.log("No existing appointments");
                return _this.storage.set(APPOINTMENT_KEY, [myAppointment]);
            }
            else {
                console.log("Existing appointments: ", appointments);
                console.log("myAppointment: ", myAppointment);
                appointments.push(myAppointment);
                return _this.storage.set(APPOINTMENT_KEY, appointments);
            }
        });
    };
    AppointmentService.prototype.getAppointmentById = function (id) {
        return this.storage.get(APPOINTMENT_KEY).then(function (result) {
            return result.filter(function (item) { return item.id == id; });
        });
    };
    AppointmentService.prototype.updateAppointment = function (myAppointment) {
        var _this = this;
        return this.storage.get(APPOINTMENT_KEY)
            .then(function (result) {
            console.log("updating appointment");
            console.log("Get storage result: ", result);
            var updatedAppointments = [];
            for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                var appointment = result_1[_i];
                if (appointment.id == myAppointment.id) {
                    console.log("Id match");
                    updatedAppointments.push(myAppointment);
                }
                else {
                    updatedAppointments.push(appointment);
                }
            }
            return _this.storage.set(APPOINTMENT_KEY, updatedAppointments);
        });
    };
    AppointmentService.prototype.deleteAppointmentById = function (id) {
        var _this = this;
        return this.storage.get(APPOINTMENT_KEY)
            .then(function (result) {
            var toKeep = [];
            var toDelete = null;
            for (var _i = 0, result_2 = result; _i < result_2.length; _i++) {
                var appointment = result_2[_i];
                if (appointment.id != id) {
                    toKeep.push(appointment);
                }
                else {
                    toDelete = appointment;
                }
            }
            return _this.storage.set(APPOINTMENT_KEY, toKeep);
        });
    };
    AppointmentService.prototype.getAppointments = function () {
        return this.storage.get(APPOINTMENT_KEY).then(function (result) {
            if (!result) {
                return [];
            }
            else {
                return result;
            }
        });
    };
    AppointmentService.prototype.deleteAppointments = function () {
        this.storage.remove(APPOINTMENT_KEY);
    };
    AppointmentService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Storage])
    ], AppointmentService);
    return AppointmentService;
}());
export { AppointmentService };
//# sourceMappingURL=appointment.service.js.map