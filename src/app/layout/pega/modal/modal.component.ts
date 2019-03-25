import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{requestType}}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body modal-lg">
      <app-create-rcicase></app-create-rcicase>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() name;
  @Input() requestType;
  @Input() modalTemplate;

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './modal-component.html',
  // styleUrls: ['./sidebar.component.scss']
  styleUrls: ['./modal.component.scss']
})

export class NgbdModalComponent {
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(NgbdModalContent,  { windowClass : 'myCustomModalClass'});
    modalRef.componentInstance.name = 'World sdf sdx sdf fsdf';
    modalRef.componentInstance.requestType = 'Request Check Image';
  }
}



@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{modalTitle}}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body modal-sm">
    <p> Our BNY AI has noticed a recent number of foreign wire transfers.   Did you know you can send a more secure <b>FX ACH</b> payment instead?   Would you like so see more information on this?  <button>Yes</button>
    </p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class NgbdModalContentNBA {
  @Input() name;
  @Input() modalTitle;
  @Input() modalTemplate;

  constructor(public activeModal: NgbActiveModal) {}
}
@Component({
  selector: 'ngbd-modal-componentNBA',
  templateUrl: './modal-component-NBA.html',
  // styleUrls: ['./sidebar.component.scss']
  styleUrls: ['./modal.component.scss']
})

export class NgbdModalComponentNBA {
  @Input() requestType;

  constructor(private modalService: NgbModal) {}
  open() {
    const modalRef = this.modalService.open(NgbdModalContentNBA,  { windowClass : 'myCustomModalClass'});
    modalRef.componentInstance.name = 'World sdf sdx sdf fsdf';
    modalRef.componentInstance.modalTitle = this.requestType; // 'Request Check Image';
  }
}
