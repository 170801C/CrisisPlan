import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Platform, AlertController, IonRouterOutlet } from '@ionic/angular';
import { SymptomsService } from '../../services/symptoms.service';
import { ModalController } from '@ionic/angular';
import { SymptomsModalPage } from '../symptoms-modal/symptoms-modal.page';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
var PlanPage = /** @class */ (function () {
    function PlanPage(platform, symptomService, modalController, router, contactService, alertController, toastController, file, fileOpener, routerOutlet) {
        this.platform = platform;
        this.symptomService = symptomService;
        this.modalController = modalController;
        this.router = router;
        this.contactService = contactService;
        this.alertController = alertController;
        this.toastController = toastController;
        this.file = file;
        this.fileOpener = fileOpener;
        this.routerOutlet = routerOutlet;
        // Declare an array to hold all plans from storage, to be used in template
        this.contact = {
            name: null,
            number: null
        };
        this.symptoms = [];
        this.criticals = [];
        this.importants = [];
        this.attentions = [];
        this.normals = [];
        this.lastBackPressTime = 0;
        this.timePeriodToExitApp = 2000;
        this.pdfObj = null;
    }
    PlanPage.prototype.ngOnInit = function () {
        // this.symptomService.deleteAll();
        var _this = this;
        this.platform.ready()
            .then(function () {
            // Display a toast to inform user to press the back button again to exit the app
            // this.customBackActionSubscription = this.platform.backButton.subscribe(() => {
            //   if (new Date().getTime() - this.lastBackPressTime < this.timePeriodToExitApp) {
            //     // this.platform.exitApp(); 
            //     console.log("Exiting app")
            //     navigator['app'].exitApp();
            //   } else {
            //     // Display toast
            //     this.exitAppToast()
            //     this.lastBackPressTime = new Date().getTime();
            //   }
            // })
            console.log("Router url: ", _this.router.url);
            // Prevent back button propagation with subscribeWithPriority()
            _this.customBackActionSubscription = _this.platform.backButton.subscribeWithPriority(1, function () {
                // this.navigateToPreviousPage();
                if ((_this.router.url == '/tabs/plan') || (_this.router.url == '/tabs') || (_this.router.url == '/')) {
                    if (new Date().getTime() - _this.lastBackPressTime < _this.timePeriodToExitApp) {
                        console.log("Route matches!! Exit");
                        navigator['app'].exitApp();
                    }
                    else {
                        console.log("Route matches!! Press back again");
                        _this.exitAppToast();
                        _this.lastBackPressTime = new Date().getTime();
                    }
                }
                else if (_this.router.url == '/tabs/plan/contact') {
                    _this.discardChangesAlert();
                }
                else {
                    if (_this.routerOutlet && _this.routerOutlet.canGoBack()) {
                        console.log("Route does not match!!");
                        _this.routerOutlet.pop();
                    }
                }
            });
            // // Get the latest updated storage values 
            // this.contactAndPlanSubscription = this.generalService.currentMessage.subscribe(() => {
            //   this.loadContact();
            //   this.loadPlan();
            // })
            _this.loadContact();
            _this.loadPlan();
        });
    };
    // public navigateToPreviousPage() {
    //   const url = this.router.url;
    //   // if (url.match("(^\/[a-zA-Z0-9\-\.]*)$")) {
    //     console.log("Route matches!!")
    //     navigator['app'].exitApp();
    //   }
    //   else {
    //     console.log("Route does not match!!")
    //     this.navController.navigateBack(url.replace(new RegExp("(\/([a-zA-Z0-9\-\.])*)$"), ""));
    //   }
    // }
    PlanPage.prototype.ionViewWillEnter = function () {
        // this.customBackActionSubscription = this.platform.backButton.subscribe(() => {
        //   if (new Date().getTime() - this.lastBackPressTime < this.timePeriodToExitApp) {
        //     // this.platform.exitApp(); 
        //     navigator['app'].exitApp();
        //   } else {
        //     // Show toast upon exiting app
        //     this.exitAppToast()
        //     this.lastBackPressTime = new Date().getTime();
        //   }
        // })
        // this.contactAndPlanSubscription = this.generalService.currentMessage.subscribe(() => {
        //   this.loadContact();
        //   this.loadPlan();
        // })
        this.loadContact();
        this.loadPlan();
    };
    // Unsubscribe for garbage colleciton, prevent memory leaks
    PlanPage.prototype.ionViewWillLeave = function () {
        // if (this.customBackActionSubscription) {
        //   console.log("customBackActionSubscription unsubscribe")
        //   this.customBackActionSubscription.unsubscribe();
        // }
        // if (this.contactAndPlanSubscription) {
        //   console.log("contactAndPlanSubscription unsubscribe")
        //   this.contactAndPlanSubscription.unsubscribe();
        // }
    };
    // Clear the colored arrays
    PlanPage.prototype.emptyArrays = function () {
        this.criticals.length = 0;
        this.importants.length = 0;
        this.attentions.length = 0;
        this.normals.length = 0;
    };
    // Sort the plans array into their level categories 
    PlanPage.prototype.sortInputs = function (symptoms) {
        console.log("Sorting inputs: ", symptoms);
        for (var _i = 0, symptoms_1 = symptoms; _i < symptoms_1.length; _i++) {
            var symptom = symptoms_1[_i];
            if (symptom.level == "critical") {
                this.criticals.push(symptom);
            }
            else if (symptom.level == "important") {
                this.importants.push(symptom);
            }
            else if (symptom.level == "attention") {
                this.attentions.push(symptom);
            }
            else if (symptom.level == "normal") {
                this.normals.push(symptom);
            }
        }
    };
    PlanPage.prototype.loadContact = function () {
        var _this = this;
        this.contactService.getContact()
            .then(function (result) {
            if ('name' in result) {
                console.log();
                _this.contact = result;
                _this.contactExists = true;
            }
            else {
                _this.contactExists = false;
            }
            console.log("getContact() called: ", result);
            console.log("Whats in contact: ", _this.contact);
            console.log("contact exist: ", _this.contactExists);
        });
    };
    PlanPage.prototype.loadPlan = function () {
        var _this = this;
        this.symptomService.getPlan()
            .then(function (result) {
            _this.symptoms = result;
            console.log("getPlan() result: ", result);
            console.log("this.symptoms: ", _this.symptoms);
            if (_this.symptoms.length > 0) {
                _this.planExists = true;
            }
            else {
                _this.planExists = false;
            }
            console.log("plan exist: ", _this.planExists);
            _this.emptyArrays();
            console.log("Whats in crit arr:", _this.criticals);
            _this.sortInputs(_this.symptoms);
            console.log('normal: ', _this.normals);
            console.log('attention: ', _this.attentions);
            console.log('important: ', _this.importants);
            console.log('critical: ', _this.criticals);
        });
    };
    // Create a modal to add a new symptom input
    PlanPage.prototype.addInput = function () {
        var _this = this;
        this.modalController.create({
            component: SymptomsModalPage,
            componentProps: { symptoms: this.symptoms }
        }).then(function (modal) {
            modal.present();
            // Get the data passed when the modal is dismissed 
            modal.onWillDismiss().then(function (data) {
                if (data.data && data.data['reload']) {
                    console.log("Reload page");
                    _this.loadPlan();
                }
            });
        });
    };
    // openInput(id) {
    //   this.modalController.create({
    //     component: SymptomsModalPage,
    //     componentProps: { symptoms: this.symptoms, id: id }
    //   }).then(modal => {
    //     modal.present();
    //     // Get the data passed when the modal is dismissed 
    //     modal.onWillDismiss().then(data => {
    //       if (data.data && data.data['reload']) {
    //         console.log("Reload normal page");
    //         this.loadPlan();
    //       }
    //     })
    //   })
    // }
    PlanPage.prototype.addNewPlanAlert = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Add new plan',
                            message: '<strong>Adding a new plan will delete the existing plan.<br><br>Proceed?</strong>',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                }, {
                                    text: 'Ok',
                                    handler: function () {
                                        console.log('Confirm Okay');
                                        // Empty storage
                                        _this.contactService.deleteContact();
                                        _this.symptomService.deletePlan();
                                        // For plan and contact: Copy actual to temp
                                        _this.symptomService.actualToTemp();
                                        _this.contactService.actualToTemp();
                                        // Go to Contact page
                                        _this.router.navigateByUrl('/tabs/plan/contact');
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PlanPage.prototype.discardChangesAlert = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Discard changes',
                            message: '<strong>Discard changes?</strong>',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                }, {
                                    text: 'Ok',
                                    handler: function () {
                                        console.log('Confirm Okay');
                                        // Empty storage
                                        _this.contactService.deleteTempContact();
                                        _this.symptomService.deleteTempPlan();
                                        // Go to Plan page
                                        _this.router.navigateByUrl('/tabs/plan');
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PlanPage.prototype.exitAppToast = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Press the back button again to exit the app',
                            duration: 2000,
                            position: 'middle',
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    PlanPage.prototype.allActualToTemp = function () {
        var _this = this;
        // Promise chaining to ensure getting the resolved result before the next operation
        this.symptomService.actualToTemp().then(function () {
            _this.contactService.actualToTemp().then(function () {
                _this.router.navigateByUrl('/tabs/plan/contact');
            });
        });
    };
    // async createPDF() {
    PlanPage.prototype.createPDF = function () {
        var _this = this;
        console.log("Anything in contact: ", this.contact);
        var body = [];
        var crit = [];
        var impt = [];
        var norm = [];
        var critHead = '';
        var imptHead = '';
        var normHead = '';
        var type = {
            text: null,
            style: null
        };
        // let value = {
        //   text: null,
        //   style: null
        // }
        // let unit = {
        //   text: null,
        //   style: null
        // }
        var action = {
            text: null,
            style: null
        };
        var typeDescription = {
            text: null,
            style: null
        };
        var actionDescription = {
            text: null,
            style: null
        };
        console.log("Whats in this.criticals: ", this.criticals);
        if (this.criticals.length != 0) {
            console.log("Entering criticals");
            critHead = "Critical";
            for (var _i = 0, _a = this.criticals; _i < _a.length; _i++) {
                var critical = _a[_i];
                console.log("Whats in 1 critical: ", critical);
                type['text'] = critical['type'];
                // value['text'] = critical['value'];
                // unit['text'] = critical['unit'];
                action['text'] = critical['action'];
                typeDescription['text'] = critical['typeDescription'];
                actionDescription['text'] = critical['actionDescription'];
                console.log("actiondescription:  ", actionDescription['text']);
                // Manually populate the critical array. Cannot push the objects into the array as objects are copied by reference, not value/cloned. 
                crit[0] = {};
                crit[1] = {};
                crit[2] = {};
                crit[3] = {};
                for (var prop in type) {
                    crit[0][prop] = type[prop];
                }
                // for (let prop in value) {
                //   crit[1][prop] = value[prop];
                // }
                // for (let prop in unit) {
                //   crit[2][prop] = unit[prop];
                // }
                for (var prop in action) {
                    crit[1][prop] = action[prop];
                }
                for (var prop in typeDescription) {
                    crit[2][prop] = typeDescription[prop];
                }
                for (var prop in actionDescription) {
                    crit[3][prop] = actionDescription[prop];
                }
                console.log("WHat is crit: ", crit);
                body.push(crit);
                // Empty the crit array for the next critical symptom
                crit = [];
            }
        }
        console.log("Whats in body: ", body);
        // Create the document definition required by pdfmake,then create the pdf.
        var docDefinition = {
            content: [
                {
                    alignment: 'justify',
                    columns: [
                        [
                            'TCS Name',
                            this.contact.name
                        ],
                        [
                            'TCS Number',
                            this.contact.number
                        ]
                    ]
                },
                critHead,
                {
                    style: 'tableExample',
                    layout: 'noBorders',
                    table: {
                        headerRows: 0,
                        body: body
                        // [{ text: 'Critical', style: 'tableHeader' }, ],
                        // [this.criticals],
                        // ['Sample value 1'],
                        // ['Sample value 1']
                    }
                }
            ],
            styles: {
                tableExample: {
                    margin: [0, 5, 0, 15]
                },
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                }
            }
        };
        this.pdfObj = pdfMake.createPdf(docDefinition);
        if (this.platform.is('cordova')) {
            this.pdfObj.getBuffer(function (buffer) {
                var blob = new Blob([buffer], { type: 'application/pdf' });
                // Save the PDF to the data directory of our app
                _this.file.writeFile(_this.file.dataDirectory, 'CrisisPlan.pdf', blob, { replace: true }).then(function (fileEntry) {
                    // Open the PDf with the correct OS tools
                    _this.fileOpener.open(_this.file.dataDirectory + 'CrisisPlan.pdf', 'application/pdf');
                });
            });
        }
        else {
            // On a browser simply use download. Remove this for production.
            this.pdfObj.download();
        }
    };
    PlanPage = tslib_1.__decorate([
        Component({
            selector: 'app-plan',
            templateUrl: './plan.page.html',
            styleUrls: ['./plan.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Platform, SymptomsService, ModalController,
            Router, ContactService, AlertController, ToastController,
            File, FileOpener, IonRouterOutlet])
    ], PlanPage);
    return PlanPage;
}());
export { PlanPage };
//# sourceMappingURL=plan.page.js.map