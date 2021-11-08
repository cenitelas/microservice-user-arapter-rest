import { IsString } from 'class-validator';

export class UserIdRequestParamsDto {
    @IsString()
    readonly id!: string;
}
