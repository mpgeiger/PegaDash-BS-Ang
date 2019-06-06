import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'parseIdFromCase'})
export class ParseIdFromCase implements PipeTransform {
  transform(idValue: string) {
      if (typeof idValue !== 'string') {
        return idValue;
      }
      return idValue.split(/[ ]+/).pop();
    }
  }


