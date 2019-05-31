import {Pipe, PipeTransform} from '@angular/core';

// @Pipe({
//   name: 'searchFilter'
// })
// export class SearchFilterPipe implements PipeTransform {
//   public transform(value, keys: string, term: string) {

//     if (!term) { return value; }
//     return (value || []).filter(item => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])));

//   }
// }
@Pipe({
  name: 'FilterPipe'
})
export class FilterPipe implements PipeTransform {
  transform(value: any, input: string) {
    console.log(' in searchFilterPipe.ts');
    console.log('     search input-->' + input);
    // console.log('     list-->' + JSON.stringify(value));

      if (input) {
          input = input.toLowerCase();
          return value.filter(function (el: any) {
            // console.log('   in filter-->' + JSON.stringify(el.pxResults) );
              return el.pyLabel.toLowerCase().indexOf(input) > -1;
          });
      }
      return value;
  }
}
