import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PortalService } from './portal/portal.service';
import { Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [PortalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
