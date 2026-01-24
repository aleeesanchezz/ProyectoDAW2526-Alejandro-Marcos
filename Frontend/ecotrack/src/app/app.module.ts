import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';
import { RegistrarConsumoComponent } from './components/registrar-consumo/registrar-consumo.component';
import { combineLatest } from 'rxjs';
import { HistorialConsumoComponent } from './components/historial-consumo/historial-consumo.component';
import { MenuUsuarioComponent } from './components/menu-usuario/menu-usuario.component';
import { AyudaPasswordComponent } from './components/ayuda-password/ayuda-password.component';
import { ReiniciarPasswordComponent } from './components/reiniciar-password/reiniciar-password.component';
import { ModificarConsumoComponent } from './components/modificar-consumo/modificar-consumo.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { VerificarCodigoComponent } from './components/verificar-codigo/verificar-codigo.component';
import { DashboardsComponent } from './components/dashboards/dashboards.component';
import { RegistrarObjetivoComponent } from './components/registrar-objetivo/registrar-objetivo.component';
import { ListaObjetivosComponent } from './components/lista-objetivos/lista-objetivos.component';
import { Co2ChartComponent } from './components/co2-chart/co2-chart.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'usuarios/registrar', component: RegistrarUsuarioComponent},
  {path: 'inicio', component: PaginaPrincipalComponent},
  {path: 'registrar-consumo', component: RegistrarConsumoComponent},
  {path: 'historial-consumo', component: HistorialConsumoComponent},
  {path: 'menu-usuario', component: MenuUsuarioComponent},
  {path: 'ayuda-password', component: AyudaPasswordComponent},
  {path: 'reiniciar-password', component: ReiniciarPasswordComponent},
  {path: 'modificar-consumo', component: ModificarConsumoComponent},
  {path: 'verificar-codigo', component: VerificarCodigoComponent} ,
  {path: 'registrar-objetivo', component: RegistrarObjetivoComponent},
  {path: 'lista-objetivos', component: ListaObjetivosComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrarUsuarioComponent,
    PaginaPrincipalComponent,
    RegistrarConsumoComponent,
    HistorialConsumoComponent,
    MenuUsuarioComponent,
    AyudaPasswordComponent,
    ReiniciarPasswordComponent,
    ModificarConsumoComponent,
    NavbarComponent,
    FooterComponent,
    VerificarCodigoComponent,
    DashboardsComponent,
    RegistrarObjetivoComponent,
    ListaObjetivosComponent,
    Co2ChartComponent,  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
