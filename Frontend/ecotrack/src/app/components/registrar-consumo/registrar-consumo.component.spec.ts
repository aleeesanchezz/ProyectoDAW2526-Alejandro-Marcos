import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarConsumoComponent } from './registrar-consumo.component';

describe('RegistrarConsumoComponent', () => {
  let component: RegistrarConsumoComponent;
  let fixture: ComponentFixture<RegistrarConsumoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarConsumoComponent]
    });
    fixture = TestBed.createComponent(RegistrarConsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
