import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserService } from './service/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtener el token de AuthService
    const user = this.userService.getCookie('user') as any;

    // Si el token existe, clonar la petición y añadir el encabezado Authorization
    if (user) {
      const clonedRequest = req.clone({
        setHeaders: {
          authorization: `Bearer ${user.token}`
        }
      });

      // Pasar la solicitud clonada a la siguiente etapa
      return next.handle(clonedRequest);
    }
    // Si no hay token, continuar con la solicitud sin modificarla
    return next.handle(req);
  }
}
