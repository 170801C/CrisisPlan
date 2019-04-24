import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'plan', loadChildren: './pages/plan/plan.module#PlanPageModule' },
  { path: 'appointments', loadChildren: './pages/appointments/appointments.module#AppointmentsPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'symptoms-modal', loadChildren: './pages/symptoms-modal/symptoms-modal.module#SymptomsModalPageModule' },
  { path: 'critical', loadChildren: './pages/critical/critical.module#CriticalPageModule' },
  { path: 'contact', loadChildren: './pages/contact/contact.module#ContactPageModule' },
  { path: 'important', loadChildren: './pages/important/important.module#ImportantPageModule' },
  { path: 'normal', loadChildren: './pages/normal/normal.module#NormalPageModule' },
  { path: 'attention', loadChildren: './pages/attention/attention.module#AttentionPageModule' },  { path: 'add-appointment', loadChildren: './pages/add-appointment/add-appointment.module#AddAppointmentPageModule' },
  { path: 'edit-appointment', loadChildren: './pages/edit-appointment/edit-appointment.module#EditAppointmentPageModule' },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
