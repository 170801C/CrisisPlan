import * as tslib_1 from "tslib";
// Tabs routing is done here, but the main routing is in app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';
var routes = [
    {
        path: 'tabs',
        // The component to instantiate when the path matches. Since this tabs component is the tab navigation bar at the bottom, component: TabsPage is required
        component: TabsPage,
        // Array of child Route objects (e.g. tabs/tab1 --> tab1 is a child route of tabs)
        children: [
            {
                path: 'plan',
                children: [
                    {
                        path: '',
                        // Relative file path to this filename.module#module_name
                        loadChildren: '../pages/plan/plan.module#PlanPageModule'
                    }
                ]
            },
            {
                path: 'appointment',
                children: [
                    {
                        path: '',
                        loadChildren: '../pages/appointments/appointments.module#AppointmentsPageModule'
                    }
                ]
            },
            {
                path: 'settings',
                children: [
                    {
                        path: '',
                        loadChildren: '../pages/settings/settings.module#SettingsPageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/tabs/tab1',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/plan',
        pathMatch: 'full'
    }
];
var TabsPageRoutingModule = /** @class */ (function () {
    function TabsPageRoutingModule() {
    }
    TabsPageRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], TabsPageRoutingModule);
    return TabsPageRoutingModule;
}());
export { TabsPageRoutingModule };
//# sourceMappingURL=tabs.router.module.js.map