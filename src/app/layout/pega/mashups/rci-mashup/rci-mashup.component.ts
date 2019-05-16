import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';


@Component({
  selector: 'app-rci-mashup',
  templateUrl: './rci-mashup.component.html',
  styleUrls: ['./rci-mashup.component.scss']
})

export class RciMashupComponent implements OnInit {

  url = 'http://bny.pegatsdemo.com/BNYImages/mpgMashup.html';
  // htmlVariable = '<div style=\'color:red;\'><b>Some html.</b>';
  // myFoo =  '<div style="color:red;"><b>my html</b></div> not bold';
  // myMashup2 = '<div data-pega-gadgetname =\'PegaGadget\'  data-pega-action =\'createNewWork\'  data-pega-action-param-classname =\'PegaCPMFS-Work-RequestCheckImage\'  data-pega-action-param-flowname =\'pyStartCase\'  data-pega-isdeferloaded =\'false\'  data-pega-applicationname =\'BNYService\'  data-pega-threadname =\'STANDARD\'  data-pega-resizetype =\'fill\'  data-pega-url =\'http://end2endcrmcommercialbankingnew.pegatsdemo.com/prweb/\' ></div>';
  // myMashup1 = '<div data-pega-gadgetname =\'PegaGadget\'  data-pega-action =\'createNewWork\'  data-pega-action-param-classname =\'PegaCPMFS-Work-RequestCheckImage\'  data-pega-action-param-flowname =\'pyStartCase\'  data-pega-isdeferloaded =\'false\'  data-pega-applicationname =\'BNYService\'  data-pega-threadname =\'STANDARD\'  data-pega-resizetype =\'fill\'  data-pega-url =\'http://bny.pegatsdemo.com/prweb/\' >inside pmashup</div>';
  // myMashup = 'div data-pega-gadgetname =\'PegaGadget\'  data-pega-action =\'createNewWork\'  data-pega-action-param-classname =\'PegaCPMFS-Work-RequestCheckImage\'  data-pega-action-param-flowname =\'pyStartCase\'  data-pega-isdeferloaded =\'false\'  data-pega-applicationname =\'BNYService\'  data-pega-threadname =\'STANDARD\'  data-pega-resizetype =\'fill\'  data-pega-url =\'http://end2endcrmcommercialbankingnew.pegatsdemo.com/prweb/\' ';
  // // + 'data-pega-action-param-flowname =\\'pyStartCase\\'  data-pega-isdeferloaded =\\'true\\'  data-pega-applicationname =\\'BNYService\\' '
  // + 'data-pega-threadname =\\'STANDARD\\'  data-pega-resizetype =\\'default\\'  data-pega-url =\\'http://bny.pegatsdemo.com/prweb/\\' '
  // + 'data-pega-redirectguests =\\'true\\' ></div>';
  // myMashup: string = mash;
  constructor(
    // private renderer: Renderer2
    // , private elementRef: ElementRef
    ) { }


    // @ViewChild('one') d1: ElementRef;
  //  myMashup = '<script src =\\'http://bny.pegatsdemo.com/prweb/?pyActivity=pzIncludeMashupScripts\\'></script><div data-pega-gadgetname =\\'PegaGadget\\'  data-pega-action =\\'createNewWork\\'  data-pega-action-param-classname =\\'PegaCPMFS-Work-RequestCheckImage\\'  data-pega-action-param-flowname =\\'pyStartCase\\'  data-pega-isdeferloaded =\\'true\\'  data-pega-applicationname =\\'BNYService\\'  data-pega-threadname =\\'STANDARD\\'  data-pega-resizetype =\\'default\\'  data-pega-url =\\'http://bny.pegatsdemo.com/prweb/\\'  data-pega-redirectguests =\\'true\\' ></div>';
  // this.myMashup = "<div data-pega-gadgetname ='PegaGadget'  data-pega-action ='createNewWork'  data-pega-action-param-classname ='PegaCPMFS-Work-RequestCheckImage'  data-pega-action-param-flowname ='pyStartCase'  data-pega-isdeferloaded ='false'  data-pega-applicationname ='BNYService'  data-pega-threadname ='STANDARD'  data-pega-resizetype ='fill'  data-pega-url ='http://end2endcrmcommercialbankingnew.pegatsdemo.com/prweb/' ></div>";
  ngOnInit() {
    // const d2 = this.renderer.createElement('div');
    // const text = this.renderer.createText('two');
    // const text = this.renderer.createText(this.htmlVariable);

    // this.renderer.appendChild(d2, text);
    // this.renderer.appendChild(this.d1.nativeElement, d2);
  }
  ngAfterViewInit() {
    // this.renderer.invokeElementMethod(this.d1.nativeElement', 'insertAdjacentHTML' ['beforeend', '<div class="two">two</div>']);
    // this.renderer.invokeElementMethod(this.d1.nativeElement', 'insertAdjacentHTML' ['beforeend', '<div class="two">two</div>']);
    // const d1 = this.elementRef.nativeElement.querySelector('.one');
    // d1.insertAdjacentHTML('beforeend', '<div class="two">two this is a test</div>');
    // d1.insertAdjacentHTML('beforeend', this.myMashup);

    // this.d1.nativeElement.insertAdjacentHTML('beforeend', this.myMashup1);

  }

}
