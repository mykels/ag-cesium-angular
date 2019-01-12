import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {APP_COMPONENTS} from './components';
import {BrowserModule} from '@angular/platform-browser';
import {CoreModule} from '../core/core.module';
import {APP_SERVICES} from './services';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    RouterModule.forRoot([]),
  ],
  exports: [],
  declarations: [
    ...APP_COMPONENTS,
  ],
  providers: [
    ...APP_SERVICES
  ],
  bootstrap: [
    ...APP_COMPONENTS
  ],
})
export class AppModule {
}
