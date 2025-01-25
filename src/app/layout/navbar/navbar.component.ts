import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import {
    MatButtonToggleChange,
    MatButtonToggleModule,
} from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FavoritesService } from '../../core/services/favorites.service';
import { ToggleButtonsConfig } from './navbar.types';

@Component({
    selector: 'app-navbar',
    imports: [CommonModule, MatButtonToggleModule, MatIconModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnDestroy {
    public toggleButtonsConfig: ToggleButtonsConfig[] = [
        {
            value: '/home',
            icon: 'home',
            label: 'Início',
        },
        {
            value: '/favorites',
            icon: 'favorite',
            label: 'Favoritos',
        },
    ];
    private subscriptions: Subscription[] = [];
    public favCounter: number = 0;

    constructor(
        private router: Router,
        private cd: ChangeDetectorRef,
        private favoritesService: FavoritesService
    ) {
        const getFavCounter$ = this.favoritesService.favorites$.subscribe(
            (favorites) => {
                this.favCounter = favorites.length;
            }
        );

        this.subscriptions.push(getFavCounter$);
    }

    public handleToggleChange($event: MatButtonToggleChange) {
        this.router
            .navigate([$event.value])
            .then(() => this.cd.detectChanges());
    }

    public isActive(button: ToggleButtonsConfig) {
        return this.router.url === button.value;
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) =>
            subscription.unsubscribe()
        );
    }
}
