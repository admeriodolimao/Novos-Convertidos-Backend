import { IsJWT, IsString, MinLength, isString } from "class-validator";

export class AuthResetDTO {

    @IsString()
    @MinLength(8)
    password: string;

    //@IsJWT()
    //token: string;

    @IsString()
    forgetVerificationCode: string;
}