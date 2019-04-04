import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttentionPage } from './attention.page';

describe('AttentionPage', () => {
  let component: AttentionPage;
  let fixture: ComponentFixture<AttentionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttentionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttentionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
