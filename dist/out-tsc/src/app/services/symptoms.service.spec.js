import { TestBed } from '@angular/core/testing';
import { SymptomsService } from './symptoms.service';
describe('SymptomsService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(SymptomsService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=symptoms.service.spec.js.map