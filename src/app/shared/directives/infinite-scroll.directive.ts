import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
    selector: '[appInfiniteScroll]',
})
export class InfiniteScrollDirective {
    @Output() scrolled = new EventEmitter<void>();

    private observer: IntersectionObserver;

    constructor(private el: ElementRef) {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.scrolled.emit();
                }
            });
        });
    }

    ngOnInit() {
        this.observer.observe(this.el.nativeElement);
    }

    ngOnDestroy() {
        this.observer.disconnect();
    }
}
