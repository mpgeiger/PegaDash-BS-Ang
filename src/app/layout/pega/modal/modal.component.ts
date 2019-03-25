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
export class modalRCICaseType {
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
    const modalRef = this.modalService.open(modalRCICaseType,  { windowClass : 'modalRCICaseTypeClass'});
    modalRef.componentInstance.name = 'World sdf sdx sdf fsdf';
    modalRef.componentInstance.requestType = 'Request Check Image';
  }
}



@Component({
  selector: 'ngbd-modal-content',
  template: `
  <div id="modal-{{name}}">
    <div class="modal-header">
      <h4 class="modal-title"><b>{{modalTitle}}</b></h4>

    </div>
    <div class="modal-body text-center">
    <h4> Our <b>BNY AI</b> has noticed a recent number of <br/> foreign wire transfers.
     <br/><br/>Did you know there is a  <br/> more secure <b>FX ACH</b> payment instead?
       <br/><br/><br/>Would you like learn more?
       <br/>
       <button type="button" class="btn btn-primary" style="margin: 15px;" (click)="activeModal.close('Close click')">Yes</button>
<button type="button" class="btn btn-secondary"  style="margin: 15px;" (click)="activeModal.close('Close click')">Later</button>
<button type="button" class="btn btn-light"  style="margin: 15px;" (click)="activeModal.close('Close click')">Not Interested</button>
    </h4>
    </div>
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
  styleUrls: ['./modal.component-NBA.scss']
})

export class NgbdModalComponentNBA {
  @Input() requestType;

  constructor(private modalService: NgbModal) { }
  open() {
    const modalRef = this.modalService.open(NgbdModalContentNBA,  {
      // ariaDescribedBy : 'nbaAdvice'
      ariaLabelledBy : 'nbaLabel'
      , centered : true
      // , animation : true
      , windowClass : 'nbaAdviceModalClass'
      , backdrop  : 'static'
      , keyboard : false});
    modalRef.componentInstance.name = 'World sdf sdx sdf fsdf';
    modalRef.componentInstance.modalTitle = this.requestType; // 'Request Check Image';
    modalRef.componentInstance.name = 'nbaAdvice'; // 'Request Check Image';
  }
}
