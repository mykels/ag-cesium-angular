import {APP_INITIALIZER} from '@angular/core';
import {ConfigService} from '../../core/services/config/config.service';
import {HttpClient} from '@angular/common/http';

const CONFIG_INITIALIZER = {
  provide: APP_INITIALIZER,
  useFactory: (configService: ConfigService) => () => configService.init(),
  deps: [ConfigService, HttpClient],
  multi: true
};

export const APP_SERVICES = [
  ConfigService,
  CONFIG_INITIALIZER
];
