import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  showPassword = false;
  isLoading = false;
  errorMessage = '';
  readonly currentYear = new Date().getFullYear();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    if (this.isLoading) {
      return;
    }

    const username = this.username.trim();
    if (!username || !this.password) {
      this.errorMessage = 'Escribe tu usuario y contraseña para continuar.';
      return;
    }

    this.errorMessage = '';
    this.isLoading = true;

    this.authService.login({ username, password: this.password }).subscribe({
      next: () => {
        this.isLoading = false;
        void this.router.navigate(['/auth/workspace']);
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        if (error.status === 403) {
          this.errorMessage = 'No pudimos validar tus datos. Revisa tu usuario y contraseña e inténtalo de nuevo.';
        } else if (error.status === 0) {
          this.errorMessage = 'No fue posible conectar con el servidor. Verifica que el servicio esté disponible e inténtalo de nuevo.';
        } else {
          this.errorMessage = 'Ocurrió un problema al iniciar sesión. Inténtalo de nuevo en un momento.';
        }
      }
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}