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
    {name: 'Single property update', fn: () => this._runSinglePropertyUpdateSimulation()},
    {name: 'Object update', fn: () => this._runObjectUpdateSimulation()},
    {name: 'Sort change', fn: () => this._runSortChangeSimulation()},
    {name: 'Filter change', fn: () => this._runFilterChangeSimulation()},
  ];

  protected _data: DataPart = {front: [], back: []};

  protected abstract set data(value: User[]);
  protected abstract get data(): User[];

  constructor() {
    const records: number = TestsHelper.RECORDS;
    fetch('http://localhost:3000')
      .then(response => response.json())
      .then((data: User[]) => this._data = {
        front: data.slice(0, records),
        back: data.slice(records, records * 2)
      });
  }

  downloadResultsCSV(): void {
    TestsHelper.downloadResultsCSV(this.version);
  }

  clearResults(): void {
    TestsHelper.clearResults();
  }

  protected _runTest(
    name: string,
    initFn: () => void,
    testFn: () => void,
  ): void {
    TestsHelper.runTest(`${this.version}-${name}`, initFn, testFn);
  }

  protected _runLoadDataSimulation(): void {
    this._runTest('loadData', () => this.data = [], () => this.data = this._data.front);
  }

  protected _runLoadNextPageSimulation(): void {
    this._runTest('loadNextPage', () => this.data = this._data.front, () => this.data = this.data.concat(this._data.back));
  }

  protected _runLoadPreviousPageSimulation(): void {
    this._runTest('loadPreviousPage', () => this.data = this._data.back, () => {
      const data = [...this.data];
      data.splice(0, 0, ...this._data.front);
      this.data = data;
    });
  }


  protected _runExpandAllSimulation(): void {
    this._runTest(
      'expandAll',
      () => this.data = this._data.front,
      () => this.data = this.data.reduce((acc: User[], row: User, currentIndex: number) => acc.concat(row, this._data.back[currentIndex]), [])
    );
  }

  protected _runCollapseAllSimulation(): void {
    this._runTest('collapseAll', () => this.data = this._data.front.concat(this._data.back), () => this.data = this.data.filter((_, index: number) => index % 2 === 0));
  }

  protected _runSinglePropertyUpdateSimulation(): void {
    this._runTest(
      'singlePropertyUpdate',
      () => this.data = this._data.front,
      () => this.data = this.data.map((row: User) => ({...row, is_active: false}))
    );
  }

  protected _runObjectUpdateSimulation(): void {
    this._runTest(
      'objectUpdate',
      () => this.data = this._data.front,
      () => this.data = this.data.map((row: User, index: number) => ({...this._data.back[index], id: row.id}))
    );
  }

  protected _runSortChangeSimulation(): void {
    this._runTest(
      'sortChange',
      () => this.data = this._data.front,
      () => this.data = this.data.reduce((acc: User[], row: User, index: number) => {
        acc.splice(0, 0, row);
        return acc;
      }, [])
    );
  }

  protected _runFilterChangeSimulation(): void {
    this._runTest(
      'filterChange',
      () => this.data = this._data.front,
      () => this.data = this.data.filter((row: User) => row.is_active)
    );
  }
}
