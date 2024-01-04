import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConverterService } from '../../services/converter.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.scss',
  // changeDetection:ChangeDetectionStrategy.OnPush
})
export class ConverterComponent {

  constructor(private converterService:ConverterService){

  }
    
  from:string="";
  to:string="";
  public amount=1;
  public get base(){
    return this.converterService.exchangeValues?.base;
  }
  public get currencyTypes():string[]{
    return this.converterService.currencyTypes;
  };
  calc(){
    this.converterService.exchange(this.amount,this.from,this.to);
  }
  get convertedValue(){
    return this.converterService.lastValue;
  }
  get updateDate(){
    return this.converterService.exchangeValues?.date
  }
}
