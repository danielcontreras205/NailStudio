import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Router, provideRouter } from '@angular/router';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
    .compileComponents();

    sessionStorage.clear();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
    sessionStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit credentials, store the session and navigate to the workspace', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    component.username = '  studioUser  ';
    component.password = 'secret';

    component.login();

    const request = httpTestingController.expectOne('http://localhost:8080/api/v1/auntenticar/login');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ username: 'studioUser', password: 'secret' });
    request.flush({
      token: 'test-token',
      user: {
        usuarioId: 2,
        usuarioUuid: 'user-uuid',
        usuarioUsuario: 'studioUser',
        rolId: null
      },
      message: 'Login correcto'
    });

    expect(sessionStorage.getItem('nailstudio.auth.token')).toBe('test-token');
    expect(sessionStorage.getItem('nailstudio.auth.user')).toContain('studioUser');
    expect(navigateSpy).toHaveBeenCalledWith(['/auth/workspace']);
    expect(component.isLoading).toBeFalse();
  });

  it('should show a clear message when the API rejects the credentials', () => {
    component.username = 'studioUser';
    component.password = 'incorrect';
    component.login();

    const request = httpTestingController.expectOne('http://localhost:8080/api/v1/auntenticar/login');
    request.flush({}, { status: 403, statusText: 'Forbidden' });

    expect(component.errorMessage).toContain('Revisa tu usuario y contraseña');
    expect(component.isLoading).toBeFalse();
  });
});
