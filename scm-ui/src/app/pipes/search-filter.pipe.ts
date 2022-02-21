import { Pipe, PipeTransform } from '@angular/core';
import { DublinBikesData } from '../models/DublinBikesData';

/*
* Pipe created to filter out usernames from the list of users in the find-user component
*/
@Pipe({ name: 'searchFilter' })
export class SearchFilterPipe implements PipeTransform {
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
      return it.name.toLocaleLowerCase().includes(searchText);
    });
  }
}

type PipeInput = DublinBikesData;

