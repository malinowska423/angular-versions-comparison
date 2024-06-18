import {Injectable, signal, WritableSignal} from "@angular/core";
import {User} from "../../../common/user.model";
import {AbstractTestsService} from "../../../common/tests.service.abstract";

@Injectable()
export class TestsService extends AbstractTestsService {
  readonly version: string = 'v17';
  readonly simulations = signal(this._simulations);
  readonly users: WritableSignal<User[]> = signal<User[]>([]);

  setData(value: User[]): void {
    this.users.set([...value]);
  }
}
