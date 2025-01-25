import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-error',
    imports: [CommonModule],
    templateUrl: './error.component.html',
    styleUrl: './error.component.scss',
})
export class ErrorComponent {
    public title = input.required<string>();
    public subtitle = input.required<string>();
    public showHomeButton = input<boolean>(false);

    constructor(private router: Router, private cd: ChangeDetectorRef) {}

    public handleRedirect() {
        this.router.navigate(['/']).then(() => this.cd.detectChanges());
    }
}
