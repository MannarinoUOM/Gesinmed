using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for ImpresionesBLL
/// </summary>
namespace Hospital
{
    public class ImpresionesBLL
    {
        public ImpresionesBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public Impresion_Turnos Turno(int MedicoId, int EspecialidadID, DateTime Fecha)
        {
            Impresion_Turnos i = new Impresion_Turnos();
            ImpresionTurnosTableAdapters.H2_Impresion_TurnoTableAdapter adapter = new ImpresionTurnosTableAdapters.H2_Impresion_TurnoTableAdapter();
            ImpresionTurnos.H2_Impresion_TurnoDataTable aTable = adapter.GetData(MedicoId, EspecialidadID, Fecha);

            if (aTable.Rows.Count > 0)
            {
                //if (!aTable[0].IsRazonSocialNull()) i.RazonSocial = aTable[0].RazonSocial;
                i.NroTurno = aTable[0].Turno_Id.ToString();
                i.FechaHora = aTable[0].TurnoFecha.ToString("dd/MM/yyyy HH:mm");
                if (!aTable[0].IsConsultorioNull()) { i.Consultorio = aTable[0].Consultorio; }
                if (!aTable[0].IsEspecialidadNull()) { i.Especialidad = aTable[0].Especialidad; }
                if (!aTable[0].IsMedicoNull()) { i.Medico = aTable[0].Medico; }
                i.Paciente = aTable[0].apellido;
                i.NHC = aTable[0].cuil.ToString();
                if (!aTable[0].IsSeccionalNull()) { i.Seccional = aTable[0].Seccional; }
                i.ObraSocial = aTable[0].ObraSocial;
                if (!aTable[0].IsComentarioNull()) { i.Observaciones = aTable[0].Comentario; }
                if (!aTable[0].IsTelefonoTurnosNull()) { i.TelefonoTurno = aTable[0].TelefonoTurnos; }
                if (!aTable[0].IsHoraTurnosAtencionNull()) { i.HorariodeTurnos = aTable[0].HoraTurnosAtencion; }
                //if (!aTable[0].IsRazonSocialNull()) { i.RazonSocial = aTable[0].RazonSocial; }              
                if (aTable[0].EsSobreTurno) { i.SobreTurno = true; } else { i.SobreTurno = false; }                
                if (aTable[0].EsTurnoTelefonico) i.TurnoTelefonico = true; else i.TurnoTelefonico = false;
                if (!aTable[0].IsnombreNull()) { i.UsuarioNombre = aTable[0].nombre; } else { i.UsuarioNombre = "RECEPCION"; }
                if (!aTable[0].IsHoraAtencionPersonalNull()) { i.HorariodeTurnosPersonalmente = aTable[0].HoraAtencionPersonal; }

                if(aTable[0].IsCentro_RZNull()) i.RazonSocial = aTable[0].Centro_RZ;
                //if (!aTable[0].centro ()) { i.HorariodeTurnosPersonalmente = aTable[0].HoraAtencionPersonal; }
                

                if (!aTable[0].IsPacienteTelefonoNull())
                {
                    i.PacienteTelefono = aTable[0].PacienteTelefono;
                    if (i.PacienteTelefono.Length < 5) i.PacienteTelefono = "NO FUE PEDIDO";
                }
                else
                {
                    i.PacienteTelefono = "NO FUE PEDIDO";
                }
                
            }
            return i;
        }


        public impresion_bono Bono(string laFecha, int id)
        {
            DateTime Fecha = Convert.ToDateTime(laFecha);
            impresion_bono i = new impresion_bono();
            ImpresionBonoTableAdapters.H2_Impresion_BonoTableAdapter adapter = new ImpresionBonoTableAdapters.H2_Impresion_BonoTableAdapter();
            ImpresionBono.H2_Impresion_BonoDataTable aTable = adapter.GetData(Fecha, id);

            if (aTable.Rows.Count > 0)
            {

                i.documento_real = aTable[0].documento_real;
                i.documento = long.Parse(aTable[0].documento);
                i.cuil = aTable[0].cuil.ToString();
                i.apellido = aTable[0].apellido;
                if (!aTable[0].Isfecha_nacimientoNull()) i.fecha_nacimiento = aTable[0].fecha_nacimiento.ToShortDateString();
                i.Fecha = aTable[0].Fecha.ToShortDateString();
                if (!aTable[0].IsSeccionalNull()) i.Seccional = aTable[0].Seccional;
                i.Medico = aTable[0].Medico;
                i.Especialidad = aTable[0].Especialidad;
                if (!aTable[0].IsAutorizanteNull()) i.Autorizantes = aTable[0].Autorizante;

                if(!aTable[0].IsMotivoNull()){ i.Motivo = aTable[0].Motivo; }
                if (!aTable[0].IsAutorizaNull()) { i.Autoriza = aTable[0].Autoriza; }

                i.Bono_Id = aTable[0].Bono_Id;
                i.ReservaTurnoAhora = aTable[0].ReservaTurnoAhora;
                if (!aTable[0].IsBonoporUsuarioNull()) i.BonoporUsuario = aTable[0].BonoporUsuario;
                if (!aTable[0].IsRazonSocialNull()) i.Centro = aTable[0].RazonSocial;
                if (!aTable[0].IsNroNull()) i.Nro = aTable[0].Nro;
                i.Nombre_Usuario = aTable[0].nombre;
                i.OS = aTable[0].OS;
                if (!aTable[0].IsTipoNull())
                    i.Tipo = aTable[0].Tipo;
                else i.Tipo = 0;

                if (!aTable[0].IsCentro_RZNull()) i.Razon_Social = aTable[0].Centro_RZ;

                if (!aTable[0].IsDiscapacidadNull())
                {
                    i.Discapacidad = Convert.ToInt32(aTable[0].Discapacidad);

                }
                else
                {
                    i.Discapacidad = 0;
                }

                if (!aTable[0].IsCentro_RZNull()) i.Centro = aTable[0].Centro_RZ;
                i.Cancelado = aTable[0].Cancelado;

                i.PatologiaDesc = aTable[0].Pat;

                if (!aTable[0].IsdeudaNull()) { i.deuda = aTable[0].deuda; }

                if (!aTable[0].IsfotoNull()) i.Foto = aTable[0].foto;

            }
            return i;

        }






        public certificadosmedicosImpresion CertificadoMedico_Impresion(long Id)
        {
            certificadosmedicosImpresion c = new certificadosmedicosImpresion();
            AtConsultoioDALTableAdapters.H2_Certificado_ImpresionTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_Certificado_ImpresionTableAdapter();
            AtConsultoioDAL.H2_Certificado_ImpresionDataTable aTable = adapter.GetData(Id);

            if (aTable.Rows.Count > 0)
            {
                c.Fecha = aTable[0].Fecha.ToShortDateString();
                if (!aTable[0].IsIndicacionesNull()) { c.Indicaciones = aTable[0].Indicaciones; } else { c.Indicaciones = ""; }
                if (!aTable[0].IsapellidoNull()) { c.Paciente = aTable[0].apellido; } else { c.Paciente = ""; }
                c.Medico = aTable[0].Medico;
                if (!aTable[0].IsSeccionalNull()) { c.Seccional = aTable[0].Seccional; } else { c.Seccional = ""; }
                c.NHC = aTable[0].NHC.ToString();
            }
            return c;

        }

    }
}