import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserServiceComponentComponent } from './user-service-component/user-service-component.component';
import { TrendAnalysisDashboardComponent } from './trend-analysis-dashboard/trend-analysis-dashboard.component';
import { RecommendationDashboardComponent } from './recommendation-dashboard/recommendation-dashboard.component';
import { RealTimeDashboardComponent } from './real-time-dashboard/real-time-dashboard.component';
import { LogoutComponent } from './logout/logout/logout.component';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [
    AppComponent,
    UserServiceComponentComponent,
    TrendAnalysisDashboardComponent,
    RecommendationDashboardComponent,
    RealTimeDashboardComponent,
    LogoutComponent,
  ],
  exports: [
    MatExpansionModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatTabsModule,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
