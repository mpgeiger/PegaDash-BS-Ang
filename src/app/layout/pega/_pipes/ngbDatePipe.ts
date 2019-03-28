import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'ngbDate'})
export class NgbDatePipe implements PipeTransform {
  transform(value: string) {
    console.log(' in ngbDatePipe -->' + value);
    return ('2/11/2019');
  }
  // transform(value: NgbDate): Date {
    //     return new Date(value.year, value.month, value.day);
    // }
}
