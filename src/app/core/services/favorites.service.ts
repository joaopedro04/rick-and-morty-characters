import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from '../../shared/types/response.type';

@Injectable({
    providedIn: 'root',
})
export class FavoritesService {
    /*
        I've decide to use a BehaviorSubject to store the favorites instead of
        install a state management library like NgRx. This is because the application is
        simple and the state management is not complex and installing it would increase
        the project complexity. If the application grows, I would consider use NgRx or
        another state management library.
    */
    private readonly favoritesSubject = new BehaviorSubject<Character[]>([]);
    favorites$ = this.favoritesSubject.asObservable();

    getFavorites() {
        return this.favorites$;
    }

    addFavorite(character: Character) {
        const currentFavorites = this.favoritesSubject.value;
        this.favoritesSubject.next([...currentFavorites, character]);
    }

    removeFavorite(character: Character) {
        const currentFavorites = this.favoritesSubject.value;
        this.favoritesSubject.next(
            currentFavorites.filter((fav) => fav.id !== character.id)
        );
    }

    deleteFavorites() {
        this.favoritesSubject.next([]);
    }
}
