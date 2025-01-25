import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FavoritesService } from '../../core/services/favorites.service';
import { CardsListComponent } from '../../shared/components/cards-list/cards-list.component';
import { ErrorComponent } from '../../shared/components/error/error.component';
import { Character } from '../../shared/types/response.type';

@Component({
    selector: 'app-favorites',
    imports: [CommonModule, ErrorComponent, CardsListComponent],
    templateUrl: './favorites.component.html',
    styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnDestroy {
    public favorites: Character[] = [];
    private subscriptions: Subscription[] = [];
    constructor(private favoritesService: FavoritesService) {
        const getFavorites$ = this.favoritesService.favorites$.subscribe({
            next: (favorites) => {
                this.favorites = favorites;
            },
            error: (error) =>
                console.error('failed while trying get favorites:', error),
        });

        this.subscriptions.push(getFavorites$);
    }

    public handleDeleteFavorites() {
        this.favoritesService.deleteFavorites();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) =>
            subscription.unsubscribe()
        );
    }
}
