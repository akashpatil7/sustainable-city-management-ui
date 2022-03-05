import { Pipe, PipeTransform } from '@angular/core';
import { AqiData } from '../models/AqiData';

/*
* Pipe created to filter out usernames from the list of users in the find-user component
*/
@Pipe({ name: 'aqiSearchFilter' })
export class AqiSearchFilterPipe implements PipeTransform {
  /**
   * Transform
   *
   * @param {string} searchText
   * @returns {any[]}
   */
  transform(items: PipeInput[], searchText: string): any[] {

    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    // used in real-time-data dashboard component
    return items.filter(it => {
      return it.station.name.toLocaleLowerCase().includes(searchText);
    });
  }
}

type PipeInput = AqiData;

