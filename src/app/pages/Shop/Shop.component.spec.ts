import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShopComponent } from './Shop.component';
import { DataServiceService } from 'src/app/data-service.service';
import { Title } from '@angular/platform-browser';
import { ModelInfo } from 'src/app/interfaces/modelInfo';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ColorPickerModule } from 'ngx-color-picker';

describe('ShopComponent', () => {
  let component: ShopComponent;
  let fixture: ComponentFixture<ShopComponent>;
  let dataService: DataServiceService;
  let titleService: Title;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopComponent],
      imports: [ColorPickerModule],
      providers: [
        DataServiceService,
        { provide: Title, useClass: MockTitleService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataServiceService);
    titleService = TestBed.inject(Title);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the document title on initialization', () => {
    expect(titleService.getTitle()).toBe('Model Colour Visualiser');
  });

  it('should initialize with saved model data from localStorage', () => {
    const savedModel: ModelInfo = { model: 'savedModel', colour: 'blue' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(savedModel));

    component.ngOnInit();

    expect(component.savedModelData).toEqual(savedModel);
    expect(component.color).toBe('blue');
  });

  it('should initialize with empty model if no data in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    component.ngOnInit();

    expect(component.savedModelData).toEqual(component.emptyModel);
    expect(component.color).toBe('');
  });

  it('should call setData on dataService with correct data', () => {
    const testData: ModelInfo = { model: 'testModel', colour: 'red' };
    const spy = spyOn(dataService, 'setData');

    component.sendData(testData);

    expect(spy).toHaveBeenCalledWith(testData);
  });

  it('should create modelData and call sendData in selector method', () => {
    component.color = 'green';
    const spy = spyOn(component, 'sendData');

    component.selector();

    expect(component.assetName).toBe('keyboard');
    expect(component.modelData).toEqual({ model: 'keyboard', colour: 'green' });
    expect(spy).toHaveBeenCalledWith(component.modelData);
  });
});

class MockTitleService {
  private title = '';

  setTitle(newTitle: string) {
    this.title = newTitle;
  }

  getTitle() {
    return this.title;
  }
}
