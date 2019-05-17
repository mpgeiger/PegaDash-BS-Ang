import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { NbaService } from '../../../_services/nba.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import stubbedResults from '../../../../assets/json/NBA_REST.json';


export interface CaptureResponseResults {
  Status: string;
  Message: string;
  CaseID: string;
}
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

//   {"Status":"OK","Message":"Response captured sucessfully","CaseID":"PR-20348"}

// class CaptureResponseResults {
//   constructor(public Status: string,
//               public Message: string,
//               public CaseID: string){}
// }

export class NbaOfferComponent implements OnInit {


  NbaCaptureResponse: any = {
    'CustomerID': 'PEGASAFS-WORK-CONTACT CON-488',
    'ContainerName': 'BNYServices',
    'RankedResults': [{
      'Name': 'FXACHPayment',
      'Issue': 'Sales',
      'Group': 'Treasury',
      'InteractionID': '5262371569457456502',
      'Outcome': 'Accepted',
      'Behaviour': 'Positive',
      'Direction': 'Inbound',
      'Channel': 'Web'
    }]
  };



  constructor(
    private nba: NbaService
  ) { }

  componentName = 'nba-offer.component';

  headers: any;
  showLoading = true;


  nbaShowOffer = true;
  nbaShowDetail = false;
  nbaShowCaptureResponse = false;

  nbas: any = [];
  flip = 'inactive';
  captureResponseResults: any = {'Status': 'stub', 'Message': 'stub - Response captured sucessfully', 'CaseID': 'stub-1234'};

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
   // useStub = true;
    // console.log(' STUBBED DATA-->' + useStub);
    return useStub;
  }


  getStubbedCases() {
    const stubbed: any = stubbedResults;

   this.nbas = Object.keys(this.getNBAResults(stubbed)).map(it => this.getNBAResults(stubbed)[it]);
   localStorage.setItem('NBA_Offer', this.nbas.length.toString());
   this.showLoading = false;
  }

  getCases() {
    const dParams = new HttpParams();

     this.nba.getCurrentNba('PEGASAFS-WORK-CONTACT CON-488', 'BNYServices').subscribe(
       response => {
         this.headers = response.headers;
         this.nbas = Object.keys(this.getNBAResults(response.body)).map(it => this.getNBAResults(response.body)[it]);
         localStorage.setItem('NBA_Offer', this.nbas.length.toString());
         this.showLoading = false;
         console.log('count of NBA_Offer-->  ', localStorage.getItem('NBA_Offer'));
         console.log(' NBA_Offer results-->  ', JSON.stringify(this.nbas));
       },
       err => {
         alert('Error form unifiedtask:' + err.errors);
       }
     );
   }

   captureResponse(outcome, behavior) {

     //   Sample response for success
     //    {"Status":"OK","Message":"Response captured sucessfully","CaseID":"PR-20348"}

     const captureResponse = this.NbaCaptureResponse;
     captureResponse.RankedResults[0].Outcome = outcome;
     captureResponse.RankedResults[0].Behaviour = behavior;
     this.nba.captureNBAResponse(captureResponse).subscribe(
      response => {
        this.headers = response.headers;

        const result: any = response.body;
        this.captureResponseResults.Status = result.Status;
        this.captureResponseResults.Message = result.Message;
        this.captureResponseResults.CaseID = result.CaseID;

        // this.showLoading = false;
        // console.log('count of NBA_Offer-->  ', localStorage.getItem('NBA_Offer'));
        console.log(' CAPTURE RESPONSE NBA_Offer results-->  ' + JSON.stringify(result));
      },
      err => {
        alert('Error from ' + this.componentName + ':' + err.errors);
      }
    );
    }

    captureResponseAction(result) {
      if (result === 'yes') {
        this.captureResponse('Accepted', 'Positive');
      } else if (result === 'no') {
        this.captureResponse('Rejected', 'Negative');
      } else if (result === 'later') {
        this.captureResponse('Later', 'Neutral');
      } else {
        this.captureResponse('Later', 'Neutral');
      }
    }

   getNBAResults(data) {
    // localStorage.setItem('numUnifiedTaskList', data.pxResults.length);
    return data.ContainerList[0].RankedResults;
  }

  nbaGotoDetail() {
    this.nbaShowOffer = false;
    this.nbaShowDetail = true;
  }

  nbaOfferCaptureResult(result) {
    this.nbaShowOffer = false;
    this.nbaShowDetail = true;

    switch (result) {
      case 'yes':
        this.captureResponseAction('yes');
      this.nbaShowOffer = false;
      this.nbaShowDetail = false;
      this.nbaShowCaptureResponse = true;
      break;

      case 'later':
          this.captureResponseAction('later');
      this.nbaShowDetail = false;
      this.nbaShowCaptureResponse = false;
      this.nbaShowOffer = true;
      break;

      case 'no':
          this.captureResponseAction('no');
      this.nbaShowCaptureResponse = false;
      this.nbaShowOffer = true;
      default:
          this.captureResponseAction('later');
      this.nbaShowDetail = false;
      this.nbaShowCaptureResponse = false;
      this.nbaShowOffer = true;
    }
  }

  nbaCROk() {
    this.nbaShowOffer = true;
    this.nbaShowDetail = false;
    this.nbaShowCaptureResponse = false;
  }


  nbaOnClick() {
    window.open('https://www.bnymellon.com/us/en/what-we-do/investment-services/treasury-services/index.jsp', '_blank');
  }


}

