/* eslint-disable prettier/prettier */
import { IsString, IsEmail, MinLength, MaxLength, Matches, IsOptional, IsDateString, IsEnum } from "class-validator";
import { Role } from "src/enums/role.enum";

export class CreateNovoConvertidoDTO {

    // createdAt: string;

    @IsString()
    name: string;

    @IsString()
    telefone: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8) 
    @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=<>?/-]).{8,}$/, {
        message: 'A senha deve conter pelo menos uma letra maiúscula, um número e um caractere especial.',
    })
    password: string;

    @IsString()
    statusRelacionamento   :string; 

    @IsString()
    jaTeveOutraReligiao   :string; 

  
    @IsOptional() 
    @IsDateString()
    dataCriacao: string;

    @IsOptional() 
    @IsDateString()
    dataNascimento: string;

    @IsOptional()
    @IsEnum(Role)
    role: number;

    // @IsOptional()
    // @MaxLength(6)
    // emailVerificationCode: string;

    // @IsOptional()
    // @MaxLength(6)
    // SMSVerificationCode: string;

    // @IsString()   
    // observations :string;
}
