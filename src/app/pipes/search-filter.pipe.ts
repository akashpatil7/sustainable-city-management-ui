import { Pipe, PipeTransform } from '@angular/core';
import { DublinBikesData } from '../models/DublinBikesData';
import { PedestrianData } from '../models/PedestrianData';
import { AqiData } from '../models/AqiData';

/*
* Pipe created to filter out usernames from the list of users in the find-user component
*/
@Pipe({ name: 'searchFilter' })
export class SearchFilterPipe implements PipeTransform {
  /**
   * Transform
   *
   * @param {any[]} items
   * @param {string} searchText
   * @returns {any[]}
   */
  transform(items: PipeInput[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    // used in real-time-data dashboard component
    return items.filter(it => {
      if ("name" in it) {
        return it.name.toLocaleLowerCase().includes(searchText);
      }
      else if ("street" in it) {
        return it.street.toLocaleLowerCase().includes(searchText);
      }
      else if ("station" in it) {
        console.log("aqi is read");
        return it.station.name.toLocaleLowerCase().includes(searchText);
      }
      else {
        console.log("not instance of any known data source")
        return;
      }
    });
  }
}

type PipeInput = DublinBikesData | PedestrianData | AqiData;

