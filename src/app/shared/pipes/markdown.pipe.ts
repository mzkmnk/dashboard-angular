import { Pipe, PipeTransform, } from '@angular/core';
import { marked } from 'marked';

@Pipe({standalone: true,name: 'markdown'})
export class MarkdownPipe implements PipeTransform {
  transform(value: string): Promise<string> {
    return marked.parse(value,{gfm: true,async: true});
  }
}