import { TestBed } from '@angular/core/testing';
import { GeneralService } from './general.service';
describe('GeneralService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(GeneralService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=general.service.spec.js.map