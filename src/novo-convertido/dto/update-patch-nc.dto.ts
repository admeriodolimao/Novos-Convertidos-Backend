import { CreateNovoConvertidoDTO } from "./create-nc.dto";
import {PartialType} from '@nestjs/mapped-types';

export class UpdatePatchNovoConvertidoDTO extends PartialType(CreateNovoConvertidoDTO) {

   
    
}