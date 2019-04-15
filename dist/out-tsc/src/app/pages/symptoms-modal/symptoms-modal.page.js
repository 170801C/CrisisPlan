import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SymptomsService } from '../../services/symptoms.service';
import { ModalController, NavParams } from '@ionic/angular';
var SymptomsModalPage = /** @class */ (function () {
    function SymptomsModalPage(formBuilder, symptomsService, modalController, navParams) {
        this.formBuilder = formBuilder;
        this.symptomsService = symptomsService;
        this.modalController = modalController;
        this.navParams = navParams;
        this.symptom = {
            id: null,
            icon: null,
            value: null,
            unit: null,
            type: null,
            typeDescription: null,
            level: null,
            actionDescription: null,
            action: null,
            color: null
        };
        this.symptomsStorage = this.navParams.get('symptoms');
        // Get existing input id, if tapped
        this.id = this.navParams.get('id');
        this.level = this.navParams.get('level');
        this.criticals = this.navParams.get('criticals');
        this.importants = this.navParams.get('importants');
        this.normals = this.navParams.get('normals');
    }
    SymptomsModalPage.prototype.ngOnInit = function () {
        var _this = this;
        console.log("Any id here: ", this.id);
        this.inputForm = this.formBuilder.group({
            id: Date.now(),
            icon: [null],
            value: [null, Validators.compose([Validators.required, this.checkForNaN()])],
            unit: [null, Validators.required],
            type: [null, Validators.compose([Validators.required, this.checkForSameType()])],
            typeDescription: [null],
            level: [null],
            actionDescription: [null],
            action: [null, Validators.required],
            color: [null]
        });
        // For new input: Set level and color, based on level page 
        console.log("What is the level: ", this.level);
        if (this.level == "critical") {
            this.inputForm.get('level').setValue("critical");
            this.inputForm.get('color').setValue("#FF0000");
        }
        else if (this.level == "important") {
            this.inputForm.get('level').setValue("important");
            this.inputForm.get('color').setValue("#FFA500");
        }
        else if (this.level == "attention") {
            this.inputForm.get('level').setValue("attention");
            this.inputForm.get('color').setValue("#FFFF00");
        }
        else if (this.level == "normal") {
            this.inputForm.get('level').setValue("normal");
            this.inputForm.get('color').setValue("#008000");
        }
        // If existing input is tapped, retrieve its form values by id, to be displayed in modal and edited/deleted
        if (this.id != null) {
            console.log("Symptom id exists: ", this.id);
            this.symptomsService.getSymptomById(this.id)
                .then(function (symptom) {
                console.log("Symptom get by id: ", symptom[0]);
                // this.inputForm.get('action').reset()
                _this.inputForm.get('id').setValue(symptom[0].id);
                _this.inputForm.get('type').setValue(symptom[0].type);
                _this.inputForm.get('value').setValue(symptom[0].value);
                _this.inputForm.get('unit').setValue(symptom[0].unit);
                _this.inputForm.get('actionDescription').setValue(symptom[0].actionDescription);
                _this.inputForm.get('typeDescription').setValue(symptom[0].typeDescription);
                _this.inputForm.get('action').setValue(symptom[0].action);
                _this.inputForm.get('color').setValue(symptom[0].color);
                _this.inputForm.get('level').setValue(symptom[0].level);
                _this.inputForm.get('icon').setValue(symptom[0].icon);
                console.log("Whats in id: ", _this.inputForm.value.id);
                // console.log("Removing validators")
                // this.inputForm.get('type').clearValidators();
                // console.log("setting validators")
                // this.inputForm.get('type').setValidators([Validators.required, this.checkForSameType()]);
                // this.inputForm.get('type').updateValueAndValidity();
            });
            // console.log("Resetting validators")
            // this.inputForm.get('type').clearValidators();
            // this.inputForm.get('type').setValidators([Validators.required, this.checkForSameType()]);
            // this.inputForm.get('type').updateValueAndValidity();
        }
        // On changes to form field type, call setUnitAndIcon()
        this.inputForm.get('type').valueChanges.subscribe(function (val) {
            _this.setUnitAndIcon(val);
        });
    };
    Object.defineProperty(SymptomsModalPage.prototype, "action", {
        // Getters for form validation
        get: function () { return this.inputForm.get('action'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SymptomsModalPage.prototype, "type", {
        get: function () { return this.inputForm.get('type'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SymptomsModalPage.prototype, "value", {
        get: function () { return this.inputForm.get('value'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SymptomsModalPage.prototype, "unit", {
        get: function () { return this.inputForm.get('unit'); },
        enumerable: true,
        configurable: true
    });
    // Custom validation: For new input: If type exists, invalidate. For existing input: if type is not the same as the previous value, invalidate.
    SymptomsModalPage.prototype.checkForSameType = function () {
        var _this = this;
        return function (control) {
            console.log("anything in id? ", _this.id);
            console.log("Checking...");
            // New input
            if (_this.id == null) {
                // If there are existing inputs in Criticals page, check with them, else pass validation.
                if (_this.criticals != null) {
                    for (var symptom in _this.criticals) {
                        if (_this.criticals[symptom]['type'] == control.value) {
                            console.log("typeFormControl.value exissts on this page: ", control.value);
                            return { 'sameType': true };
                        }
                    }
                }
                else if (_this.importants != null) {
                    for (var symptom in _this.importants) {
                        if (_this.importants[symptom]['type'] == control.value) {
                            console.log("typeFormControl.value exissts on this page: ", control.value);
                            return { 'sameType': true };
                        }
                    }
                }
                else if (_this.normals != null) {
                    for (var symptom in _this.normals) {
                        if (_this.normals[symptom]['type'] == control.value) {
                            console.log("typeFormControl.value exissts on this page: ", control.value);
                            return { 'sameType': true };
                        }
                    }
                }
                // Validation passed
                return null;
            }
            // Existing input
            else {
                if (_this.criticals != null) {
                    console.log("Whats in criticals: ", _this.criticals);
                    for (var symptom in _this.criticals) {
                        // Iterate through criticals array. If both types are the same, but not the same item, invalidate.
                        if ((_this.criticals[symptom]['type'] == control.value) && (_this.criticals[symptom]['id'] != _this.id)) {
                            console.log("same type but diff item");
                            console.log("type: ", _this.criticals[symptom]['type']);
                            console.log("control type: ", control.value);
                            console.log("id: ", _this.criticals[symptom]['id']);
                            console.log("control id: ", _this.id);
                            return { 'sameType': true };
                        }
                    }
                }
                else if (_this.importants != null) {
                    for (var symptom in _this.importants) {
                        if ((_this.importants[symptom]['type'] == control.value) && (_this.importants[symptom]['id'] != _this.id)) {
                            return { 'sameType': true };
                        }
                    }
                }
                else if (_this.normals != null) {
                    for (var symptom in _this.normals) {
                        if ((_this.normals[symptom]['type'] == control.value) && (_this.normals[symptom]['id'] != _this.id)) {
                            return { 'sameType': true };
                        }
                    }
                }
                return null;
            }
        };
    };
    // Custom validation: Check value property of form. If NaN value, invalidate.
    SymptomsModalPage.prototype.checkForNaN = function () {
        return function (control) {
            if (isNaN(control.value)) {
                console.log("Whats in value: ", isNaN(control.value));
                return { 'isNaN': true };
            }
            return null;
        };
    };
    // setUnitAndIcon() {
    //   console.log("setUnit() called")
    //   console.log("setUnit() type: ", this.inputForm.value.type)
    //   if (this.inputForm.value.type == "bloodSugar") {
    //     this.inputForm.value.unit = "mmol/L";
    //     this.inputForm.value.icon = "thermometer";
    //   }
    //   else if (this.inputForm.value.type == "bloodPressure") {
    //     this.inputForm.value.unit = "mmHg";
    //     // this.inputForm.value.icon = "";
    //   }
    //   else if (this.inputForm.value.type == "temperature") {
    //     this.inputForm.value.unit = "degreeCelcius";
    //     // this.inputForm.value.icon = "";
    //   }
    //   console.log(this.inputForm.value.unit)
    // }
    SymptomsModalPage.prototype.setUnitAndIcon = function (val) {
        console.log("setUnit() called");
        console.log("setUnit() type: ", this.inputForm.get('type'));
        if (val == "Blood Sugar") {
            this.inputForm.get('unit').setValue("mmol/L");
            this.inputForm.get('icon').setValue("thermometer");
        }
        else if (val == "Blood Pressure") {
            this.inputForm.get('unit').setValue("mmHg");
            // this.inputForm.value.icon = "";
        }
        else if (val == "Temperature") {
            this.inputForm.get('unit').setValue("degreeCelcius");
            // this.inputForm.value.icon = "";
        }
        console.log(this.inputForm.value.unit);
    };
    SymptomsModalPage.prototype.deleteInput = function (id) {
        var _this = this;
        this.symptomsService.deleteSymptomById(id)
            .then(function (res) {
            console.log("Is symptom deleted: ", res);
            // Close the modal and return data --> reload key: true value  
            _this.modalController.dismiss({ reload: true });
        });
    };
    SymptomsModalPage.prototype.saveInput = function () {
        var _this = this;
        // Assign the form values to the symptom model object
        this.symptom.id = this.inputForm.value.id;
        this.symptom.value = this.inputForm.value.value;
        this.symptom.unit = this.inputForm.value.unit;
        this.symptom.type = this.inputForm.value.type;
        this.symptom.actionDescription = this.inputForm.value.actionDescription;
        this.symptom.typeDescription = this.inputForm.value.typeDescription;
        this.symptom.action = this.inputForm.value.action;
        this.symptom.color = this.inputForm.value.color;
        this.symptom.level = this.inputForm.value.level;
        this.symptom.icon = this.inputForm.value.icon;
        console.log("Symptom model object: ", this.symptom);
        // Update existing symptom & plan or add new symptom to plan
        if (this.id != null) {
            this.symptomsService.updateSymptom(this.symptom)
                .then(function (res) {
                console.log("Is storage updated: ", res);
                // Close the modal and return data --> reload key: true value  
                _this.modalController.dismiss({ reload: true });
            });
        }
        else {
            // Add the new symptom to Ionic storage
            this.symptomsService.addSymptom(this.symptom)
                .then(function (res) {
                // Close the modal and return data --> reload key: true value  
                _this.modalController.dismiss({ reload: true });
            });
        }
    };
    SymptomsModalPage = tslib_1.__decorate([
        Component({
            selector: 'app-symptoms-modal',
            templateUrl: './symptoms-modal.page.html',
            styleUrls: ['./symptoms-modal.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, SymptomsService, ModalController,
            NavParams])
    ], SymptomsModalPage);
    return SymptomsModalPage;
}());
export { SymptomsModalPage };
//# sourceMappingURL=symptoms-modal.page.js.map