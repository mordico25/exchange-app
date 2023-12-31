import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExchangeResponse } from '../models/ExchangeResponse';
import { firstValueFrom } from 'rxjs';
import { CurrencyPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  exchangeValues: ExchangeResponse | null = null;
  currencyTypes: string[] = [];
  history: { date: Date, value: any, from: string, to: string, amount: number }[] = [];
  lastValue:string|null='';
  ExchangeUrl: string = `https://api.exchangeratesapi.io/v1/latest?access_key=050beeaad0ad5cda72460c6758d5a11e&amp;format=1`
  constructor(private http: HttpClient,private currencyPipe:CurrencyPipe) {
   

  }
  async Init():Promise<any>{
    return await firstValueFrom(this.http.get(this.ExchangeUrl))   
  }
  exchange(amount: number, from: string, to: string) {
    if (this.exchangeValues?.success) {
      const fromVal = this.exchangeValues.rates[from];
      const toVal = this.exchangeValues.rates[to];
      if (fromVal && toVal && amount) {
        const value = (toVal / fromVal) * amount;
        if (!isNaN(value)) {
          const now = new Date();
          now.setSeconds(0);
          now.setMilliseconds(0);
          const currencyValue = `${amount} ${from} = ${value.toFixed(3)} ${to}` //this.currencyPipe.transform(value,to)
          if(!this.history.some(value=> value.amount==amount&&value.date==now&&value.from==from&&value.to==to)){
            const newValueForHistory = { date: now, value:currencyValue, from, to, amount }
            this.history.push(newValueForHistory)
            //this.currencyPipe.transform(amount,from)
            this.lastValue = currencyValue ;

            let lastHistory = JSON.parse(localStorage.getItem('history') as any);
            localStorage.setItem('history',JSON.stringify([...(lastHistory?lastHistory:[]),newValueForHistory]))

          }
          return value
        }
        else return '';
      }
      else return '';

    }
    else return null;
  }
}
