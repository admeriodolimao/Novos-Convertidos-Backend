/* eslint-disable prettier/prettier */
import { IsString, IsEmail, MinLength, MaxLength, Matches, IsOptional, IsDateString, IsEnum } from "class-validator";
import { Role } from "src/enums/role.enum";

export class CreateUserDTO {

    createdAt: string;

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8) 
    @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=<>?/-]).{8,}$/, {
        message: 'A senha deve conter pelo menos uma letra maiúscula, um número e um caractere especial.',
    })
    password: string;

    @IsString()
    cpfCnpj   :string; 

    @IsString()
    company   :string; 

    @IsString()
    mobilePhone   :string;  

    @IsString()
    phone     :string; 
    
    @IsString()
    postalCode       :string;
    
    @IsString()
    address   :string; 

    @IsString()
    province     :string;     
    
    @IsString()
    state     :string;     
    
    @IsString()
    city      :string; 
    
    @IsString()   
    addressNumber    :string;

    @IsString()   
    additionalEmails :string;
  
    @IsOptional() 
    @IsDateString()
    birthAt: string;

    @IsOptional()
    @IsEnum(Role)
    role: number;

    @IsOptional()
    @MaxLength(6)
    emailVerificationCode: string;

    @IsOptional()
    @MaxLength(6)
    SMSVerificationCode: string;

    @IsString()   
    observations :string;
}
