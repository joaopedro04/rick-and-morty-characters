import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
    catchError,
    debounceTime,
    distinctUntilChanged,
    of,
    Subscription,
    switchMap,
} from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { CardsListComponent } from '../../shared/components/cards-list/cards-list.component';
import { ErrorComponent } from '../../shared/components/error/error.component';
import { InfiniteScrollDirective } from '../../shared/directives/infinite-scroll.directive';
import { CharacterResponse } from '../../shared/types/response.type';

const DEBOUNCE_TIME_VALUE = 300;

@Component({
    selector: 'app-home',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ErrorComponent,
        CardsListComponent,
        InfiniteScrollDirective,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent implements OnDestroy {
    public response: CharacterResponse | undefined = undefined;
    public searchControl = new FormControl('');
    private lastPage = 1;
    private nextPage!: number;
    private data$ = this.searchControl.valueChanges.pipe(
        debounceTime(DEBOUNCE_TIME_VALUE),
        distinctUntilChanged(),
        switchMap((value) => {
            this.lastPage = 1;
            this.nextPage = 0;
            return this.getData(value!, this.lastPage);
        })
    );
    private subscriptions: Subscription[] = [];

    constructor(private apiService: ApiService) {
        const getData$ = this.data$.subscribe({
            next: (response) => {
                this.response = response;
            },
            error: (error) =>
                console.error('failed while trying get data:', error),
        });
        this.subscriptions.push(getData$);
    }

    private getData(name: string, page: number = 1) {
        if (name.trim() === '') {
            return of(undefined);
        }
        this.lastPage = page;
        this.nextPage = this.lastPage + 1;

        if (this.response && this.response.info.pages < this.lastPage) {
            this.lastPage = 1;
            this.nextPage = 0;
            return of(undefined);
        }

        return this.apiService
            .getCharacters(name, page)
            .pipe(catchError(() => of(undefined)));
    }

    public loadMore() {
        const getMore$ = this.getData(
            this.searchControl.value!,
            this.nextPage
        ).subscribe({
            next: (response) => {
                if (response && this.response) {
                    this.response.results = [
                        ...this.response.results,
                        ...response.results,
                    ];
                }
            },
            error: (error) =>
                console.error('failed while trying get more:', error),
        });

        this.subscriptions.push(getMore$);
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) =>
            subscription.unsubscribe()
        );
    }
}
