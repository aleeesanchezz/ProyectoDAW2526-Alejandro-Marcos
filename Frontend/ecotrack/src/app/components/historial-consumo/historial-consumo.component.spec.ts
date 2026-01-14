import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialConsumoComponent } from './historial-consumo.component';

describe('HistorialConsumoComponent', () => {
  let component: HistorialConsumoComponent;
  let fixture: ComponentFixture<HistorialConsumoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistorialConsumoComponent]
    });
    fixture = TestBed.createComponent(HistorialConsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
