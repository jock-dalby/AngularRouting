import { MessageService } from './messages/message.service';
import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, NavigationError, NavigationCancel } from '@angular/router';

import { AuthService } from './user/auth.service';

@Component({
    selector: 'pm-app',
    templateUrl: './app/app.component.html'
})
export class AppComponent {
    pageTitle: string = 'Acme Product Management';

    loading: boolean = true;

    constructor(
        private router: Router,
        private authService: AuthService,
        private messageService: MessageService
    ) {
        router.events.subscribe((routerEvent) => {
            this.checkRouterEvent(routerEvent);
        });
    }

    checkRouterEvent(routerEvent: any): void {
        if (routerEvent instanceof NavigationStart) {
            this.loading = true;
        }

        if (routerEvent instanceof NavigationEnd ||
            routerEvent instanceof NavigationCancel ||
            routerEvent instanceof NavigationError) {
                this.loading = false;
            }
    }

    displayMessages(): void {
        this.router.navigate([{outlets: { popup: ['messages']}}]);
        this.messageService.isDisplayed = true;
    }

    hideMessages(): void {
        this.router.navigate([{outlets: { popup: null}}]);
        this.messageService.isDisplayed = false;
    }

    logOut(): void {
        this.authService.logout();
        console.log('Log out');
        this.router.navigateByUrl('/welcome');
    }
}
