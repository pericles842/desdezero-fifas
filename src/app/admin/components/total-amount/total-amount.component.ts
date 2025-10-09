import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TasasDesdezero } from 'src/app/interfaces/RatesDesdezero';
import { PayMethod } from 'src/app/models/pay_method';
import { Rifa } from 'src/app/models/rifa.model';
import { User } from 'src/app/models/user.model';
import { returnDollarForBs } from 'src/app/utils/calculatePriceDollar';

@Component({
  selector: 'app-total-amount',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './total-amount.component.html',
  styleUrl: './total-amount.component.css',
})
export class TotalAmountComponent {
  @Input() user: User = new User();
  @Input() rifa: Rifa = new Rifa();
  @Input() paymentMethod: PayMethod = new PayMethod();
  @Input() dollar!: TasasDesdezero;

  returnDollarForBs = returnDollarForBs;
}
