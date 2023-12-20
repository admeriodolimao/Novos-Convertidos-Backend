import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateNovoConvertidoDTO } from "./dto/create-nc.dto";
import { UpdatePatchNovoConvertidoDTO } from "./dto/update-patch-nc.dto"; 
import { UpdatePutNovoConvertidoDTO } from "./dto/update-put-nc.dto";
import * as bcrypt from 'bcrypt';
import { SearchCriteria } from "src/voluntario/dto/search-criteria.dto";

@Injectable()
export class NovoConvertidoService {

    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateNovoConvertidoDTO) {
        const salt = await bcrypt.genSalt();
        data.password = await bcrypt.hash(data.password, salt);
    
        // Convert dataCriacao and dataNascimento to Date objects
        const preparedData = {
            ...data,
            dataCriacao: data.dataCriacao ? new Date(data.dataCriacao) : new Date(), // Current date if not provided
            dataNascimento: data.dataNascimento ? new Date(data.dataNascimento) : null,
        };
    
        return this.prisma.novoConvertido.create({
            data: preparedData,
        });
    }
    

    async list() {//

        return this.prisma.novoConvertido.findMany();

    }

    async show(id: number) {

        await this.exists(id);

        return this.prisma.novoConvertido.findUnique({
            where: {
                id,
            }
        })

    }

    email!: string

    async showByEMail(email: string) {
        await this.show;
      
        return this.prisma.novoConvertido.findFirst({
          where: {
            email,
          },
        });
      }
      

    async update(id: number, {email, name, password, dataNascimento, role}: UpdatePutNovoConvertidoDTO) {

        await this.exists(id);

        const salt = await bcrypt.genSalt();

        password = await bcrypt.hash(password, salt);

        return this.prisma.novoConvertido.update({
            data:{email, name, password, dataNascimento: dataNascimento ? new Date(dataNascimento) : null},
            where: {
                id
            }
        });
    }

    async updatePartial(id: number, {email, name, password, dataNascimento, role}: UpdatePatchNovoConvertidoDTO) {

        await this.exists(id);

        const data: any = {};

        if (dataNascimento) {
            data.dataNascimento = new Date(dataNascimento);
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

        return this.prisma.novoConvertido.update({
            data,
            where: {
                id
            }
        });
    }

    async delete(id: number) {

       await this.exists(id);

        return this.prisma.novoConvertido.delete({
            where: {
                id
            }
        });
    }

    async exists(id: number) {
        // Certifique-se de que id é um número válido
        if (isNaN(id) || id <= 0) {
            throw new NotFoundException('ID inválido.');
        }
    
        const count = await this.prisma.novoConvertido.count({
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
            // Adicione condições ao array OR //
            whereClause.OR.push(
                { name: { contains: criteria.term, mode: 'insensitive' } },
                { email: { contains: criteria.term, mode: 'insensitive' } },
                { telefone: { contains: criteria.term, mode: 'insensitive' } }
                // Adicione outras condições conforme necessário
            );
        }
    
        return this.prisma.novoConvertido.findMany({
            where: whereClause,
        });
    }
    
}