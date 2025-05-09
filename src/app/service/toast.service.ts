import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  show(title: string, text: string, icon: 'success' | 'error' | 'warning' | 'info' | 'question', options: any = {}) {
    return Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: 'Aceptar',
      ...options   
    });
  }

  success(title:string, message: string = '') {
    return this.show(title, message, 'success', {
      timer: 2000,
      showConfirmButton: false
    });
  }
  error(message: string, title = 'Oops...') {

    return this.show(title, message, 'error');
  }

  warning(message: string, title = '¡Cuidado!') {
    return this.show(title, message, 'warning');
  }

  
  confirm(
    title: string,
    text: string,
    confirmButtonText = 'Sí',
    cancelButtonText = 'No'
  ): Promise<SweetAlertResult> {
    return Swal.fire({
      title,
      text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText
    });
  }
}
