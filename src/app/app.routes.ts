import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Angular Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

// Components
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ResumeComponent } from './components/resume/resume.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ContactComponent } from './components/contact/contact.component';
import { EducationComponent } from './components/education/education.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AppComponent } from './app.component';


const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatDialogModule
];


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'resume', component: ResumeComponent },
  { path: 'education', component: EducationComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'contact', component: ContactComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AppComponent,
    HomeComponent,
    AboutComponent,
    PortfolioComponent,
    ContactComponent,
    ResumeComponent,
    SidebarComponent,
    ...materialModules,
    HttpClientModule
  ],
  declarations: [
    
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }