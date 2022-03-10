import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatExpansionModule} from '@angular/material/expansion';
import { TrendsService } from '../services/trends.service';
import { jsPDF } from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';

@Component({
  selector: 'app-trend-analysis-dashboard',
  templateUrl: './trend-analysis-dashboard.component.html',
  styleUrls: ['./trend-analysis-dashboard.component.css']
})
export class TrendAnalysisDashboardComponent implements OnInit {

  constructor(private http:HttpClient, private trends:TrendsService) { }
  
  // array to store each Dublin bike data entry
  bikeTrends:any[] = [];
  hourlyBikeTrends:any[] = [];
  loadingData:boolean = true;
  currentTime:any;
  
  ngOnInit() {
    // get all default trends data    
    this.getHourlyBikeAverages();
  }

  // get hourly availability averages for bike stations
  getHourlyBikeAverages() {
    this.trends.getHourlyAverage().subscribe((res) => {
      this.hourlyBikeTrends = res;
      this.hourlyBikeTrends.sort(function(a, b){
          if(a._id < b._id) { return -1; }
          if(a._id > b._id) { return 1; }
          return 0;
      });
      
      this.currentTime = new Date();
      this.loadingData = false;
    })
    
  }
  
  savePDF(dataIndicator:string):void{
    // p = portrait, pt = points, a4 = paper size, 
    let doc = new jsPDF('p', 'pt', 'a4');  
    //const pdfTable = this.el.nativeElement;
    let pdfTable;
    if(dataIndicator == "bikes")
      pdfTable = <HTMLElement>document.getElementById("bikeTrendTable");
    
    if(pdfTable) {
      var html = htmlToPdfmake(pdfTable.innerHTML);
      const documentDefinition = { content: html };
      pdfMake.createPdf(documentDefinition).open(); 
      
    }
  }
  
}
