// Packages
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { MovieListingsComponent } from './components/movie-listings/movie-listings.component';
import { MovieComponent } from './components/movie-listings/movie/movie.component';
import { FilterComponent } from './components/filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieListingsComponent,
    MovieComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
