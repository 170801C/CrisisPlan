import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymptomsModalPage } from './symptoms-modal.page';

describe('SymptomsModalPage', () => {
  let component: SymptomsModalPage;
  let fixture: ComponentFixture<SymptomsModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymptomsModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymptomsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
