import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModelComponent } from './model.component';
import { DataServiceService } from '../data-service.service';
import { ModelInfo } from '../interfaces/modelInfo';
import { of } from 'rxjs';

describe('ModelComponent', () => {
  let component: ModelComponent;
  let fixture: ComponentFixture<ModelComponent>;
  let dataService: DataServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModelComponent],
      providers: [DataServiceService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataServiceService);

    const testingSpy = jasmine.createSpy('threeDModelStart');

    spyOn(dataService, 'getData').and.returnValue(of({ model: 'testModel', colour: '#ffffff' }));
    
    component.threeDModelStart = testingSpy;
    
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should respond to data changes from the data service', () => {
    const newModel: ModelInfo = { model: 'newModel', colour: '#00ff00' };
    (dataService.getData as jasmine.Spy).and.returnValue(of(newModel));

    dataService.getData().subscribe();

    fixture.detectChanges();

    expect(component.threeDModelStart).toHaveBeenCalled();
  });
});
