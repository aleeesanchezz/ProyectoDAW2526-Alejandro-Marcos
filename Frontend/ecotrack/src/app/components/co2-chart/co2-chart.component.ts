import { Component, OnInit, ViewChild, ElementRef, OnDestroy, HostListener } from "@angular/core";
import ApexCharts from "apexcharts";
import { AuthServiceService } from "../../services/auth-service.service";
import { ConsumoService } from "../../services/consumo.service";

@Component({
  selector: "app-co2-chart",
  templateUrl: "./co2-chart.component.html",
  styleUrls: ["./co2-chart.component.css"]
})
export class Co2ChartComponent implements OnInit, OnDestroy {
  @ViewChild("chartContainer") chartContainer!: ElementRef;
  private chart: ApexCharts | any = null;
  private chartHeight: number = 450;

  constructor(
    private authService: AuthServiceService,
    private consumoService: ConsumoService
  ) {
    this.chartHeight = this.obtenerAlturaSegunPantalla();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    const newHeight = this.obtenerAlturaSegunPantalla();
    if (newHeight !== this.chartHeight) {
      this.chartHeight = newHeight;
      if (this.chart) {
        this.chart.updateOptions({
          chart: {
            height: this.chartHeight
          }
        });
      }
    }
  }

  private obtenerAlturaSegunPantalla(): number {
    const width = window.innerWidth;
    
    if (width <= 480) {
      return 280;
    } else if (width <= 768) {
      return 320;
    } else if (width <= 1024) {
      return 380;
    } else {
      return 450;
    }
  }

  ngOnInit(): void {
    this.cargarGrafico();
  }

  private cargarGrafico(): void {
    const usuario = this.authService.getUsuario();
    
    if (!usuario || !usuario.id) {
      console.error("No hay usuario autenticado");
      return;
    }

    this.consumoService.obtenerListas(usuario.id).subscribe({
      next: (consumos) => {
        this.mostrarGrafico(consumos);
      },
      error: (error) => {
        console.error("Error cargando consumos:", error);
      }
    });
  }

  private mostrarGrafico(consumos: any[]): void {
    const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun",
                   "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    
    // Agrupar CO2 por mes
    const co2PorMes = new Array(12).fill(0);
    
    consumos.forEach(consumo => {
      if (consumo.fecha && consumo.co2) {
        const fecha = new Date(consumo.fecha);
        const mesIndex = fecha.getMonth();
        co2PorMes[mesIndex] += consumo.co2;
      }
    });

    const options: ApexCharts.ApexOptions = {
      series: [{
        name: "CO2 Generado (kg)",
        data: co2PorMes
      }],
      chart: {
        type: "bar",
        height: this.chartHeight,
        toolbar: { 
          show: false
        }
      },
      colors: ["#4CAF50"],
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: "75%"
        }
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: meses,
        title: { 
          text: "Mes",
          style: {
            color: "#2E7D32",
            fontSize: "14px",
            fontWeight: "bold"
          }
        },
        labels: {
          rotate: -90,
          rotateAlways: true,
          maxHeight: 100,
          style: {
            fontSize: "14px",
            fontWeight: "700",
            colors: "#2E7D32"
          }
        }
      },
      yaxis: {
        title: { 
          text: "CO2 Generado (kg)",
          style: {
            color: "#2E7D32",
            fontSize: "14px",
            fontWeight: "bold"
          }
        },
        labels: {
          style: {
            fontSize: "13px",
            fontWeight: "600",
            colors: "#2E7D32"
          }
        }
      },
      tooltip: {
        theme: "light"
      }
    };

    if (this.chart) {
      this.chart.destroy();
    }

    if (this.chartContainer) {
      this.chart = new ApexCharts(this.chartContainer.nativeElement, options);
      this.chart.render();
      
      // Aplicar locale después de renderizar
      ApexCharts.exec("co2-chart", "setLocale", {
        name: "es",
        options: {
          months: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
          shortMonths: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
          days: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
          shortDays: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
          toolbar: {
            download: "Descargar PNG",
            selection: "Seleccionar",
            selectionZoom: "Zoom",
            zoomIn: "Zoom in",
            zoomOut: "Zoom out",
            pan: "Paneo",
            reset: "Reiniciar Zoom"
          }
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  descargarPNG(): void {
    if (this.chart) {
      this.chart.dataURI().then((result: any) => {
        const imgURI = result.imgURI;
        if (imgURI) {
          const link = document.createElement('a');
          link.href = imgURI;
          link.download = 'grafico-co2.png';
          link.click();
        }
      });
    }
  }
}
