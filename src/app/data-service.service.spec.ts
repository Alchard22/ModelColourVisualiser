import { TestBed } from '@angular/core/testing';
import { DataServiceService } from './data-service.service';
import { ModelInfo } from './interfaces/modelInfo';
import { take } from 'rxjs/operators';

describe('DataServiceService', () => {
  let service: DataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the default empty model initially', (done: DoneFn) => {

    const expectedModel: ModelInfo = {
      model: '',
      colour: ''
    };

    service.getData().pipe(take(1)).subscribe(data => {

      expect(data).toEqual(expectedModel);
      done();
    });
  });

  it('should set and get the data correctly', (done: DoneFn) => {

    const newModel: ModelInfo = {
      model: 'TestModel',
      colour: 'TestColour'
    };

    service.setData(newModel);
    
    service.getData().pipe(take(1)).subscribe(data => {

      expect(data).toEqual(newModel);
      done();
    });
  });
});
