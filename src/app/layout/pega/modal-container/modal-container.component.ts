import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
// import { FileNameDialogComponent } from './file-name-dialog.component';
// import {  } from './file-name-dialog.component';
import { CreateCustomRCIcaseComponent } from '../customCases/rcicase/create-custom-rcicase.component';
import { min } from 'rxjs/operators';




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
    dialogConfig.autoFocus = true;

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


// export class HeroChildComponent {
//   // @Input() hero: Hero;
//   @Input('master') masterName: string;
// }
