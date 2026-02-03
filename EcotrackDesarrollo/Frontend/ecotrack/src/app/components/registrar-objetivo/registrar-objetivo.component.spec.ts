import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarObjetivoComponent } from './registrar-objetivo.component';

describe('RegistrarObjetivoComponent', () => {
  let component: RegistrarObjetivoComponent;
  let fixture: ComponentFixture<RegistrarObjetivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarObjetivoComponent]
    });
    fixture = TestBed.createComponent(RegistrarObjetivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
