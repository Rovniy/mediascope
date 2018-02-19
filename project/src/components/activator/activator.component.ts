import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Item} from "./item";
import {ItemsService} from "./items.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'activator',
  templateUrl: './activator.component.html',
  styleUrls: ['./activator.component.less']
})
export class ActivatorComponent implements OnInit, OnDestroy {

  @Output()
  onActivate = new EventEmitter<Item>();
  @Output()
  onDeactivate = new EventEmitter<Item>();

  public searchText: string;
  public activatedSearchText: string;

  public items$: Observable<Item[]>;
  public activatedItems$: Observable<Item[]>;

  private items: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);
  private activatedItems: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);
  private subs: Subscription[] = [];

  constructor(private itemsService: ItemsService) {
  }

  ngOnInit(): void {
    this.items$ = this.items.asObservable();
    this.activatedItems$ = this.activatedItems.asObservable();

    this.subs.push(
      this.itemsService.getItems().subscribe((items: Item[]) => {
        this.items.next(items);
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }

  public activateSelectedItems(ev: any): void {
    this.moveItems(this.items, this.activatedItems, this.onActivate);
  }

  public deactivateSelectedItems(): void {
    this.moveItems(this.activatedItems, this.items, this.onDeactivate);
  }

  private moveItems(source: BehaviorSubject<Item[]>, target: BehaviorSubject<Item[]>, onChanged: EventEmitter<Item>): void {
    const selectedItems: Item[] = [];
    const items: Item[] = [];
    source.getValue().forEach((item: Item) => {
      if (item.selected) {
        item.selected = false;
        selectedItems.push(item);
        onChanged.emit(item);
      } else {
        items.push(item);
      }
    });
    source.next(items);
    target.next(target.getValue().concat(selectedItems));
  }
}
