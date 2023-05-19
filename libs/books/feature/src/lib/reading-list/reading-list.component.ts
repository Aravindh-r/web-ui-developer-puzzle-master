import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  getReadingList,
  removeFromReadingList,
} from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss'],
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store, private _snackBar: MatSnackBar) {}

  openRemoveBookSnackBar(item): void {
    this.removeFromReadingList(item);
    const _snackBarRef = this._snackBar.open('Removed', 'Undo', {
      duration: 3000,
    });
    const { bookId, ...rest } = item;
    const book = {
      ...rest,
      id: bookId,
    };
    _snackBarRef.onAction().subscribe(() => {
      this.store.dispatch(addToReadingList({ book }));
    });
  }

  removeFromReadingList(item): void {
    this.store.dispatch(removeFromReadingList({ item }));
  }
}
