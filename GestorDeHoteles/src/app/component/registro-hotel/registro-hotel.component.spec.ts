import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroHotelComponent } from './registro-hotel.component';

describe('RegistroHotelComponent', () => {
  let component: RegistroHotelComponent;
  let fixture: ComponentFixture<RegistroHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroHotelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
