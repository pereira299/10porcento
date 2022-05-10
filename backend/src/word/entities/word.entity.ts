import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('words')
export class Word {
  @PrimaryColumn({ generated: 'increment', type: 'int', nullable: false })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  term: string;

  @Column({ type: 'varchar', nullable: false })
  term_formatted: string;

  @Column({ type: 'int', nullable: false })
  category_id: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  count_typed: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
