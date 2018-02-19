import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'nameFilter',
  // pure: false
})
export class NameFilterPipe implements PipeTransform {
  transform(items: any[], term: string | undefined): any {
    if (!term) return items;

    const lowerTerm = term.toLowerCase();
    return items.filter(item => item.name.toLowerCase().includes(lowerTerm));
  }
}
