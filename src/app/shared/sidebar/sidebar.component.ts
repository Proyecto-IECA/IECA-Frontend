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
                    { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
                    { path: '/user-profile', title: 'User Profile', icon: 'person', class: '' },
                    { path: '/vacancies', title: 'Lista de Vacantes', icon: 'list', class: '' },
                    { path: '/table-list', title: 'Table List', icon: 'content_paste', class: '' },
                    { path: '/favorites', title: 'Vacantes Favoritas', icon: 'favorite', class: '' },
                    { path: '/typography', title: 'Typography', icon: 'library_books', class: '' },
                    { path: '/icons', title: 'Icons', icon: 'bubble_chart', class: '' },
                    { path: '/maps', title: 'Maps', icon: 'location_on', class: '' },
                    { path: '/notifications', title: 'Notifications', icon: 'notifications', class: '' },
                    // { path: '/upgrade', title: 'Upgrade to PRO', icon: 'unarchive', class: 'active-pro' },
                ];
                break;

            case 'Empresa':
                ROUTES = [
                    { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
                    { path: '/company-profile', title: 'Company Profile', icon: 'person', class: '' },
                    { path: '/my-vacancies', title: 'Mis Vacantes', icon: 'assignment', class: '' },
                    { path: '/table-list', title: 'Table List', icon: 'content_paste', class: '' },
                    { path: '/maps', title: 'Maps', icon: 'location_on', class: '' },
                    { path: '/notifications', title: 'Notifications', icon: 'notifications', class: '' },
                    // { path: '/upgrade', title: 'Upgrade to PRO', icon: 'unarchive', class: 'active-pro' },
                ];
                break;

            default:
                console.log(`Tipo no encontrado`);
        }
    }
}
