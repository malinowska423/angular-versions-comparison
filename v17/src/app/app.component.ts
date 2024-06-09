import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TestsService} from "./services/tests.service";

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TestsService],
  template: `
    <h1>Angular v17 Performance Tests</h1>
    <h3>Data ready: {{testsService.dataReady()}}</h3>
    <div style="display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 24px">
      @for (simulation of testsService.simulations(); track simulation.name) {
        <button (click)="simulation.fn()">Run {{ simulation.name }} Simulation</button>
      }
      <button (click)="testsService.downloadResultsCSV()">Download results CSV</button>
      <button (click)="testsService.clearResults()">Clear results</button>
    </div>

    @for (user of testsService.users(); track user.id) {
      <p>
        <span>{{ user.id }}</span> -
        <span>{{ user.name }}</span> -
        <span>{{ user.phone }}</span> -
        <span>{{ user.email }}</span> -
        <span>{{ user.city }}</span> -
        <span>{{ user.country }}</span> -
        <span>{{ user.is_active }}</span>
      </p>
    }
  `
})
export class AppComponent {
  constructor(public testsService: TestsService) {
  }
}
