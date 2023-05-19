import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Response,
} from '@nestjs/common';
import { Book } from '@tmo/shared/models';
import { ReadingListService } from './reading-list.service';

@Controller()
export class ReadingListController {
  constructor(private readonly readingList: ReadingListService) {}

  @Get('/reading-list/')
  async getReadingList() {
    return await this.readingList.getList();
  }

  @Post('/reading-list/')
  async addToReadingList(@Body() item: Book) {
    return await this.readingList.addBook(item);
  }

  @Delete('/reading-list/:id')
  async removeFromReadingList(@Param() params, @Response() res) {
    const id = await this.readingList.removeBook(params.id);
    return res.status(HttpStatus.OK).json(id);
  }

  @Put('/reading-list/:id/finished')
  async updateReadingListStatus(@Param() params) {
    return await this.readingList.updateBook(params.id);
  }
}
