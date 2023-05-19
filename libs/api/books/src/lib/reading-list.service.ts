import { Injectable } from '@nestjs/common';
import { StorageService } from '@tmo/shared/storage';
import { Book, ReadingListItem } from '@tmo/shared/models';

const KEY = '[okreads API] Reading List';

@Injectable()
export class ReadingListService {
  private readonly storage = new StorageService<ReadingListItem[]>(KEY, []);

  async getList(): Promise<ReadingListItem[]> {
    return this.storage.read();
  }

  async addBook(b: Book): Promise<ReadingListItem> {
    const { id, ...rest } = b;
    const newBook = {
      bookId: b.id,
      ...rest,
    };
    this.storage.update((list) => {
      list.push(newBook);
      return list;
    });
    return newBook;
  }

  async removeBook(id: string): Promise<string> {
    this.storage.update((list) => {
      return list.filter((x) => x.bookId !== id);
    });
    return id;
  }
}
