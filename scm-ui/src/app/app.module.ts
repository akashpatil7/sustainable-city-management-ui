import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserServiceComponentComponent } from './user-service-component/user-service-component.component';
import { TrendAnalysisDashboardComponent } from './trend-analysis-dashboard/trend-analysis-dashboard.component';
import { RecommendationDashboardComponent } from './recommendation-dashboard/recommendation-dashboard.component';
import { RealTimeDashboardComponent } from './real-time-dashboard/real-time-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    UserServiceComponentComponent,
    TrendAnalysisDashboardComponent,
    RecommendationDashboardComponent,
    RealTimeDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
