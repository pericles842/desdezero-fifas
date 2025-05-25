import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { TasasDesdezero } from 'src/app/interfaces/RatesDesdezero';
import { Config } from 'src/app/models/config';
import { PayService } from 'src/app/service/pay.service';
import { ToastService } from 'src/app/service/toast.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrl: './config.component.css'
})
export class ConfigComponent {
  loading: boolean = false
  configuration_web: Config = new Config()
  tasas_web: TasasDesdezero[] = []

  constructor(
    private toastService: ToastService,
    private userService: UserService,
    private payService: PayService
  ) { }

  ngOnInit() {
    this.loading = true
    forkJoin(
      this.payService.getRatesDesdezero(),
      this.userService.getConfig()
    ).subscribe({
      next: ([rates, config]) => {
        this.tasas_web = rates
        this.configuration_web = Array.isArray(config.config) && config.config.length === 0 ? new Config() : config.config as Config
        this.loading = false
      },
      error: (err) => {
        this.toastService.error('', err)
        this.loading = false
      },
    })
  }

  createConfig() {
    //!VALIDAR CAMPOS
    this.loading = true
    this.userService.saveConfig(this.configuration_web).subscribe({
      next: (c) => {
        this.configuration_web = c
        this.loading = false
        this.toastService.success('Configuración actualizada exitosamente')
      },
      error: (err) => {
        this.loading = false
        this.toastService.error('', err)
      },
    })
  }


}
