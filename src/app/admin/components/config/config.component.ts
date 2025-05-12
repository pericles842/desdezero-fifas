import { Component } from '@angular/core';
import { Config } from 'src/app/models/config';
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

  constructor(
    private toastService: ToastService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loading = true
    this.userService.getConfig().subscribe({
      next: (config) => {

        this.configuration_web = config.length == 0 ? new Config() : config[0]
        this.loading = false
      },
      error: (err) => {
        this.toastService.error('', err)
        this.loading = false
      },
    })
  }

  createConfig() {
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
