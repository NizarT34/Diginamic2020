import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Company } from './company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesService extends TypeOrmCrudService<Company>{

  constructor(@InjectRepository(Company) companyRespository: Repository<Company>){
    super((companyRespository));
  }


}
