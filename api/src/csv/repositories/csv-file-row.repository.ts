import { Collection, Db, ObjectId } from 'mongodb';
import { Inject, Injectable } from '@nestjs/common';

import { DI } from '../../di';
import { CSVFileRowEntity, CSVFileRowRepository } from '../../types';

@Injectable()
export class MongoCSVFileRowRepository implements CSVFileRowRepository {
  private collection: Collection<CSVFileRowEntity>;

  constructor(@Inject(DI.DB) db: Db) {
    this.collection = db.collection<CSVFileRowEntity>('csv-file-rows');
  }

  insertFileRows(fileId: string, rows: any[]): Promise<CSVFileRowEntity[]> {
    const rowsLinkedToFile = rows.map((row) => ({
      ...row,
      _id: new ObjectId(),
      fileId,
    }));

    this.collection.insertMany(rowsLinkedToFile);

    return this.getFileRowsById(fileId);
  }

  getFileRowsById(fileId: string): Promise<CSVFileRowEntity[]> {
    return this.collection.find({ fileId }).toArray();
  }
}
