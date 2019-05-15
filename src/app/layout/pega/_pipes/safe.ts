import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Pipe({name: 'safeHtml'})
export class SafeHtml implements PipeTransform {
     constructor(private sanitizer: DomSanitizer) {}
     transform ( html: string ) {
        return this.sanitizer.bypassSecurityTrustHtml(html);
  //   return this.sanitizer.bypassSecurityTrustStyle(style);
  // return this.sanitizer.bypassSecurityTrustXxx(style); - see docs
  }
}

@Pipe({name: 'safeStyle'})
export class SafeStyle implements PipeTransform {
     constructor(private sanitizer: DomSanitizer) {}
     transform ( style: string ) {
       // return this.sanitizer.bypassSecurityTrustHtml(html);
     return this.sanitizer.bypassSecurityTrustStyle(style);
  // return this.sanitizer.bypassSecurityTrustXxx(style); - see docs
  }
}

@Pipe({name: 'safeUrl'})
export class SafeUrl implements PipeTransform {
     constructor(private sanitizer: DomSanitizer) {}
     transform ( url: string ) {
       // return this.sanitizer.bypassSecurityTrustHtml(html);
     // return this.sanitizer.bypassSecurityTrustStyle(url);
  // return this.sanitizer.bypassSecurityTrustXxx(style); - see docs
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);

  }
}
