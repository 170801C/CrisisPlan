import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticalPage } from './critical.page';

describe('CriticalPage', () => {
  let component: CriticalPage;
  let fixture: ComponentFixture<CriticalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriticalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriticalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
