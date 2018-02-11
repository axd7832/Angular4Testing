import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Custom Service Created in the CLI
import { DataService } from './data.service';
import { AppRoutingModule } from './/app-routing.module';
import { RegisterComponent } from './register/register.component';

// Declarations: Component / Directive imports
// Imports: Makes the exported functions from other modules availablec
// Providers : Injected into the root scope

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
