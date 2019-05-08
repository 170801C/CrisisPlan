import { TestBed } from '@angular/core/testing';
import { AppointmentService } from './appointment.service';
describe('AppointmentService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(AppointmentService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=appointment.service.spec.js.map