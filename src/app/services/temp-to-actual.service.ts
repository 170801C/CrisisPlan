import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { SymptomsService } from './symptoms.service';
import { ContactService } from './contact.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TempToActualService implements Resolve<any> {

  constructor(private contactService: ContactService, private symptomsService: SymptomsService, private router: Router) { }

  resolve() {
    console.log("Resolver activated")

    this.contactService.tempToActual().then(() => {
      this.symptomsService.tempToActual().then(() => {
        this.contactService.deleteTempContact().then(() => {
          this.symptomsService.deleteTempPlan();
        })
      })
    })
  }
}

