import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Author } from '../../author/entity/author.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ type: 'int' })
  votes: number;

  @Column({ type: 'int' })
  authorId: number;

  @ManyToOne(() => Author, (author) => author.posts, { nullable: true })
  @JoinColumn({ name: 'authorId' })
  author?: Author;
}
