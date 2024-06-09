import {Injectable, signal, WritableSignal} from "@angular/core";
import {TestsHelper} from "../../../../common/tests.helper";
import {User} from "../../../../common/user.model";
import usersData from "../../../../common/users.json";

type DataPart = { front: User[], back: User[] };

@Injectable()
export class TestsService {
  // private readonly _data$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  // readonly data$: Observable<User[]> = this._data$.asObservable();
  private readonly _simulations: { name: string, fn: () => void }[] = [
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
  readonly simulations = signal(this._simulations);

  readonly users: WritableSignal<User[]> = signal<User[]>([]);
  private readonly _dataKey: string = 'v17';
  private readonly _data: DataPart;

  private set data(value: User[]) {
    this.users.set([...value]);
  }

  private get data(): User[] {
    return this.users();
  }

  constructor() {
    const data: User[] = usersData as User[];
    this._data = {front: data.slice(0, 10000), back: data.slice(10000, 20000)}
  }

  downloadResultsCSV(): void {
    TestsHelper.downloadResultsCSV(this._dataKey);
  }

  clearResults(): void {
    TestsHelper.clearResults();
  }

  private _runTest(
    name: string,
    initFn: () => void,
    testFn: () => void,
  ): void {
    TestsHelper.runTest(`${this._dataKey}-${name}`, initFn, testFn);
  }

  private _runLoadDataSimulation(): void {
    this._runTest('loadData', () => this.data = [], () => this.data = this._data.front);
  }

  private _runLoadNextPageSimulation(): void {
    this._runTest('loadNextPage', () => this.data = this._data.front, () => this.data = this.data.concat(this._data.back));
  }

  private _runLoadPreviousPageSimulation(): void {
    this._runTest('loadPreviousPage', () => this.data = this._data.back, () => {
      const data = [...this.data];
      data.splice(0, 0, ...this._data.front);
      this.data = data;
    });
  }


  private _runExpandAllSimulation(): void {
    this._runTest(
      'expandAll',
      () => this.data = this._data.front,
      () => this.data = this.data.reduce((acc: User[], row: User, currentIndex: number) => acc.concat(row, this._data.back[currentIndex]), [])
    );
  }

  private _runCollapseAllSimulation(): void {
    this._runTest('collapseAll', () => this.data = this._data.front.concat(this._data.back), () => this.data = this.data.filter((_, index: number) => index % 2 === 0));
  }

  private _runSinglePropertyUpdateSimulation(): void {
    this._runTest(
      'singlePropertyUpdate',
      () => this.data = this._data.front,
      () => this.data = this.data.map((row: User) => ({...row, is_active: false}))
    );
  }

  private _runObjectUpdateSimulation(): void {
    this._runTest(
      'objectUpdate',
      () => this.data = this._data.front,
      () => this.data = this.data.map((row: User, index: number) => ({...this._data.back[index], id: row.id}))
    );
  }

  private _runSortChangeSimulation(): void {
    this._runTest(
      'sortChange',
      () => this.data = this._data.front,
      () => this.data = this.data.reduce((acc: User[], row: User, index: number) => {
        acc.splice(0, 0, row);
        return acc;
      }, [])
    );
  }

  private _runFilterChangeSimulation(): void {
    this._runTest(
      'filterChange',
      () => this.data = this._data.front,
      () => this.data = this.data.filter((row: User) => row.is_active)
    );
  }
}
