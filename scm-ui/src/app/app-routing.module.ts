import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserServiceComponentComponent } from './user-service-component/user-service-component.component';
import { TrendAnalysisDashboardComponent } from './trend-analysis-dashboard/trend-analysis-dashboard.component';
import { RecommendationDashboardComponent } from './recommendation-dashboard/recommendation-dashboard.component';
import { RealTimeDashboardComponent } from './real-time-dashboard/real-time-dashboard.component';
import { AuthService } from './auth.service';
import { LogoutComponent } from './logout/logout/logout.component';

const routes: Routes = [
  { path: 'login', component: UserServiceComponentComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'trends', component: TrendAnalysisDashboardComponent, canActivate: [AuthService]},
  { path: 'recommendations', component: RecommendationDashboardComponent, canActivate: [AuthService]},
  { path: 'real-time-dashboard', component: RealTimeDashboardComponent, canActivate: [AuthService]},
  { path: 'logout', component: LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
