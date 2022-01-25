import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrendAnalysisDashboardComponent } from './trend-analysis-dashboard/trend-analysis-dashboard.component';


const routes: Routes = [
  { path: 'trends', component: TrendAnalysisDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
