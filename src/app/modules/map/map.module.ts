import {NgModule} from '@angular/core';
import {MAP_COMPONENTS} from './components';
import {MapRoutingModule} from './map.module.routing';
import {CommonModule} from '@angular/common';
import {MAP_SERVICES} from './services';

@NgModule({
  imports: [
    CommonModule,
    MapRoutingModule,
  ],
  declarations: [
    ...MAP_COMPONENTS
  ],
  providers: [
    ...MAP_SERVICES
  ],
  exports: []
})
export class MapModule {
}
