import { of as observableOf, empty as observableEmpty, Observable } from 'rxjs';
import {filter, switchMap, withLatestFrom} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {Action, Store} from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import * as fromRoot from '../reducers';
import * as headerActions from '../actions/headers/headers';

@Injectable()
export class HeadersEffects {

  @Effect()
  spreadAuthorizationHeaderValue$: Observable<Action> = this.actions$
    .pipe(
      ofType(headerActions.EDIT_HEADER_VALUE),
      withLatestFrom(this.store, (action: headerActions.EditHeaderValueAction, state) => {
        return { windows: state.windows, payload: action.payload, header: state.windows[action.windowId].headers[action.payload.i] };
      }),
      filter(data => /Authorization/i.test(data.header.key)),
      switchMap(data => {
        let windowId;
        let authorizationHeader;
        Object.values(data.windows).forEach(_window => {
          const i = _window.headers.findIndex(h => /Authorization/i.test(h.key));
          if (_window.headers[i].value !== data.payload.val) {
            windowId = _window.windowId;
            authorizationHeader = { i: i, val: data.payload.val };
          }
        });

        if (authorizationHeader && windowId) {
          return observableOf(new headerActions.EditHeaderValueAction(authorizationHeader, windowId));
        } else {
          return observableEmpty();
        }
      })
    );

  constructor(
    private actions$: Actions,
    private store: Store<fromRoot.State>
  ) {}
}
