import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Co2ChartComponent } from './co2-chart.component';
import { AuthServiceService } from '../../services/auth-service.service';
import { ConsumoService } from '../../services/consumo.service';

describe('Co2ChartComponent', () => {
  let component: Co2ChartComponent;
  let fixture: ComponentFixture<Co2ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Co2ChartComponent ],
      providers: [AuthServiceService, ConsumoService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Co2ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render chart container', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.graph-wrapper')).toBeTruthy();
  });

  it('should have descargarPNG method', () => {
    expect(component.descargarPNG).toBeDefined();
  });
});