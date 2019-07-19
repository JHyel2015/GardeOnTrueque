import {IsDate, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';

export class CreateUserDTO {

    @IsEmpty()
    id?: number;

    @IsNotEmpty()
    @IsString()
    uid?: string;

    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsString()
    displayName?: string;

    @IsOptional()
    @IsString()
    fullname?: string;

    @IsOptional()
    @IsString()
    cedula?: string;

    @IsNotEmpty()
    @IsString()
    email?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    phone2?: string;

    @IsOptional()
    @IsString()
    facebook?: string;

    @IsNotEmpty()
    @IsString()
    password?: string;

    @IsOptional()
    @IsString()
    photoUrl?: string;
    // createdAt?: string;
}
