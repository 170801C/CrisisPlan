import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
var routes = [
    { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
    { path: 'plan', loadChildren: './pages/plan/plan.module#PlanPageModule' },
    { path: 'appointments', loadChildren: './pages/appointments/appointments.module#AppointmentsPageModule' },
    { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
    { path: 'symptoms', loadChildren: './pages/symptoms/symptoms.module#SymptomsPageModule' },
    { path: 'symptoms-modal', loadChildren: './pages/symptoms-modal/symptoms-modal.module#SymptomsModalPageModule' },
    { path: 'critical', loadChildren: './pages/critical/critical.module#CriticalPageModule' },
    { path: 'contact', loadChildren: './pages/contact/contact.module#ContactPageModule' },
    { path: 'important', loadChildren: './pages/important/important.module#ImportantPageModule' },
    { path: 'normal', loadChildren: './pages/normal/normal.module#NormalPageModule' },
    { path: 'attention', loadChildren: './pages/attention/attention.module#AttentionPageModule' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map