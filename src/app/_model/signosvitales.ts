import { Paciente } from 'src/app/_model/paciente';
export class SignosVitales {
    idSignosVitales: number;
    paciente: Paciente;
    temperatura: string;
    pulso: string;
    RitmoRespiratorio: string;
    fecha: string; //ISODATE 2019-02-10T05:00:00
    
} 