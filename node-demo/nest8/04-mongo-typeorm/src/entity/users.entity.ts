/*
 * @Author: your name
 * @Date: 2022-02-27 14:46:07
 * @Description: file content
 */
import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectID } from 'mongodb';

@Entity('myUsers')
export class Users {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column()
  filename: string;

  @Column('int')
  views: number;

  @Column()
  isPublished: boolean;
}
