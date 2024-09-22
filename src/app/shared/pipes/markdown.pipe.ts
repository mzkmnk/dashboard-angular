import { inject, Pipe, PipeTransform, } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import DOMPurify from 'dompurify';
import {micromark} from 'micromark';
import {gfm, gfmHtml} from 'micromark-extension-gfm';

@Pipe({standalone: true,name: 'markdown'})
export class MarkdownPipe implements PipeTransform {
  private readonly domSanitizer = inject(DomSanitizer);
  transform(value: string): SafeHtml {
    const html : string = micromark(value,{extensions: [ gfm() ],htmlExtensions: [ gfmHtml() ]});
    const sanitizedHtml = DOMPurify.sanitize(html,{ADD_ATTR: [ 'checked' ],FORBID_ATTR: [ 'disabled' ]});
    return this.domSanitizer.bypassSecurityTrustHtml(sanitizedHtml);
  }
}