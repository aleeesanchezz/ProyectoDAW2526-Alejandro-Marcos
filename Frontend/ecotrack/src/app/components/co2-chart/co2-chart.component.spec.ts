import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApexChart, ApexAxisChartSeries, ApexXAxis, ApexTitleSubtitle, ApexDataLabels, ApexYAxis, ApexPlotOptions } from 'ng-apexcharts';

// Define el tipo para las opciones del gráfico (puedes ajustarlo según necesites)
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  colors: string[];
};

@Component({
  selector: 'app-co2-chart',
  templateUrl: './co2-chart.component.html',
  styleUrls: ['./co2-chart.component.css']
})
export class Co2ChartComponent implements OnInit {
  @ViewChild("chart") chart: any;
  public chartOptions: Partial<ChartOptions>; // Usar Partial para que no sea necesario definir todas las propiedades al inicio

  constructor(private http: HttpClient) {
    // Inicializar las opciones del gráfico con valores por defecto
    this.chartOptions = {
      series: [
        {
          name: "CO2 Ahorrado",
          data: []  // Se llenará con los datos del backend
        }
      ],
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: true
        }
        
      },
      colors: ["#4CAF50"],
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
          columnWidth: '70%'
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: []  // Se llenará con los meses
      },
      yaxis: {
        title: {
          text: "CO2 Ahorrado (kg)"
        }
      },
      title: {
        text: "CO2 Ahorrado Mensual",
        align: "center",
        style: {
          fontSize: "16px"
        }
      }
    };
  }

  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData(): void {
    // Ajusta la URL según tu endpoint en Spring Boot
    this.http.get<any>('http://localhost:8080/api/co2/mensual')
      .subscribe({
        next: (response) => {
          // Supongamos que la respuesta es un array de objetos: { mes: 'Enero', co2Ahorrado: 120 }
          const meses = response.map((item: any) => item.mes);
          const datos = response.map((item: any) => item.co2Ahorrado);

          // Actualizar el gráfico con los datos recibidos
          this.chartOptions.series = [{
            name: "CO2 Ahorrado",
            data: datos
          }];
          this.chartOptions.xaxis = {
            categories: meses
          };

          // Si necesitas forzar una actualización, puedes usar:
          if (this.chart && this.chart.updateOptions) {
            this.chart.updateOptions(this.chartOptions);
          }
        },
        error: (error) => {
          console.error('Error cargando los datos del gráfico:', error);
          // Puedes manejar el error aquí, por ejemplo, mostrar datos de ejemplo
          this.loadSampleData();
        }
      });
  }

  loadSampleData(): void {
    // Datos de ejemplo en caso de error
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'];
    const datos = [120, 150, 180, 90, 200, 170];

    this.chartOptions.series = [{
      name: "CO2 Ahorrado",
      data: datos
    }];
    this.chartOptions.xaxis = {
      categories: meses
    };
  }
}