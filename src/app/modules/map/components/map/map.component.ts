import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EntityRenderer, MapConfig, MapInitializer, RasterLoader } from 'ag-cesium';
import { ConfigService } from '../../../core/services/config/config.service';
import { EntitySimulatorService } from '../../services/entity-simulator.service';

@Component({
  selector: 'agc-map',
  template: '<div id="main-map" class="map-container"></div>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit {
  constructor(private configService: ConfigService,
              private entitySimulator: EntitySimulatorService) {
  }

  ngOnInit(): void {
    const mapConfig: MapConfig = this.configService.getMapConfig();

    MapInitializer.init(mapConfig, 'main-map');

    this.entitySimulator.simulate({entityCount: 200, updateInterval: 500})
    .subscribe(EntityRenderer.render);

    console.log('MapComponent [initialized]');
  }
}
