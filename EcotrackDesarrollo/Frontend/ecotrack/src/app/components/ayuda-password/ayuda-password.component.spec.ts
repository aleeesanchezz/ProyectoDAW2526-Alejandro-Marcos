import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AyudaPasswordComponent } from './ayuda-password.component';

describe('AyudaPasswordComponent', () => {
  let component: AyudaPasswordComponent;
  let fixture: ComponentFixture<AyudaPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AyudaPasswordComponent]
    });
    fixture = TestBed.createComponent(AyudaPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
