import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProfilPage } from './list-profil.page';

describe('ListProfilPage', () => {
  let component: ListProfilPage;
  let fixture: ComponentFixture<ListProfilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProfilPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
