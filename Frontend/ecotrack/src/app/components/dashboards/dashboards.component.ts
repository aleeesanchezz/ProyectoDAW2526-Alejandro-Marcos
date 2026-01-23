import { Component, ViewChild } from '@angular/core';
import { Co2ChartComponent } from '../co2-chart/co2-chart.component';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css']
})
export class DashboardsComponent {
  @ViewChild('co2Chart') co2Chart!: Co2ChartComponent;

  descargarPNG(): void {
    if (this.co2Chart) {
      this.co2Chart.descargarPNG();
    }
  }
}
