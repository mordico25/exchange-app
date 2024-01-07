import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConverterComponent } from './components/converter/converter.component';
import { AboutComponent } from './components/about/about.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ConverterService } from './services/converter.service';
import { Mock } from './models/Mock';
import { ExchangeResponse } from './models/ExchangeResponse';






function appInitializer(converterService: ConverterService) {
  return async () => converterService.Init().then(async (res) => {
    if (res) {
      converterService.exchangeValues = res as ExchangeResponse;
      if (converterService.exchangeValues.success && converterService.exchangeValues.rates) {
        Object.keys(converterService.exchangeValues.rates).forEach(key => {
          converterService.currencyTypes.push(key);
        })
      }
    }
  }).catch(error => {
    console.error("ERROR on appInitializer :", error)
    converterService.exchangeValues = Mock;
    Object.keys(converterService.exchangeValues.rates).forEach(key => {
      converterService.currencyTypes.push(key);
    })
  })
}


@NgModule({
  declarations: [
    AppComponent,
    ConverterComponent,
    AboutComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      deps: [ConverterService],
      multi: true
    },
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
