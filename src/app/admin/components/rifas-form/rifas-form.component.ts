import { Component } from '@angular/core';
import { Rifa } from 'src/app/models/rifa.model';
import { RifasService } from 'src/app/service/rifas.service';
import { ToastService } from 'src/app/service/toast.service';
import { SweetAlertResult } from 'sweetalert2';


@Component({
  selector: 'app-rifas-form',
  templateUrl: './rifas-form.component.html',
  styleUrl: './rifas-form.component.css'
})
export class RifasFormComponent {
  loading: boolean = false
  rifa: Rifa = new Rifa()
  selectedFile: File | null = null;
  selectedFileName: string | null = null;
  visible: boolean = false;

  listRaffle!: Rifa[]

  constructor(
    private rifasService: RifasService,
    private toastService: ToastService
  ) { }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name;
    } else {
      this.selectedFile = null;
      this.selectedFileName = null;
    }
  }
  /**
   * Crea una rifa con los datos de la forma.
   * Antes de crear la rifa, se valida que los campos est n
   * correctos. Si no es as , no se crea la rifa.
   * Si se seleccion  un archivo de im gen, se incluye en la
   * petici n. Luego se llama al servicio para crear la rifa.
   * Si la creaci n es exitosa, se muestra un mensaje de
   *  xito. Si no, no se muestra nada.
   */
  createRaffle() {
    if (!this.validateForm()) return
    this.loading = true

    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    formData.append('rifa', JSON.stringify(this.rifa))

    this.rifasService.createRaffle(formData as any).subscribe({
      next: (value) => {

        if (this.rifa.id == 0) {
          this.toastService.success('Rifa creada exitosamente')
          this.listRaffle.push(value)
        } else {
          let index = this.listRaffle.findIndex(r => r.id == value.id)
          this.listRaffle[index] = value
          this.toastService.success('Rifa Guardada exitosamente')
        }

        this.loading = false
        this.visible = false
      },
      error: (err) => {
        this.loading = false
        this.toastService.error(err, 'Error al crear la rifa')
      },
    })
  }

  ngOnInit() {
    this.loading = true
    this.rifasService.listRaffle().subscribe({
      next: (res) => {
        this.listRaffle = res
        this.loading = false
      },
      error: (err) => {
        this.toastService.error(err, 'Error al listar rifas')
        this.loading = false
      },
    })
  }
  /**
   * Valida la forma de creaci n de rifas.
   * Verifica que los campos obligatorios est n
   * correctamente definidos. Si hay algn campo incorrecto,
   * se muestra un mensaje de error y se devuelve false.
   * Si todos los campos est n correctos, se devuelve true.
   * @returns {boolean} true si la forma es v lida, false de lo contrario.
   */
  validateForm(): boolean {
    let pass = true

    if (!this.rifa) {
      this.toastService.error('Rifa no definida');
      pass = false;
    } else {
      if (!this.rifa.nombre.trim()) {
        this.toastService.error('El nombre de la rifa es obligatorio');
        pass = false;
      }
      if (!this.rifa.descripcion.trim()) {
        this.toastService.error('La descripción de la rifa es obligatoria');
        pass = false;
      }
      if (!this.rifa.fecha_fin) {
        this.toastService.error('La fecha de finalización es obligatoria');
        pass = false;
      }
      if (this.rifa.precio <= 0) {
        this.toastService.error('El precio del ticket debe ser mayor a cero');
        pass = false;
      }
      if (this.rifa.objetivo_ventas <= 0) {
        this.toastService.error('El objetivo de ventas debe ser mayor a cero');
        pass = false;
      }
      if (!this.selectedFileName) {
        this.toastService.error('Seleccione una imagen');
        pass = false;
      }
    }
    return pass
  }

  showDialog() {
    this.rifa = new Rifa()
    this.selectedFileName = ''
    this.visible = true;
  }

  setRaffle(raflle: Rifa) {

    this.rifa = raflle
    this.selectedFileName = raflle.url_img.split('/')[raflle.url_img.split('/').length - 1].toString()

    const date = new Date(this.rifa.fecha_fin).toLocaleDateString('en-CA')

    this.rifa.fecha_fin = date
    this.visible = true;
  }

  activateRaffle(id: number) {
    this.loading = true
    this.rifasService.activeRaffle(id).subscribe({
      next: (res) => {
        const index = this.listRaffle.findIndex(r => r.id == res.id)
        this.listRaffle.map(r => r.status = 'no_activa')
        if (index >= 0) this.listRaffle[index] = res
        this.toastService.success('Rifa activada exitosamente')
        this.loading = false
      }, error: (err) => {
        this.loading = false
        this.toastService.error('', err)
      }
    })
  }

  deleteRaffle(id: number) {
    //this.loading = true
    this.toastService.confirm('Seguro desea eliminar la rifa', '').then((res: SweetAlertResult) => {
      if (res.isConfirmed) {
        this.rifasService.deleteRaffle(id).subscribe({
          next: (res) => {
            let index = this.listRaffle.findIndex(r => r.id == id)
            if (index >= 0) this.listRaffle.splice(index, 1)
            this.toastService.success('Rifa eliminada exitosamente')
          },
          error: (err) => {
            this.toastService.error('', err)
          }
        })
      }
    })
  }
}
