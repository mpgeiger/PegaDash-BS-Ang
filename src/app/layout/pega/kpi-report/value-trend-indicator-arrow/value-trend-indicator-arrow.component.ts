import { Component, Input, OnInit } from '@angular/core';
import { _keyValueDiffersFactory } from '@angular/core/src/application_module';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Component({
  selector: 'app-value-trend-indicator-arrow',
  templateUrl: './value-trend-indicator-arrow.component.html',
  styleUrls: ['./value-trend-indicator-arrow.component.scss']
})
export class ValueTrendIndicatorArrowComponent implements OnInit {
  @Input() value1: number;
  @Input() value2: number;
  @Input() trendVal: string;


  greater = false;
  less = false;
  resultEqual = false;

  positive = false;
  negative = false;
  equal = false;


  constructor() { }

  ngOnInit() {
    // this.compareValues(this.value1, this.value2);
    this.showIndicator(this.trendVal);
  }

  showIndicator(trend) {
    switch (trend) {
      case 1: {
        this.positive = true;
        break;
      }
      case -1: {
        this.negative = true;
        break;
      }
      default: {
        this.equal = true; break;
      }
    }

  }

  compareValues(value, comparedTo) {
    let _value = value * 1;
    const _comparedTo = comparedTo * 1;
    const test = (_value > _comparedTo);
    // console.log ( _value + ' -- ' + _comparedTo + ' test-->' + test);
    if (!isNaN(value)) {

      if (_value > _comparedTo) {
        this.greater = true;
        // console.log ( _value + ' -- ' + _comparedTo + ' test-->' + 'greater');
      } else if (_value < _comparedTo) {
        this.less = true;
        // console.log ( _value + ' -- ' + _comparedTo + ' test-->' + 'less');
      } else if (_value = _comparedTo) {
        this.resultEqual = true;
        // console.log ( _value + ' -- ' + _comparedTo + ' test-->' + 'equal');
      } else {

      }
    }
  }
  //   compareValues(value, comparedTo) {
  // let _value = value * 1;
  // const _comparedTo = comparedTo * 1;
  // const test = (_value > _comparedTo);
  // // console.log ( _value + ' -- ' + _comparedTo + ' test-->' + test);
  // if (!isNaN(value) ) {

  //     if (_value > _comparedTo) {
  //       this.greater = true;
  //       // console.log ( _value + ' -- ' + _comparedTo + ' test-->' + 'greater');
  //     } else if (_value < _comparedTo) {
  //       this.less = true;
  //       // console.log ( _value + ' -- ' + _comparedTo + ' test-->' + 'less');
  //     } else if ( _value = _comparedTo) {
  //       this.resultEqual = true;
  //       // console.log ( _value + ' -- ' + _comparedTo + ' test-->' + 'equal');
  //     } else {

  //     }
  //   }
  // }

}
