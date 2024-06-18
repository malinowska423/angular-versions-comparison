import {User} from "./user.model";
import {TestsHelper} from "./tests.helper";

type DataPart = { front: User[], back: User[] };

export abstract class AbstractTestsService {
  abstract readonly version: string;
  protected readonly _simulations: { name: string, fn: () => void }[] = [
    {name: 'Load data', fn: () => this._runLoadDataSimulation()},
    {name: 'Load next page', fn: () => this._runLoadNextPageSimulation()},
    {name: 'Load previous page', fn: () => this._runLoadPreviousPageSimulation()},
    {name: 'Expand all', fn: () => this._runExpandAllSimulation()},
    {name: 'Collapse all', fn: () => this._runCollapseAllSimulation()},
    {name: 'Single property update', fn: () => this._runPropertyUpdateSimulation()},
    {name: 'Object update', fn: () => this._runObjectUpdateSimulation()},
    {name: 'Sort change', fn: () => this._runSortChangeSimulation()},
    {name: 'Filter change', fn: () => this._runFilterChangeSimulation()},
  ];

  protected _data: User[] = [];
  protected readonly _RECORDS = 10000;

  abstract setData(value: User[]): void;


  constructor() {
    fetch('http://localhost:3000')
      .then(response => response.json())
      .then((data: User[]) => this._data = data);
  }

  downloadResultsCSV(): void {
    TestsHelper.downloadResultsCSV(this.version);
  }

  clearResults(): void {
    TestsHelper.clearResults();
  }

  private __getDataPart(records: number = this._RECORDS): DataPart {
    return {front: this._data.slice(0, records), back: this._data.slice(records, records * 2)};
  }

  protected _runTest(
    records: number = this._RECORDS,
    name: string,
    initData: User[],
    testData: User[]
  ): void {
    TestsHelper.runTest(`${this.version}-${name}-${records}`, () => this.setData(initData), () => this.setData(testData));
  }

  protected _runLoadDataSimulation(records: number = this._RECORDS): void {
    const {front, back} = this.__getDataPart(records);
    this._runTest( records, 'loadData', [], front);
  }

  protected _runLoadNextPageSimulation(records: number = this._RECORDS): void {
    const {front, back} = this.__getDataPart(records);
    const testData = front.concat(back);
    this._runTest( records, 'loadNextPage', front, testData);
  }

  protected _runLoadPreviousPageSimulation(records: number = this._RECORDS): void {
    const {front, back} = this.__getDataPart(records);
    const testsData = front.concat(back);
    this._runTest( records, 'loadPreviousPage', back, testsData);
  }


  protected _runExpandAllSimulation(records: number = this._RECORDS): void {
    const {front, back} = this.__getDataPart(records);
    const testData = front.reduce((acc: User[], row: User, currentIndex: number) => acc.concat(row, back[currentIndex]), [])
    this._runTest( records,
      'expandAll',
      front,
      testData
    );
  }

  protected _runCollapseAllSimulation(records: number = this._RECORDS): void {
    const {front, back} = this.__getDataPart(records);
    const initData = front.concat(back);
    const testData = initData.filter((_, index: number) => index % 2 === 0);
    this._runTest( records, 'collapseAll', initData, testData);
  }

  protected _runPropertyUpdateSimulation(records: number = this._RECORDS): void {
    const {front, back} = this.__getDataPart(records);
    const testData = front.map((row: User) => ({...row, is_active: false}));
    this._runTest( records,
      'propertyUpdate',
      front,
      testData
    );
  }

  protected _runObjectUpdateSimulation(records: number = this._RECORDS): void {
    const {front, back} = this.__getDataPart(records);
    const testData = front.map((row: User, index: number) => ({...back[index], id: row.id}));
    this._runTest( records,
      'objectUpdate',
      front,
      testData
    );
  }

  protected _runSortChangeSimulation(records: number = this._RECORDS): void {
    const {front, back} = this.__getDataPart(records);
    const testData = [...front];
    testData.reverse();
    this._runTest( records,
      'sortChange',
      front,
      testData
    );
  }

  protected _runFilterChangeSimulation(records: number = this._RECORDS): void {
    const {front, back} = this.__getDataPart(records);
    const testData = front.filter((row: User) => row.is_active);
    this._runTest( records,
      'filterChange',
      front,
      testData
    );
  }
}
