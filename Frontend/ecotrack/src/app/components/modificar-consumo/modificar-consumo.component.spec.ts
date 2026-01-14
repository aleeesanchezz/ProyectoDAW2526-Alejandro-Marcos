import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarConsumoComponent } from './modificar-consumo.component';

describe('ModificarConsumoComponent', () => {
  let component: ModificarConsumoComponent;
  let fixture: ComponentFixture<ModificarConsumoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarConsumoComponent]
    });
    fixture = TestBed.createComponent(ModificarConsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
