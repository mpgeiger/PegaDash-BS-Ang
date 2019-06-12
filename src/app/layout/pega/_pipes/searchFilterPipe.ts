import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
  name: 'FilterPipe'
})
export class FilterPipe implements PipeTransform {
  componentName = '_pipes/searchFilterPipe.ts';

  transform(value: any, input: string) {
   // console.log('--SEARCHFilterPipe -->' + JSON.stringify(value));
    console.log(this.componentName + ' search input-->' + input);
    // console.log('     list-->' + JSON.stringify(value));

      if (input) {
          input = input.toLowerCase();
          return value.filter(function (el: any) {
              // console.log('   in filter-->' + JSON.stringify(el) );
              return el.pyLabel.toLowerCase().indexOf(input) > -1;

          });
          // return (value.pxResults.pyLabel(i => i.pyLabel.toLowerCase().indexOf(input.toLowerCase()) > -1));

      }
      return value;
  }
}
// return (item.users.some(i => i.surname.toLowerCase().indexOf(value.toLowerCase()) > -1));
