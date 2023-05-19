import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as ReadingListActions from './reading-list.actions';
import { ReadingListItem } from '@tmo/shared/models';

export const READING_LIST_FEATURE_KEY = 'readingList';

export interface State extends EntityState<ReadingListItem> {
  loaded: boolean;
  error: null | string;
}

export interface ReadingListPartialState {
  readonly [READING_LIST_FEATURE_KEY]: State;
}

export const readingListAdapter: EntityAdapter<ReadingListItem> = createEntityAdapter<
  ReadingListItem
>({
  selectId: (item) => item.bookId,
});

export const initialState: State = readingListAdapter.getInitialState({
  loaded: false,
  error: null,
});

const readingListReducer = createReducer(
  initialState,
  on(ReadingListActions.init, (state) => {
    return {
      ...state,
      loaded: false,
      error: null,
    };
  }),
  on(ReadingListActions.loadReadingListSuccess, (state, action) => {
    return readingListAdapter.setAll(action.list, {
      ...state,
      loaded: true,
    });
  }),
  on(ReadingListActions.loadReadingListError, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(ReadingListActions.confirmedAddToReadingList, (state, action) =>
    readingListAdapter.addOne({ ...action.item }, state)
  ),
  on(ReadingListActions.confirmedRemoveFromReadingList, (state, action) =>
    readingListAdapter.removeOne(action.bookId, state)
  ),
  on(
    ReadingListActions.confirmedFinishedStatusOfReadingBook,
    (state, action) => {
      return readingListAdapter.updateOne(action.updatedItem, state);
    }
  ),
  on(
    ReadingListActions.failedToUpdateFinishStatusReadingBook,
    (state, action) => {
      return {
        ...state,
        error: action.error,
      };
    }
  )
);

export function reducer(state: State | undefined, action: Action) {
  return readingListReducer(state, action);
}
