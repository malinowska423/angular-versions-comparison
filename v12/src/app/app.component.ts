import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TestsService} from "./tests.service";

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TestsService],
  template: `
    <h1>Angular {{ testsService.version }} Performance Tests</h1>
    <div style="display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 24px">
      <button *ngFor="let simulation of testsService.simulations$ | async" (click)="simulation.fn()">
        Run {{ simulation.name }} Simulation
      </button>
      <button (click)="testsService.downloadResultsCSV()">Download results CSV</button>
      <button (click)="testsService.clearResults()">Clear results</button>
    </div>

    <p *ngFor="let user of testsService.users$ | async">
      <span>{{ user.id }}</span> -
      <span>{{ user.name }}</span> -
      <span>{{ user.phone }}</span> -
      <span>{{ user.email }}</span> -
      <span>{{ user.city }}</span> -
      <span>{{ user.country }}</span> -
      <span>{{ user.is_active }}</span>
    </p>
  `
})
export class AppComponent {
  constructor(public testsService: TestsService) {
  }
}
