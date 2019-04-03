import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalPage } from './normal.page';

describe('NormalPage', () => {
  let component: NormalPage;
  let fixture: ComponentFixture<NormalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
