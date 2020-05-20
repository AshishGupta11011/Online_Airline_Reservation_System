import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cityFilter'
})
export class FilterCityPipe implements PipeTransform {
  tempvar = [{
    value: "",
    name:
      "Not found"

  }]
  cityArray: any = [];
  transform(items: any, filter: any): any {
    if (!items || !filter) {
      return items;
    }
    else {
      var temparray = items;
      this.cityArray = temparray.filter(item =>
        item.name.toLowerCase().includes(filter.toLowerCase()));
      if (this.cityArray.length == 0) {
        return this.tempvar;
      }
      else {
        return this.cityArray;
      }

    }
  }

}

