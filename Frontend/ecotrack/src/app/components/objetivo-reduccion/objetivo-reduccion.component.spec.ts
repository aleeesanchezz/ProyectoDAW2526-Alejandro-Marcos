import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjetivoReduccionComponent } from './objetivo-reduccion.component';

describe('ObjetivoReduccionComponent', () => {
  let component: ObjetivoReduccionComponent;
  let fixture: ComponentFixture<ObjetivoReduccionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObjetivoReduccionComponent]
    });
    fixture = TestBed.createComponent(ObjetivoReduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
