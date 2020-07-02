
import { PrimaryGeneratedColumn, Entity, Column} from 'typeorm';

@Entity()
export class Company{

  @PrimaryGeneratedColumn() 
  id:number;

  @Column({length: 50})
  name: string;
  
}

