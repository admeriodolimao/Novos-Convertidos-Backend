// import { IsString, IsOptional } from 'class-validator';

// export class SearchCriteria {

//     @IsOptional()
//     //@IsString()
//     id?: string;

//     @IsOptional()
//     @IsString()
//     name?: string;

//     @IsOptional()
//     @IsString()
//     email?: string;

//     @IsOptional()
//     @IsString()
//     phone?: string;

//     // Inclua outros campos de critério de pesquisa conforme necessário
//     // Por exemplo:
//     // @IsOptional()
//     // @IsString()
//     // city?: string;
// }

export class SearchCriteria {
    term?: string;
}

