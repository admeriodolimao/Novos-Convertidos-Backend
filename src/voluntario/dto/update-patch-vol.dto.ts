
import {PartialType} from '@nestjs/mapped-types';
import { CreateVoluntarioDTO } from "./create-voluntario.dto";

export class UpdatePatchVolDTO extends PartialType(CreateVoluntarioDTO) {

   
    
}