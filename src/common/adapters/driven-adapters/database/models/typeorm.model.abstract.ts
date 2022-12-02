import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';

export abstract class AbstractTypeOrmModel {
  constructor(details?: unknown) {
    if (details) {
      Object.assign(this, details);
    }
  }

  @PrimaryColumn({ update: false })
  id: string;

  @CreateDateColumn({
    type: 'timestamptz',
    update: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
  })
  updatedAt: Date;
}
