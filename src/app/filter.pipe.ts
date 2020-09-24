import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(array: any, input: any): any {
    if (array.length == "0") {
      return array;
    }
    let text = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();

    let arrayFiltered: any = [];

    for (const item of array) {
      
      
      for(let key in item) {
        if(item[key] == text) {
          arrayFiltered.push(item);
        }
      }
      if(item.year.slice(0, 4) == text) {
        arrayFiltered.push(item);
      }
      
    }
    return arrayFiltered;
  }
}
