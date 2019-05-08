
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
// import { FileNameDialogComponent } from './file-name-dialog.component';
// import {  } from './file-name-dialog.component';
import { CreateCustomRCIcaseComponent } from '../customCases/rcicase/create-custom-rcicase.component';
import { WorkitemComponent } from './../workitem/workitem.component';
import { min } from 'rxjs/operators';
// import { OpenNewCaseService } from '../../../_messages/opennewcase.service';
import { CaseService } from '../../../_services/case.service';
import { GetNewCaseService } from '../../../_messages/getnewcase.service';

import { OpenAssignmentService } from '../../../_messages/openassignment.service';
import { RefreshWorkListService } from '../../../_messages/refreshworklist.service';
import { GetAssignmentService } from '../../../_messages/getassignment.service';
import { OpenNewCaseService } from '../../../_messages/opennewcase.service';



import { Subscription } from 'rxjs';



// @Component({
//   selector: 'app-modal-container',
//   templateUrl: './modal-container.component.html',
//   styleUrls: ['./modal-container.component.scss']
// })
// export class ModalContainerComponent implements OnInit {
//   fileNameDialogRef: MatDialogRef<FileNameDialogComponent>;
//   files = [
//     { name: 'foo.js', content: '' },
//     { name: 'bar.js', content: '' }
//   ];

//   constructor(
//     private dialog: MatDialog
//   ) { }

//   ngOnInit() {
//   }

//   openAddFileDialog() {
//     this.fileNameDialogRef = this.dialog.open(FileNameDialogComponent,
//       {
//         height: '500px',
//         width: '700px',
//       });
//   }
//   onNoClick(): void {
//     this.dialog.closeAll();
//   }
// }

@Component({
  selector: 'app-modal-container-rci-custom',
  templateUrl: './modal-container.componentMPG.html',
  styleUrls: ['./modal-container.component.scss']
})



export class ModalRCIContainerComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }
  @Input('master') masterName: string;

  caseInstanceName = '';

  rciDialogRef: MatDialogRef<CreateCustomRCIcaseComponent>;

  // @Input()('master') masterName: string;

  ngOnInit() {
    this.caseInstanceName = this.masterName;
    // console.log( ' ## ModalRCIContainerComponent-->' + this.masterName);
  }

  public openCreateRciCaseDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;

    dialogConfig.width = '70%';
    dialogConfig.minWidth = '650px';
    dialogConfig.minHeight = '400px';
    dialogConfig.maxWidth = '1000px';

    // dialogConfig.data = {
    //   id: 1,
    //   title: 'Angular For Beginners',
    //   masterName: 'FOOBAR'
    // };

    this.rciDialogRef = this.dialog.open(CreateCustomRCIcaseComponent, dialogConfig);
  }
  onNoClick(): void {
    this.dialog.closeAll();
  }
}


@Component({
  selector: 'app-modal-container-work-item',
  templateUrl: './workItem-modal-container.component.html',
  styleUrls: ['./modal-container.component.scss']
})
export class ModalWorkItemComponent implements OnInit {
  message: any;
  subscription: Subscription;

  isNewCase = false;

  openNewCaseMessage: any;
  openNewCaseSubscrption: Subscription;


  constructor(
    private dialog: MatDialog,
    private cservice: CaseService,
    private gaservice: GetAssignmentService,

    private rwlservice: RefreshWorkListService,
    private gncservice: GetNewCaseService,
    private oaservice: OpenAssignmentService,
    private oncservice: OpenNewCaseService
  ) {
    this.subscription = this.oaservice.getMessage().subscribe(message => {

      this.message = message;
      // this.addTab(message.caseID, message.assignment);
    });


    this.openNewCaseSubscrption = this.oncservice.getMessage().subscribe(
    message => {
      this.openNewCaseMessage = message;

      this.isNewCase = true;
      // this.addTab("New", null);
    }
  );


  }

  @Input('master') masterName: string;

  caseInstanceName = '';

  rciDialogRef: MatDialogRef<WorkitemComponent>;
  rciCaseType =  {
    'CanCreate': 'true',
    'ID': 'PegaCPMFS-Work-RequestCheckImage',
    'name': 'RequestCheckImage',
    'pxObjClass': 'Pega-API-CaseManagement-CaseType',
    'startingProcesses': [
        {
            'ID': 'pyStartCase',
            'name': 'Request Check Image',
            'pxObjClass': 'Pega-API-CaseManagement-Process',
            'requiresFieldsToCreate': 'false'
        }
    ]
};


  ngOnInit() {
    // this.caseInstanceName = this.masterName;

  }

  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.

    // this.gncservice.sendMessage(this.openNewCaseMessage.caseID);
  }
  ngAfterViewChecked() {
    // called after the tab has been created
    // then we want to send the appropriate message (usally to app-workitem) to populate

    if (this.message) {

      if (!this.isNewCase) {
        this.gaservice.sendMessage(this.message.assignment.pxRefObjectInsName, this.message.assignment);

        this.message = null;
      }
    } else if (this.openNewCaseMessage) {
      if (this.isNewCase) {
        this.isNewCase = false;

        this.gncservice.sendMessage(this.openNewCaseMessage.caseID);
      }
    }
    // else if (this.openRecentMessage) {
    //   if (!this.isNewCase) {
    //     // this.grervice.sendMessage(this.openRecentMessage.caseID);
    //   }
    // }
  }

  public openWorkItemDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;

    dialogConfig.width = '70%';
    dialogConfig.minWidth = '650px';
    dialogConfig.minHeight = '400px';
    dialogConfig.maxWidth = '1000px';



    this.rciDialogRef = this.dialog.open(WorkitemComponent, dialogConfig);
  }

  doPushButton() {
    this.createCaseType(this.rciCaseType);
    this.openWorkItemDialog();
  }

  createCaseType(caseType: any) {
    // caseType = this.rciCaseType;

    if (caseType.startingProcesses[0].requiresFieldsToCreate === 'false') {
      // skip new
      this.cservice.createCase(caseType.ID, {}).subscribe(
        response => {
          // create a "row" that matches the worklist row, this way we can re-use
          // the open assignment service
          const row: any = {};
          const myCase: any = response.body;


          row['pxRefObjectKey'] = myCase.ID;
          row['pxRefObjectInsName'] = myCase.ID.split(' ')[1];
          row['pzInsKey'] = myCase.nextAssignmentID;

          console.log(' in modal-container.component.ts --> sendMessage oaService->' + row.pxRefObjectInsName );
          console.log( JSON.stringify(row) );

          this.oaservice.sendMessage(row.pxRefObjectInsName, row);
         this.rwlservice.sendMessage('Work');
          console.log(' in modal-container.component.ts --> createCase OpenAssignment-->' + myCase.ID);
        },
        err => {
          alert('Errors from create case:' + err.errors);
        }

        );
      } else {
        // new
        this.oncservice.sendMessage(caseType.ID);
        console.log(' in modal-container.component.ts --> createCase oncservice-->' + caseType.ID);

    }

  }

  onNoClick(): void {
    this.dialog.closeAll();
  }
}

// export class HeroChildComponent {
//   // @Input() hero: Hero;
//   @Input('master') masterName: string;
// }
