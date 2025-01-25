import { CommonModule } from '@angular/common';
import { Component, input, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { FavoritesService } from '../../../core/services/favorites.service';
import { Character } from '../../types/response.type';

@Component({
    selector: 'app-card',
    imports: [CommonModule, MatIconModule],
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss',
})
export class CardComponent implements OnDestroy {
    public data = input.required<Character>();
    private favorites: Character[] = [];
    private subscriptions: Subscription[] = [];

    constructor(private favoritesService: FavoritesService) {
        const getFavorites$ = this.favoritesService.getFavorites().subscribe({
            next: (favorites) => {
                this.favorites = favorites;
            },
            error: (error) =>
                console.error('failed while trying get favorites:', error),
        });

        this.subscriptions.push(getFavorites$);
    }

    public handleFavoriteClick() {
        if (this.isFavorite()) {
            this.removeFromFavorites();
            return;
        }

        this.addToFavorites();
    }

    public getFavoriteIcon() {
        return this.isFavorite() ? 'favorite' : 'favorite_outline';
    }

    private addToFavorites() {
        this.favoritesService.addFavorite(this.data());
    }

    private removeFromFavorites() {
        this.favoritesService.removeFavorite(this.data());
    }

    public isFavorite() {
        return this.favorites.some((fav) => fav.id === this.data().id);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) =>
            subscription.unsubscribe()
        );
    }
}
