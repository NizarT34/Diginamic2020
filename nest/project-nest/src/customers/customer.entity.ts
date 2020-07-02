
import { PrimaryGeneratedColumn, Entity, Column} from 'typeorm';

@Entity()
export class Customer{

  @PrimaryGeneratedColumn() 
  id:number;

  @Column({length: 50})
  firstname: string;

  @Column({length: 50})
  lastname: string;

  @Column({length: 120, nullable: true})
  email: string;

  toString(){
    return (`(${this.id}) (${this.firstname}) (${this.lastname}) (${this.email})`)
  }
  
}