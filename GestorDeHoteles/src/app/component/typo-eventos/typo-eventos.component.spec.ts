import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypoEventosComponent } from './typo-eventos.component';

describe('TypoEventosComponent', () => {
  let component: TypoEventosComponent;
  let fixture: ComponentFixture<TypoEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypoEventosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypoEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
