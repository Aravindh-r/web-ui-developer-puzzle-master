import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  createBook,
  createReadingListItem,
  SharedTestingModule,
} from '@tmo/shared/testing';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { clearSearch, removeFromReadingList } from '@tmo/books/data-access';
import { MatSnackBar } from '@angular/material/snack-bar';
import { addToReadingList } from '@tmo/books/data-access';

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let formBuilder: FormBuilder;
  let store: Store;
  let snackBar: MatSnackBar;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BooksFeatureModule,
        NoopAnimationsModule,
        SharedTestingModule,
        NoopAnimationsModule,
      ],
      providers: [Store, MatSnackBar],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    formBuilder = TestBed.inject(FormBuilder);
    snackBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should call clear dispatach function', () => {
    const dispatachSpy = spyOn(store, 'dispatch');
    component.clearSearch();
    expect(dispatachSpy).toHaveBeenCalledWith(clearSearch());
  });

  it('should add book to reading list', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const book = createBook('A');
    component.openAddBookSnackBar(book);
    expect(dispatchSpy).toHaveBeenCalledWith(addToReadingList({ book }));
  });

  it('should add book to reading list and undo using snack bar', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const book = createBook('A');
    component.openAddBookSnackBar(book);
    expect(dispatchSpy).toHaveBeenCalledWith(addToReadingList({ book }));
    fixture.detectChanges();
    const snackingDivButton = document.querySelector(
      'div.mat-simple-snackbar-action button'
    );
    const mouseEvent = new MouseEvent('click');
    snackingDivButton.dispatchEvent(mouseEvent);
    const item = createReadingListItem('A');
    expect(dispatchSpy).toHaveBeenCalledWith(removeFromReadingList({ item }));
  });
});
