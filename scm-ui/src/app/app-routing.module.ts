import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrendAnalysisDashboardComponent } from './trend-analysis-dashboard/trend-analysis-dashboard.component';
import { RecommendationDashboardComponent } from './recommendation-dashboard/recommendation-dashboard.component';
import { RealTimeDashboardComponent } from './real-time-dashboard/real-time-dashboard.component';


const routes: Routes = [
  { path: 'trends', component: TrendAnalysisDashboardComponent},
  { path: 'recommendations', component: RecommendationDashboardComponent},
  { path: 'real-time-dashboard', component: RealTimeDashboardComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
