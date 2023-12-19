import { Controller, Post, Body, Get, Put, Patch, Delete, UseInterceptors,UseGuards, Query } from "@nestjs/common"
import { ParamId } from "src/decorators/param-id.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";

import { LogInterceptor } from "src/interceptors/log.interceptor";
import { CreateNovoConvertidoDTO } from "./dto/create-nc.dto";

import { NovoConvertidoService } from "./nc.service";
import { AuthGuard } from "src/guards/auth.guard";
import { RoleGuard } from "src/guards/role.guard";
import { UpdatePutNovoConvertidoDTO } from "./dto/update-put-nc.dto";
import { UpdatePatchNovoConvertidoDTO } from "./dto/update-patch-nc.dto";
import { SearchCriteria } from "src/voluntario/dto/search-criteria.dto";

//@Roles(Role.Admin)
//@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('novos-convertidos')
export class NovoConvertidoController {

    constructor(private readonly ncService: NovoConvertidoService){}
    
    @Post()
    async create(@Body() data: CreateNovoConvertidoDTO) {
        return this.ncService.create(data);
    } 

    @Get()
    async list() {
        return this.ncService.list();
    }

    @Get(':id')
    async show(@ParamId() id: number) {
        console.log({id});
        return this.ncService.show(id);
    }

    @Put(':id')
    async update(@Body() data: UpdatePutNovoConvertidoDTO, @ParamId() id: number) {
        return this.ncService.update(id, data);
    }

    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchNovoConvertidoDTO, @ParamId() id: number) {
        return this.ncService.updatePartial(id, data);
    }

    @Delete(':id')
    async delete(@ParamId() id: number) {
        return this.ncService.delete(id);
    }

    @Post('pesquisar')
    async search(@Body() criteria: SearchCriteria) {
        return this.ncService.search(criteria);
    }

}