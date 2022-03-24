import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserServiceComponentComponent } from './user-service-component/user-service-component.component';
import { RecommendationDashboardComponent } from './recommendation-dashboard/recommendation-dashboard.component';
import { RealTimeDashboardComponent } from './real-time-dashboard/real-time-dashboard.component';
import { LogoutComponent } from './logout/logout/logout.component';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  { path: 'login', component: UserServiceComponentComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'recommendations', component: RecommendationDashboardComponent, canActivate: [AuthService]},
  { path: 'real-time-dashboard', component: RealTimeDashboardComponent, canActivate: [AuthService]},
  { path: 'logout', component: LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
