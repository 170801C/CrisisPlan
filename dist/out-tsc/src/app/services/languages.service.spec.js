import { TestBed } from '@angular/core/testing';
import { LanguagesService } from './languages.service';
describe('LanguagesService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(LanguagesService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=languages.service.spec.js.map