import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';


@Component({
  selector: 'app-rci-mashup',
  templateUrl: './rci-mashup.component.html',
  styleUrls: ['./rci-mashup.component.scss']
})

export class RciMashupComponent implements OnInit {

  // url = 'http://bny.pegatsdemo.com/BNYImages/mpgMashup.html';
  url = 'http://bny.pegatsdemo.com/assets/mashup/mashupRequestCheckImage.html';

  constructor(

    ) { }

  ngOnInit() {

  }

}


@Component({
  selector: 'app-wire-recall-mashup',
  templateUrl: './wire-recall-mashup.component.html',
  styleUrls: ['./rci-mashup.component.scss']
})

export class WireRecallMashupComponent implements OnInit {

  // url = 'http://bny.pegatsdemo.com/BNYImages/mpgMashup.html';
  url = 'http://bny.pegatsdemo.com/assets/mashup/mashupWireRecall.html';

  constructor(

    ) { }

  ngOnInit() {
  }
}
