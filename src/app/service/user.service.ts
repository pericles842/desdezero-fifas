import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  /**
   * Authenticates a user with the provided login credentials.
   * 
   * @param {Object} login - An object containing the user's login credentials.
   * @param {string} login.correo - The email address of the user.
   * @param {string} login.password - The password of the user.
   * @returns {Observable<Object>} An observable that emits the authentication response containing the user's name and token.
   * 
   * @example
   * this.auth({ correo: 'user@example.com', password: 'password123' }).subscribe({
   *   next: (res) => console.log(res),
   *   error: (err) => console.error(err)
   * });
   */

  auth(login: { correo: string, password: string }): Observable<{ nombre: string, token: string }> {
    let body = { user: login }
    return this.http.post<{ nombre: string, token: string }>(`${environment.host}/user/auth`, body)
  }
  /**
   * Elimina la cookie de inicio de sesión y redirige al usuario a la página principal
   */
  logout() {
    this.deleteCookie('user')
    this.router.navigate(['/']);
  }

  /**
   * Crea una cookie con el nombre especificado y el valor
   *
   * @param {string} key - El nombre de la cookie
   * @param {string} value - El valor de la cookie
   * @param {number} hours - El número de horas que la cookie debe ser válida
   *
   * @example
   * this.createCookie('name', 'John Doe', 2);
   * La cookie se creará con el nombre "name" y el valor "John Doe"
   * y caducará en 2 horas
   */
  createCookie(key: string, value: string, hours: number) {
    const expirationDate = new Date();

    // Calcula la fecha de expiración sumando las horas
    expirationDate.setTime(expirationDate.getTime() + (hours * 60 * 60 * 1000));

    // Formatea la fecha de expiración
    const expires = "; expires=" + expirationDate.toUTCString();

    document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value) + expires + '; path=/';
  }

  /**
   * Obtiene el valor de una cookie por su nombre
   *
   * @param {string} name - El nombre de la cookie a obtener
   * @returns {Object | null} El valor de la cookie como un objeto si se encuentra, de lo contrario, null
   *
   * @example
   * const user = this.getCookie('user');
   * if (user) {
   *   console.log(user.nombre);
   * }
   */

  getCookie(name: string): Object | null {
    const decodedKey = decodeURIComponent(name);
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());

    for (const cookie of cookies) {
      const [cookieKey, cookieValue] = cookie.split('=').map(cookiePart => cookiePart.trim());
      if (cookieKey === decodedKey) {
        return JSON.parse(decodeURIComponent(cookieValue));
      }
    }

    return null;
  }

  /**
   * Elimina una cookie por su nombre
   *
   * @param {string} key - El nombre de la cookie a eliminar
   *
   * @example
   * this.deleteCookie('user');
   */
  deleteCookie(key: string) {
    document.cookie = encodeURIComponent(key) + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
}
