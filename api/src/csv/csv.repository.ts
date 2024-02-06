import { Collection, Db, ObjectId } from 'mongodb';
import { Inject, Injectable } from '@nestjs/common';

import { DI } from '../di';
import { FileEntity, CSVRepository, FileEntityState } from '../types';

@Injectable()
export class MongoCSVRepository implements CSVRepository {
  private collection: Collection<FileEntity>;

  constructor(@Inject(DI.DB) db: Db) {
    this.collection = db.collection<FileEntity>('files');
  }

  async insertFile(data: Omit<FileEntity, '_id'>): Promise<FileEntity> {
    const { insertedId } = await this.collection.insertOne({
      _id: new ObjectId().toHexString(),
      ...data,
    });

    return this.getFileById(insertedId);
  }

  getFileById(id: string): Promise<FileEntity> {
    return this.collection.findOne({ _id: id });
  }

  async setFileStateById(
    id: string,
    state: FileEntityState
  ): Promise<FileEntity> {
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
}
