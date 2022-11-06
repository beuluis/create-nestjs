import { ApiProperty } from '@nestjs/swagger';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    Unique,
} from 'typeorm';

@Entity()
@Unique(['id'])
export class Cat {
    public constructor(name: string) {
        this.name = name;
    }

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    @ApiProperty({
        example: '2022-09-24T16:53:17.721Z',
    })
    public createdAt: Date;

    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ example: '5568e476-3431-4f29-bfd6-fca460d0c971' })
    public id: string;

    @Column()
    @ApiProperty({
        example: 'Finn',
    })
    public name: string;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    @ApiProperty({
        example: '2022-09-24T16:53:17.721Z',
    })
    public updatedAt: Date;
}
