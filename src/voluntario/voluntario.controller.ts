import { Controller, Post, Body, Get, Put, Patch, Delete, UseInterceptors,UseGuards, Query } from "@nestjs/common"
import { ParamId } from "src/decorators/param-id.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";

import { LogInterceptor } from "src/interceptors/log.interceptor";

import { AuthGuard } from "src/guards/auth.guard";
import { RoleGuard } from "src/guards/role.guard";
import { VoluntarioService } from "./voluntario.service";
import { CreateVoluntarioDTO } from "./dto/create-voluntario.dto";
import { UpdatePutVolDTO } from "./dto/update-put-vol.dto";
import { UpdatePatchVolDTO } from "./dto/update-patch-vol.dto";
import { SearchCriteria } from "./dto/search-criteria.dto";

@Roles(Role.Admin)
//@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('voluntarios')
export class VoluntarioController {

    constructor(private readonly voluntarioService: VoluntarioService){}
    
    @Post()
    async create(@Body() data: CreateVoluntarioDTO) {
        return this.voluntarioService.create(data);
    } 

    @Get()
    async list() {
        return this.voluntarioService.list();
    }

    @Get(':id')
    async show(@ParamId() id: number) {
        console.log({id});
        return this.voluntarioService.show(id);
    }

    @Put(':id')
    async update(@Body() data: UpdatePutVolDTO, @ParamId() id: number) {
        return this.voluntarioService.update(id, data);
    }

    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchVolDTO, @ParamId() id: number) {
        return this.voluntarioService.updatePartial(id, data);
    }

    @Delete(':id')
    async delete(@ParamId() id: number) {
        return this.voluntarioService.delete(id);
    }

    @Post('pesquisar')
    async search(@Body() criteria: SearchCriteria) {
        return this.voluntarioService.search(criteria);
    }

}