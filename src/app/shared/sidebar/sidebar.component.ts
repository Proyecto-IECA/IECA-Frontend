import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export let ROUTES: RouteInfo[] = [];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];

    constructor() {
    }
    ngOnInit(): void {
        this.cargarRoutes();
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    cargarRoutes() {
        const tipo = localStorage.getItem('tipo_usuario');

        switch (tipo) {
            case 'Postulante':
                ROUTES = [
                    { path: '/dashboard', title: 'Inicio', icon: 'dashboard', class: '' },
                    { path: '/user-profile', title: 'Mi Perfil', icon: 'person', class: '' },
                    { path: '/vacancies', title: 'Lista de Vacantes', icon: 'list', class: '' },
                    { path: '/favorites', title: 'Vacantes Favoritas', icon: 'favorite', class: '' },
                    { path: '/my-postulations', title: 'Mis Postulaciones', icon: 'engineering', class: '' }
                    
                ];
                break;

            case 'Empresa':
                ROUTES = [
                    { path: '/dashboard', title: 'Inicio', icon: 'dashboard', class: '' },
                    { path: '/company-profile', title: 'Perfil de Empresa', icon: 'person', class: '' },
                    { path: '/my-vacancies', title: 'Mis Vacantes', icon: 'assignment', class: '' },
                ];
                break;

            default:
                console.log(`Tipo no encontrado`);
        }
    }
}
