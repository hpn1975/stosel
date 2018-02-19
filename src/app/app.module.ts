//Import all core Modules
import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './material-module/material.module';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

//Import all app Modules
import { AppRoutingModule } from './app-routing.module';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

//Import components.
import { AppComponent } from './app.component';

//Import Services.
import {
  FetchDataService,
  AuthGuardService,
  NonAuthGuardService,
  XsrfService, AppStateService
} from './services';

export function jwtOptionsFactory(tokenService) {
  return {
    tokenGetter: () => {
      return localStorage.getItem('token');
    },
    whitelistedDomains: () => { return ['localhost:8050'] }
  }
};

export function startServiceFactory(ss: XsrfService): () => Promise<any> {
  return () => ss.load();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-CSRFToken',
    }),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [XsrfService]
      }
    })
    //  NgbModule.forRoot()
  ],
  providers: [
    FetchDataService,
    AuthGuardService,
    NonAuthGuardService,
    {
      provide: APP_INITIALIZER,
      useFactory: startServiceFactory,
      deps: [XsrfService],
      multi: true
    },
    XsrfService, AppStateService, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
