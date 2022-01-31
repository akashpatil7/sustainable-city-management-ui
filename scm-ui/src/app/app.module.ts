import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserServiceComponentComponent } from './user-service-component/user-service-component.component';
import { TrendAnalysisDashboardComponent } from './trend-analysis-dashboard/trend-analysis-dashboard.component';
import { RecommendationDashboardComponent } from './recommendation-dashboard/recommendation-dashboard.component';
import { RealTimeDashboardComponent } from './real-time-dashboard/real-time-dashboard.component';
import { Router } from '@angular/router';

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
    FormsModule,
    HttpClientModule,
    Router
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
