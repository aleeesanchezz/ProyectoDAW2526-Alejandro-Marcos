import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReiniciarPasswordComponent } from './reiniciar-password.component';

describe('ReiniciarPasswordComponent', () => {
  let component: ReiniciarPasswordComponent;
  let fixture: ComponentFixture<ReiniciarPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReiniciarPasswordComponent]
    });
    fixture = TestBed.createComponent(ReiniciarPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
