import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { FileNameDialogComponent } from './file-name-dialog.component';


@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss']
})
export class ModalContainerComponent implements OnInit {


  fileNameDialogRef: MatDialogRef<FileNameDialogComponent>;
  files = [
    { name: 'foo.js', content: '' },
    { name: 'bar.js', content: '' }
  ];

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }


  openAddFileDialog() {
    this.fileNameDialogRef = this.dialog.open(FileNameDialogComponent,
      {
        height: '500px',
        width: '700px',
      });
  }
  onNoClick(): void {
    this.dialog.closeAll();
  }



}
