import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantPage } from './important.page';

describe('ImportantPage', () => {
  let component: ImportantPage;
  let fixture: ComponentFixture<ImportantPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
