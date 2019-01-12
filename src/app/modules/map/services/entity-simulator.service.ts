import {Injectable} from '@angular/core';
import {Cartesian3, EGD, Position} from 'ag-cesium';
import {PositionConverter} from 'ag-cesium/dist/utils/position/position-converter';
import {BehaviorSubject, interval} from 'rxjs';
import {SimulationProperties} from '../types/simulation-properties';

@Injectable()
export class EntitySimulatorService {
  private entities: EGD[];
  private entities$: BehaviorSubject<EGD[]>;
  private simulationProperties: SimulationProperties;

  constructor() {
    this.entities$ = new BehaviorSubject<EGD[]>([]);
  }

  simulate(simulationProperties: SimulationProperties) {
    this.simulationProperties = simulationProperties;
    this.init();

    interval(simulationProperties.updateInterval).subscribe(this.simulateUpdates.bind(this));
    interval(simulationProperties.updateInterval * 2).subscribe(this.simulateDeletes.bind(this));

    return this.entities$;
  }

  private init() {
    this.entities = [];

    for (let i = 1; i <= this.simulationProperties.entityCount; i++) {
      this.entities.push(this.initEntity(i));
    }

    this.entities$.next(this.entities);
  }

  private initEntity(index: number): EGD {
    return {
      id: `entity_${index}`,
      billboards: [
        {
          id: `entity_${index}`,
          image: '/assets/images/uav.svg',
          scale: 0.15,
          color: Cesium.Color.fromCssColorString('#5bb2ff'),
          position: this.randomizePosition(),
          rotation: this.randomizeRotation(),
          show: true
        }
      ],
      show: true
    };
  }

  private simulateUpdates() {
    this.entities.forEach((egd: EGD) => {
      egd.billboards[0].position = this.randomizePosition();
    });

    this.entities$.next(this.entities);
  }

  private simulateDeletes() {
    const entityToDelete: EGD = this.entities[Math.floor(Math.random() * this.entities.length)];
    this.entities = this.entities.filter((entity: EGD) => entity.id !== entityToDelete.id);

    this.entities$.next(this.entities);
  }

  private randomizePosition(): Cartesian3 {
    const position: Position = {
      longitude: 30 + Math.random() * 10 * (Math.floor(Math.random() * 3) === 1 ? 1 : -1),
      latitude: 30 + Math.random() * 10 * (Math.floor(Math.random() * 3) === 1 ? 1 : -1),
      altitude: 250
    };

    return PositionConverter.degreesToCartesian(position);
  }

  private randomizeRotation(): number {
    return Math.floor(Math.random() * 360);
  }
}
