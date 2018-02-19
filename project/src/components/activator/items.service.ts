import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

import {ITEMS} from './mock-items'
import {Item} from "./item";

@Injectable()
export class ItemsService {

  constructor() {
  }

  public getItems(): Observable<Item[]> {
    return of(ITEMS);
  }

}
