import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaObjetivosComponent } from './lista-objetivos.component';

describe('ListaObjetivosComponent', () => {
  let component: ListaObjetivosComponent;
  let fixture: ComponentFixture<ListaObjetivosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaObjetivosComponent]
    });
    fixture = TestBed.createComponent(ListaObjetivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
