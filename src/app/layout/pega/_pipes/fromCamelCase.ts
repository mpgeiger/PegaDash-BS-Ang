import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'fromCamelCase'})
export class FromCamelCase implements PipeTransform {
  transform(ccString: string) {
      if (typeof ccString !== 'string') {
        return ccString;
      }

      return ccString
       .replace(/([A-Z])/g, (match) => ` ${match}`)
       .replace(/^./, (match) => match.toUpperCase());
    }
  }


