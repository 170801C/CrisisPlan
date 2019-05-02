// Tabs routing is done here, but the main routing is in app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
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
          },
          {
            path: 'contact',
            children: [
              {
                path: '',
                loadChildren: '../pages/contact/contact.module#ContactPageModule',
              },
              {
                path: 'critical',
                children: [
                  {
                    path: '',
                    loadChildren: '../pages/critical/critical.module#CriticalPageModule'
                  },
                  {
                    path: 'important',
                    children: [
                      {
                        path: '',
                        loadChildren: '../pages/important/important.module#ImportantPageModule'
                      },
                      {
                        path: 'normal',
                        loadChildren: '../pages/normal/normal.module#NormalPageModule'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        path: 'appointments',
        children: [
          {
            path: '',
            loadChildren: '../pages/appointments/appointments.module#AppointmentsPageModule'
          },
          {
            path: 'appointment-detail',
            loadChildren: '../pages/appointment-detail/appointment-detail.module#AppointmentDetailPageModule'
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: '../pages/settings/settings.module#SettingsPageModule'
          },
          {
            path: 'languages',
            loadChildren: '../pages/languages/languages.module#LanguagesPageModule'
          },
          {
            path: 'about',
            loadChildren: '../pages/about/about.module#AboutPageModule'
          },
          {
            path: 'tutorial',
            loadChildren: '../pages/tutorial/tutorial.module#TutorialPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/plan',
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
