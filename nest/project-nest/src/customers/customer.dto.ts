import { IsEmail, IsString, MaxLength, IsOptional, IsAlpha, IsNotEmpty } from 'class-validator';

export class CustomerDto{
    
    @IsString()
    @IsAlpha()
    @MaxLength(50)
    @IsNotEmpty()
    firstname: string;

    @IsString()
    @IsAlpha()
    @MaxLength(50)
    @IsNotEmpty()
    lastname: string;

    @IsEmail()
    @MaxLength(200)
    @IsOptional()
    email?:string; // "?" c'est pour dire que cette propriété est facultative à rentrer par le client
}