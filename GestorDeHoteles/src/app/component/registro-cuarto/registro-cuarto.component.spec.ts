import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCuartoComponent } from './registro-cuarto.component';

describe('RegistroCuartoComponent', () => {
  let component: RegistroCuartoComponent;
  let fixture: ComponentFixture<RegistroCuartoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroCuartoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroCuartoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
