import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* clases  */
import { AppRoutingModule } from './app-routing.module';
/* components  */
import { AppComponent } from './app.component';
/* servicios  */
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
