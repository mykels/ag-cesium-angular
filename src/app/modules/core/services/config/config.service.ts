import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Config, MapConfig} from 'ag-cesium';
import {Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';

const CONFIG_ROOT_PATH: string = '/assets/config/';
const LOCAL_PREFIX: string = 'dev';

@Injectable()
export class ConfigService {
  private config: Config;

  constructor(private http: HttpClient) {
  }

  init(): Promise<Config> {
    const configPath: string = this.getConfigPath();
    const config$: Observable<Object> = this.http.get(configPath);
    config$.subscribe((config: Config) => this.config = config);

    return config$.toPromise().then((config: Config) => {
      console.log(`ConfigService [initialized] on [${environment.name}] environment`);
      return config;
    });
  }

  getConfig(): Config {
    return this.config;
  }

  getMapConfig(): MapConfig {
    return this.config.map;
  }

  private getConfigPath(): string {
    const configSuffix: string = this.isLocalEnvironment() ? '' : `-${environment.name}`;
    return `${CONFIG_ROOT_PATH}config${configSuffix}.json`;
  }

  private isLocalEnvironment(): boolean {
    return environment.name === LOCAL_PREFIX;
  }
}
