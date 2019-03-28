import { Injectable } from '@angular/core';
// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class SharedPegaDataService {

  constructor() {}

    private data = {};

   setOption(option, value) {
     console.log('__SharedPegaDataService SET--> ', option + '--' + value);
     //  debugger;
     this.data[option] = value;
    }

    getOption() {

      console.log('__SharedPegaDataService GET--> ', this.data);
      return this.data;
    }
}
