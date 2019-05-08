import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
var GeneralService = /** @class */ (function () {
    function GeneralService() {
        // For Plan page - Get latest storage values 
        this.messageSource = new BehaviorSubject(false);
        this.currentMessage = this.messageSource.asObservable();
    }
    GeneralService.prototype.changeMessage = function (message) {
        this.messageSource.next(message);
    };
    GeneralService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], GeneralService);
    return GeneralService;
}());
export { GeneralService };
//# sourceMappingURL=general.service.js.map