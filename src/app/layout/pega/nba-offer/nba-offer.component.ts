import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { NbaService } from '../../../_services/nba.service';

@Component({
  selector: 'app-nba-offer',
  templateUrl: './nba-offer.component.html',
  styleUrls: ['./nba-offer.component.scss']
})
export class NbaOfferComponent implements OnInit {
  headers: any;
  showLoading = true;
  nbas: any = [];

  constructor(
    private nba: NbaService
  ) { }

  ngOnInit() {
    this.getCases();
  }



  getCases() {
    // const unifiedtaskParams = new HttpParams().set('UserId', 'SallyJones').set('WorkGroup', 'NewWaveWG');
    const dParams = new HttpParams();
    // nbaBody.CustomerID = customerID;
    // nbaBody.ContainerName = containerName;
    // {
    //   "CustomerID" : "PEGASAFS-WORK-CONTACT CON-488"
    //   , "ContainerName" :  "BNYServices"
    // }

    //  this.nba.getCurrentNba('D_TransactionSummary', dParams).subscribe(
     this.nba.getCurrentNba('PEGASAFS-WORK-CONTACT CON-488', 'BNYServices').subscribe(
       response => {

          console.log(' get NBA_Offer  RESPONSE -->' + JSON.stringify(response.body));
         const resSTR = JSON.stringify(this.getNBAResults(response.body));
         const resJSON = JSON.parse(resSTR);
         // console.log(' get D_RecentTreasurerCases-->', resJSON._body);
         // this.unifiedtask$ = new MatTableDataSource<any>(this.getResults(response.body));
         this.headers = response.headers;
         // this.unifiedtaskObject$ = JSON.parse(this.getResults(response.body));
         this.nbas = Object.keys(this.getNBAResults(response.body)).map(it => this.getNBAResults(response.body)[it]);
         // this.cases = JSON.parse(response.body);
        // this.sortedData = this.cases.slice();
       //  this.dataSource.data = this.nbas as Transactions[];
         // this.dataSource.filterPredicate = this.createFilter();
         console.log(' get NBA_Offer JSON-->' + JSON.stringify(this.nbas));
         localStorage.setItem('NBA_Offer', this.nbas.length.toString());

         this.showLoading = false;

         console.log('count of NBA_Offer-->  ', localStorage.getItem('NBA_Offer'));

       },
       err => {
         alert('Error form unifiedtask:' + err.errors);
       }
     );
   }

   getNBAResults(data) {
    // localStorage.setItem('numUnifiedTaskList', data.pxResults.length);
    return data.ContainerList[0].RankedResults;
  }
}
