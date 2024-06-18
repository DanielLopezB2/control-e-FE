import { Routes } from '@angular/router';
import { NavContentComponent } from './layout/nav-content/nav-content.component';
import { MainComponent } from './pages/main/main.component';
import { EstudiantesComponent } from './pages/estudiantes/estudiantes.component';
import { GruposComponent } from './pages/grupos/grupos.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { AsistenciaComponent } from './pages/asistencia/asistencia.component';
import { CalificacionesComponent } from './pages/calificaciones/calificaciones.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';
import { IncidenciasComponent } from './pages/incidencias/incidencias.component';
import { ActividadesComponent } from './pages/actividades/actividades.component';
import { AreasAsignaturasComponent } from './pages/areas-asignaturas/areas-asignaturas.component';

export const routes: Routes = [
    { path: 'index', pathMatch: 'full', redirectTo: '/index/main' },
    { path: '', pathMatch: 'full', redirectTo: '/index/main' },
    {
        path: 'index', component: NavContentComponent, children: [
            { path: 'main', component: MainComponent },
            { path: 'areas', component: AreasAsignaturasComponent },
            { path: 'estudiantes', component: EstudiantesComponent },
            { path: 'grupos', component: GruposComponent },
            { path: 'usuarios', component: UsuariosComponent },
            { path: 'asistencia', component: AsistenciaComponent },
            { path: 'actividades', component: ActividadesComponent },
            { path: 'calificaciones', component: CalificacionesComponent },
            { path: 'estadisticas', component: EstadisticasComponent },
            { path: 'incidencias', component: IncidenciasComponent },
    ] },
];
