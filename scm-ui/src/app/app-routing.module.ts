import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserServiceComponentComponent } from './user-service-component/user-service-component.component';
import { TrendAnalysisDashboardComponent } from './trend-analysis-dashboard/trend-analysis-dashboard.component';
import { RecommendationDashboardComponent } from './recommendation-dashboard/recommendation-dashboard.component';
import { RealTimeDashboardComponent } from './real-time-dashboard/real-time-dashboard.component';

const routes: Routes = [
  { path: 'login', component: UserServiceComponentComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'trends', component: TrendAnalysisDashboardComponent},
  { path: 'recommendations', component: RecommendationDashboardComponent},
  { path: 'real-time-dashboard', component: RealTimeDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
