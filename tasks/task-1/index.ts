// REFACTORED CODE BELOW

// data.service.ts
@Injectable({ providedIn: 'root' })
export class dataService {
  private readonly http = inject(HttpClient);

  readonly data$ = this.getdata();

  private getdata(): Observable<Data[]> {
    return this.http.get<Data[]>('/data');
  }
}

// data.component.ts
@Component({
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe],
  template: `
    <ng-container *ngIf="data$ | async as data">
      <h1>{{ data.length }}</h1>
      <ul>
        <li *ngFor="let Data of data">
          {{ Data.title }}
        </li>
      </ul>
    </ng-container>
  `
})
export class dataComponent {
  private readonly dataService = inject(dataService);

  readonly data$ = this.dataService.data$;
}