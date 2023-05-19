import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  createBook,
  createReadingListItem,
  SharedTestingModule,
} from '@tmo/shared/testing';

import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';
import { Store } from '@ngrx/store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { addToReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
  let store: Store;
  let snackBar: MatSnackBar;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, SharedTestingModule, NoopAnimationsModule],
      providers: [Store, MatSnackBar],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    snackBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove book from reading list', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const book = createReadingListItem('A');
    component.openRemoveBookSnackBar(book);
    const item = createReadingListItem('A');
    expect(dispatchSpy).toHaveBeenCalledWith(removeFromReadingList({ item }));
  });

  it('should remove book from reading list and undo using snack bar', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const readingBook = createReadingListItem('A');
    const book = createBook('A');
    component.openRemoveBookSnackBar(readingBook);
    const item = createReadingListItem('A');
    expect(dispatchSpy).toHaveBeenCalledWith(removeFromReadingList({ item }));
    fixture.detectChanges();
    const snackingDivButton = document.querySelector(
      'div.mat-simple-snackbar-action button'
    );
    const mouseEvent = new MouseEvent('click');
    snackingDivButton.dispatchEvent(mouseEvent);
    expect(dispatchSpy).toHaveBeenCalledWith(addToReadingList({ book }));
  });
});
