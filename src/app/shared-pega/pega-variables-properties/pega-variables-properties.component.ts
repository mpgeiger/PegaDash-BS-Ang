import { Component, OnInit } from '@angular/core';
import { PegaSessionService } from '@ss/app/layout/pega/_services/pega-session.service';


@Component({
  selector: 'app-pega-variables-properties',
  templateUrl: './pega-variables-properties.component.html',
  styleUrls: ['./pega-variables-properties.component.scss']
})
export class PegaVariablesPropertiesComponent implements OnInit {
componentName = 'pega-variables-properties.component';

  constructor(
    private ps: PegaSessionService
  ) { }

  // Enter customer abbreviation to display on Headers or Card Titles
  pega_Customer_Abbreviation = 'MUFG Investor Services';
  pega_NBA_Advice_Header = 'MUFG Investor Services';

  hexColors = [
    '#e1615d',
'#e93d3c',
'#576786',
'#5c605c',
'#8c8985',
'#5c646a',
'#787d7f',
'#79797f',
'#bce6e8',
'#a6acb7',
'#565e52',
'#222d28',
'#192021',
'#e83d3c',
'#a6392d',
'#e0c684',
'#f8dba5',
'#ffe7bf',
'#e9362a',
'#ea382b',
'#e8372f',
'#861f21',
'#6d7773',
'#727e81',
'#5f6b7a',
'#be171b',
'#cf2527',
'#c21a20',
'#6f7d85',
'#525762',
'#777369',
'#444856',
'#394554',
'#818d9b',
'#6b5661',
'#b1a39f',
'#80747b',
'#1e252e'
  ];

  // rgbaPalette: Array<string> = [];

 rgbaPalette = ['rgba(225,97,93, .9)', 'rgba(233,61,60, .9)', 'rgba(87,103,134, .9)', 'rgba(92,96,92, .9)', 'rgba(140,137,133, .9)', 'rgba(92,100,106, .9)', 'rgba(120,125,127, .9)', 'rgba(121,121,127, .9)', 'rgba(188,230,232, .9)', 'rgba(166,172,183, .9)', 'rgba(86,94,82, .9)', 'rgba(34,45,40, .9)', 'rgba(25,32,33, .9)', 'rgba(232,61,60, .9)', 'rgba(166,57,45, .9)', 'rgba(224,198,132, .9)', 'rgba(248,219,165, .9)', 'rgba(255,231,191, .9)', 'rgba(233,54,42, .9)', 'rgba(234,56,43, .9)', 'rgba(232,55,47, .9)', 'rgba(134,31,33, .9)', 'rgba(109,119,115, .9)', 'rgba(114,126,129, .9)', 'rgba(95,107,122, .9)', 'rgba(190,23,27, .9)', 'rgba(207,37,39, .9)', 'rgba(194,26,32, .9)', 'rgba(111,125,133, .9)', 'rgba(82,87,98, .9)', 'rgba(119,115,105, .9)', 'rgba(68,72,86, .9)', 'rgba(57,69,84, .9)', 'rgba(129,141,155, .9)', 'rgba(107,86,97, .9)', 'rgba(177,163,159, .9)', 'rgba(128,116,123, .9)', 'rgba(30,37,46, .9)'];

  ngOnInit() {
  }
  OnInit() {
  }

  buildRgbaPalette() {
  //  this.hexColors.forEach(element => {
  //    const rgb = this.hexToRGBa(element);
  //    this.rgbaPalette.push(rgb);
  //   });
   // this.ps.setRgbColorPalette(this.rgbaPalette);
    //
    // MPG -- Uncomment this to see the color palette being generated
    //
    //console.log(this.componentName + ' RGBa Palette-->' + JSON.stringify(this.rgbaPalette));
  }
  private hexToRGBa(hexStr: string): string {
    let rgb = '';
    const hex = parseInt(hexStr.substring(1), 16);
    const r = (hex & 0xff0000) >> 16;
    const g = (hex & 0x00ff00) >> 8;
    const b = hex & 0x0000ff;
    rgb = 'rgba(' + r + ',' + g + ',' + b + ', .9)';
    console.log(this.componentName + ' testing -- ' + hexStr + '-->' + rgb);
    return rgb;
  }

}
