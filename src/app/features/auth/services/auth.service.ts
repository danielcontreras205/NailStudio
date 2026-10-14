import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

export interface AuthUser {
  usuarioId: number;
  usuarioUuid: string;
  usuarioUsuario: string;
  rolId: number | null;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly loginUrl = 'http://localhost:8080/api/v1/auntenticar/login';
  private readonly tokenKey = 'nailstudio.auth.token';
  private readonly userKey = 'nailstudio.auth.user';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, { username, password }).pipe(
      tap((response) => {
        sessionStorage.setItem(this.tokenKey, response.token);
        sessionStorage.setItem(this.userKey, JSON.stringify(response.user));
      })
    );
  }

  logout(): void {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.userKey);
  }
}
