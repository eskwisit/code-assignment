// REFACTORED CODE

// songs.actions.ts
import { createAction, props } from '@ngrx/store';

export const loadSongs = createAction('[Songs] Load Songs');
export const loadSongsSuccess = createAction('[Songs] Load Songs Success', props<{ songs: Song[] }>());
export const loadSongsError = createAction('[Songs] Load Songs Error', props<{ errorMsg: string }>());
export const songsActions = {
  loadSongs,
  loadSongsSuccess,
  loadSongsError,
};

// songs.component.ts
@Component(/* ... */)
export class SongsComponent implements OnInit {
  private readonly store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(songsActions.loadSongs());
  }
}

// songs.effects.ts
@Injectable()
export class SongsEffects {
  private readonly actions$ = inject(Actions);
  private readonly songsService = inject(SongsService);

  constructor(private store: Store) {}

  readonly loadSongs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(songsActions.loadSongs),
      withLatestFrom(this.store.select(selectSongs)),
      filter(([action, songs]) => songs === null),
      exhaustMap(() => {
        return this.songsService.getAll().pipe(
          map((songs) => songsActions.loadSongsSuccess({ songs })),
          catchError((error: HttpErrorResponse) =>
            of(songsActions.loadSongsError({ errorMsg: error.message }))
          )
        );
      })
    );
  });
}
