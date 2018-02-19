import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {DndModule} from 'ng2-dnd';

import {AppComponent} from './app.component';
import {ActivatorComponent} from "../components/activator/activator.component";
import {ItemsService} from "../components/activator/items.service";
import {NameFilterPipe} from "../pipes/name-filter.pipe";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    ActivatorComponent,
    NameFilterPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DndModule.forRoot()
  ],
  providers: [ItemsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
