import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SymptomsModalPage } from './symptoms-modal.page';

import { MzSelectModule } from 'ngx-materialize';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  {
    path: '',
    component: SymptomsModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MzSelectModule,
    // BrowserAnimationsModule
  ],
  declarations: [SymptomsModalPage]
})
export class SymptomsModalPageModule {}
