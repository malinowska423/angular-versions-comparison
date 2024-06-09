import {Injectable} from "@angular/core";
import {User} from "../../../common/user.model";
import {AbstractTestsService} from "../../../common/tests.service.abstract";
import {BehaviorSubject, Observable, of} from "rxjs";


@Injectable()
export class TestsService extends AbstractTestsService {
  readonly version: string = 'v15';

  private readonly _users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  readonly users$: Observable<User[]> = this._users$.asObservable();

  readonly simulations$ = of(this._simulations);

  protected set data(value: User[]) {
    this._users$.next([...value]);
  }

  protected get data(): User[] {
    return this._users$.value;
  }
}
