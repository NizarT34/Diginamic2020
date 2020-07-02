import { Controller, Get, Post, Put, Param, Delete, Body, ParseIntPipe, HttpStatus, HttpCode, UsePipes, ValidationPipe } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from './customer.entity';
import { CustomerDto } from './customer.dto';
import { CrudController } from '@nestjsx/crud';

@Controller('customers')
@UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true})) // whitelist c'est pour la dto de tous les élements décorés, forbidNonWhitelisted tout ce qui n'est pas autorisé est interdit
export class CustomersController{
  
  constructor(private customersDB : CustomersService){ //Cette syntaxe est équivalente à la déclaration 
  }

  @Get()
  getList(): Promise<Customer[]> {
    return this.customersDB.getList();
  }
  
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id : number): Promise<Customer>{ // "ParseIntPipe" c'est une classe qui va transformer un string en number 
    return this.customersDB.getOne(id);
  }

  @Post()
  add(@Body() customerDto: CustomerDto): Promise<Customer>{ 
    return this.customersDB.create(customerDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // On dit qu'on renvoie un statut 204 si il n'a pas trouvé l'id 
  update(@Param('id', ParseIntPipe) id : number, 
         @Body() customerDto: CustomerDto): Promise<void>{

    return this.customersDB.update(id, customerDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) 
  delete(@Param('id', ParseIntPipe) id : number): Promise<void>{
    return this.customersDB.delete(id);
  }


}
