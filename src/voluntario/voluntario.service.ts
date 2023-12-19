import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

import * as bcrypt from 'bcrypt';
import { CreateVoluntarioDTO } from "./dto/create-voluntario.dto";
import { UpdatePutVolDTO } from "./dto/update-put-vol.dto";
import { UpdatePatchVolDTO } from "./dto/update-patch-vol.dto";
import { SearchCriteria } from "./dto/search-criteria.dto";

@Injectable()
export class VoluntarioService {

    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateVoluntarioDTO) {

        const salt = await bcrypt.genSalt();

        data.password = await bcrypt.hash(data.password, salt);

        return  this.prisma.voluntarios.create({
            data,
        });



    }

    async list() {

        return this.prisma.voluntarios.findMany();

    }

    async show(id: number) {

        await this.exists(id);

        return this.prisma.voluntarios.findUnique({
            where: {
                id,
            }
        })

    }

    email!: string

    async showByEMail(email: string) {
        await this.show;
      
        return this.prisma.voluntarios.findFirst({
          where: {
            email,
          },
        });
      }
      

    async update(id: number, {email, name, password, birthAt, role}: UpdatePutVolDTO) {

        await this.exists(id);

        const salt = await bcrypt.genSalt();

        password = await bcrypt.hash(password, salt);

        return this.prisma.voluntarios.update({
            data:{email, name, password, birthAt: birthAt ? new Date(birthAt) : null, role},
            where: {
                id
            }
        });
    }

    async updatePartial(id: number, {email, name, password, birthAt, role}: UpdatePatchVolDTO) {

        await this.exists(id);

        const data: any = {};

        if (birthAt) {
            data.birthAt = new Date(birthAt);
        }

        if (email) {
            data.email = email;
        }

        if (name) {
            data.name = name;
        }

        if (password) {
            const salt = await bcrypt.genSalt();
            data.password = await bcrypt.hash(password, salt);
        }

        if (role) {
            data.role = role;
        }

        return this.prisma.voluntarios.update({
            data,
            where: {
                id
            }
        });
    }

    async delete(id: number) {

       await this.exists(id);

        return this.prisma.voluntarios.delete({
            where: {
                id
            }
        });
    }

    // async exists(id: number) {
    //     if (!(await this.prisma.voluntarios.count({
    //         where: {
    //             id
    //         }
    //     }))) {
    //         throw new NotFoundException(`O usuário ${id} não existe.`);
    //     }
    // }

    async exists(id: number) {
        // Certifique-se de que id é um número válido
        if (isNaN(id) || id <= 0) {
            throw new NotFoundException('ID inválido.');
        }
    
        const count = await this.prisma.voluntarios.count({
            where: {
                id
            }
        });
    
        if (count === 0) {
            throw new NotFoundException(`O usuário ${id} não existe.`);
        }
    }
    
    async search(criteria: SearchCriteria) {
        const whereClause: any = {
            OR: [],
        };
    
        if (criteria.term) {
            // Adicione condições ao array OR
            whereClause.OR.push(
                { name: { contains: criteria.term, mode: 'insensitive' } },
                { email: { contains: criteria.term, mode: 'insensitive' } },
                { phone: { contains: criteria.term, mode: 'insensitive' } }
                // Adicione outras condições conforme necessário
            );
        }
    
        return this.prisma.voluntarios.findMany({
            where: whereClause,
        });
    }
    
    

}