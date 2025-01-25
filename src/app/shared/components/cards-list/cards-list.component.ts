import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Character } from '../../types/response.type';
import { CardComponent } from '../card/card.component';

@Component({
    selector: 'app-cards-list',
    imports: [CommonModule, CardComponent],
    templateUrl: './cards-list.component.html',
    styleUrl: './cards-list.component.scss',
})
export class CardsListComponent {
    public data = input.required<Character[]>();
}
