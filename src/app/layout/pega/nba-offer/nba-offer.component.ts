import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { NbaService } from '../../../_services/nba.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import stubbedResults from '../../../../assets/json/NBA_REST.json';

@Component({
  selector: 'app-nba-offer',
  templateUrl: './nba-offer.component.html',
  styleUrls: ['./nba-offer.component.scss'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class NbaOfferComponent implements OnInit {

  constructor(
    private nba: NbaService
  ) { }
  headers: any;
  showLoading = true;
  nbas: any = [];
  flip = 'inactive';

  ngOnInit() {
    // this.getCases();
    if (this.checkIfStubbed()) {

      console.log('STUBBED NBA_Offer');
      this.getStubbedCases();
    } else {
      console.log('LIVE NBA_Offer');
      this.getCases();
    }
  }

  checkIfStubbed() {
    const useStubStr = localStorage.getItem('useStubbedData');

    let useStub = false;
    useStub = (useStubStr === 'true');
    // console.log(' STUBBED DATA-->' + useStub);
    return useStub;
  }


  getStubbedCases() {
    const stubbed: any = stubbedResults;
    // this.nbas = Object.keys(this.getNBAResults(stubbed)).map(it => this.getNBAResults(stubbed)[it]);
    // this.cases = JSON.parse(response.body);
   // this.sortedData = this.cases.slice();
   this.nbas = Object.keys(this.getNBAResults(stubbed)).map(it => this.getNBAResults(stubbed)[it]);
   localStorage.setItem('NBA_Offer', this.nbas.length.toString());
   this.showLoading = false;
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

          console.log(' get NBA_Offer begin');
         this.headers = response.headers;
         this.nbas = Object.keys(this.getNBAResults(response.body)).map(it => this.getNBAResults(response.body)[it]);

        //  console.log(' get NBA_Offer JSON-->' + JSON.stringify(this.nbas));
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

  toggleFlip() {
    this.flip = (this.flip === 'inactive') ? 'active' : 'inactive';
  }

  nbaOnClick() {
    window.open("https://www.bnymellon.com/us/en/what-we-do/investment-services/treasury-services/index.jsp", "_blank");
  }


}

