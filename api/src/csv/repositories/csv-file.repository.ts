import { Collection, Db, ObjectId } from 'mongodb';
import { Inject, Injectable } from '@nestjs/common';

import { DI } from '../../di';
import {
  CSVFileEntity,
  CSVFileRepository,
  CSVFileEntityState,
} from '../../types';

@Injectable()
export class MongoCSVFileRepository implements CSVFileRepository {
  private collection: Collection<CSVFileEntity>;

  constructor(@Inject(DI.DB) db: Db) {
    this.collection = db.collection<CSVFileEntity>('csv-files');
  }

  async insertFile(data: Omit<CSVFileEntity, '_id'>): Promise<CSVFileEntity> {
    const { insertedId } = await this.collection.insertOne({
      _id: new ObjectId().toHexString(),
      ...data,
    });

    return this.getFileById(insertedId);
  }

  getFileById(id: string): Promise<CSVFileEntity> {
    return this.collection.findOne({ _id: id });
  }

  async setFileStateById(
    id: string,
    state: CSVFileEntityState
  ): Promise<CSVFileEntity> {
    await this.collection.updateOne(
      { _id: id },
      {
        $set: {
          state,
        },
      }
    );

    return this.getFileById(id);
  }

  async setFileHeaderById(
    id: string,
    header: string[]
  ): Promise<CSVFileEntity> {
    await this.collection.updateOne(
      { _id: id },
      {
        $set: {
          header,
        },
      }
    );

    return this.getFileById(id);
  }

  async setFileCharts(id: string, charts: any[]): Promise<CSVFileEntity> {
    await this.collection.updateOne(
      { _id: id },
      {
        $set: {
          charts,
        },
      }
    );

    return this.getFileById(id);
  }
}
