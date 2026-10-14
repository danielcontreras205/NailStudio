import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mainContent') mainContent!: ElementRef<HTMLElement>;

  readonly currentYear = new Date().getFullYear();
  menuOpen = false;

  private revealObserver?: IntersectionObserver;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    const revealItems = this.mainContent.nativeElement.querySelectorAll('.reveal');

    if (typeof IntersectionObserver === 'undefined') {
      revealItems.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    this.revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => this.revealObserver?.observe(item));
  }

  ngOnDestroy(): void {
    this.revealObserver?.disconnect();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  goToLogin(): void {
    this.closeMenu();
    this.router.navigate(['/auth/login']);
  }
}