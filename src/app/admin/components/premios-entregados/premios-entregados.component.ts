import { Component, ElementRef, ViewChild } from '@angular/core';
import { Awards } from 'src/app/models/rifa.model';
import { RifasService } from 'src/app/service/rifas.service';
import { ToastService } from 'src/app/service/toast.service';
import { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-premios-entregados',
  templateUrl: './premios-entregados.component.html',
  styleUrl: './premios-entregados.component.css'
})
export class PremiosEntregadosComponent {
  loading: boolean = false
  visible: boolean = false

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  selectedFile: File | null = null;
  selectedFileName: string | null = null;

  premio: Awards = new Awards()
  premios: Awards[] = []

  constructor(
    private toastService: ToastService,
    private rifasService: RifasService
  ) { }

  ngOnInit(): void {
    this.loading = true
    this.rifasService.listAwards().subscribe({
      next: (value) => {
        this.premios = value
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.toastService.error('', err)
      }
    })
  }

  showDialog() {
    this.premio = new Awards()
    this.selectedFileName = ''
    this.visible = true;
  }

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

  closeModal() {
    this.visible = false
    this.selectedFileName = ''
    this.selectedFile = null
    this.fileInput.nativeElement.value = '';
  }
  createPremio() {
    if (!this.validateAwards()) return
    this.loading = true

    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    formData.append('premio', JSON.stringify(this.premio))

    this.rifasService.createAward(formData as any).subscribe({
      next: (value) => {
        if (this.premio.id == 0) this.premios.push(value)
        this.toastService.success('Premio entregado exitosamente')
        this.loading = false
        this.closeModal()
      }, error: (err) => {
        this.loading = false
        this.toastService.error('', err)
      }
    })
  }

  validateAwards() {
    let valid = true

    if (!this.premio.nombre_ganador) {
      this.toastService.error('El nombre del ganador es requerido')
      valid = false
    }

    if (!this.premio.nombre_rifa) {
      this.toastService.error('El nombre de la rifa es requerido')
      valid = false
    }

    if (!/^\d+$/.test(this.premio.tike_ganador)) {
      this.toastService.error('El ticket no puede tener letras, solo números')
      valid = false
    }

    if (!this.selectedFileName) {
      this.toastService.error('Seleccione una imagen para el método de pago')
      valid = false
    }

    return valid
  }
  setPremio(premio: Awards) {
    this.premio = premio
    this.selectedFileName = premio.url.split('/')[premio.url.split('/').length - 1].toString()
    this.visible = true
  }

  deletePremio(id: number) {
    this.toastService.confirm('Seguro desea eliminar el premio', '').then((res: SweetAlertResult) => {
      if (res.isConfirmed) {
        this.loading = true
        this.rifasService.deleteAwards(id).subscribe({
          next: (value) => {
            let index = this.premios.findIndex(p => p.id == id)
            this.premios.splice(index, 1)
            this.loading = false
            this.toastService.success('Premio eliminado exitosamente')
          },
          error: (err) => {
            this.loading = false
            this.toastService.error('', err)
          },
        })
      }
    })
  }
}
