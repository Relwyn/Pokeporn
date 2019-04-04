import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FightPage } from './fight.page';

describe('FightPage', () => {
  let component: FightPage;
  let fixture: ComponentFixture<FightPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FightPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FightPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
