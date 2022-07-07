using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using HospitalBLL.Entities;
using System.Data.SqlClient;

/// <summary>
/// Summary description for DiasdeAtencionBLL
/// </summary>
namespace Hospital
{
    public class DiasdeAtencionBLL
    {
        public DiasdeAtencionBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public string DiabyNro(int diaDeAtencion)
        {
            switch (diaDeAtencion) {
                case 0: return "Domingos"; 
                case 1: return "Lunes"; 
                case 2: return "Martes"; 
                case 3: return "Miercoles"; 
                case 4: return "Jueves"; 
                case 5: return "Viernes"; 
                case 6: return "Sabados";
                default: return string.Empty;
            }
        }

        private void VerificarProblema(int id, int medicoId, int diaDeAtencion, Time horaInicio, Time horaFin, int EspecialidadId)
        {
            DateTime fechaInicio = horaInicio.ToDateTime();
            DateTime fechaFin = horaFin.ToDateTime();
            DiasdeAtencionDALTableAdapters.H2_Turnos_DiaDeAtencion_ExisteTableAdapter adapter = new DiasdeAtencionDALTableAdapters.H2_Turnos_DiaDeAtencion_ExisteTableAdapter();
            DiasdeAtencionDAL.H2_Turnos_DiaDeAtencion_ExisteDataTable aTable = adapter.GetData(medicoId, diaDeAtencion, fechaInicio, fechaFin, id, EspecialidadId);
            EspecialidadesBLL es = new EspecialidadesBLL();
            MedicosBLL med = new MedicosBLL();
            foreach (DiasdeAtencionDAL.H2_Turnos_DiaDeAtencion_ExisteRow row in aTable)
            {
                if (row.Id != id)
                    throw new Exception(string.Format("El Médico {0} ya atiende los {1} de {2}hs. a {3}hs. en el consultorio {4} la especialidad {5}.", med.Medicos_Buscar_Info(row.MedicoId).Medico, DiabyNro(diaDeAtencion), row.HoraInicio.ToString("HH:mm"), row.HoraFin.ToString("HH:mm"), row.ConsultorioDescripcion,es.Especialidades_Id(EspecialidadId).Especialidad));
            }

        }


        private void VerificarProblema_NoDisponible(int id, int medicoId, string FechaDesde, string FechaHasta, int EspecialidadId)
        {
            DateTime fechaInicio = Convert.ToDateTime(FechaDesde);
            DateTime fechaFin = Convert.ToDateTime(FechaHasta);
            DiasdeAtencionDALTableAdapters.H2_Turnos_DiaDeNoAtencion_ExisteTableAdapter adapter = new DiasdeAtencionDALTableAdapters.H2_Turnos_DiaDeNoAtencion_ExisteTableAdapter();
            DiasdeAtencionDAL.H2_Turnos_DiaDeNoAtencion_ExisteDataTable aTable = adapter.GetData(id, medicoId, fechaInicio, fechaFin, EspecialidadId);

            foreach (DiasdeAtencionDAL.H2_Turnos_DiaDeNoAtencion_ExisteRow row in aTable)
            {
                if (row.Id != id)
                    throw new Exception(string.Format("Conflicto con otro dia No laborable con horario desde {0} hasta {1} ", row.FechaDesde.ToShortDateString(), row.FechaHasta.ToShortDateString()));
            }

        }

        
        public int Guardar(int id, int medicoId, int diaDeAtencion, Time horaInicio, Time horaFin, int Duracion, int Consultorio, int EspecialidadId, long UsuarioId)
        {
            VerificarProblema(id, medicoId, diaDeAtencion, horaInicio, horaFin, EspecialidadId);
            DiasdeAtencionDALTableAdapters.QueriesTableAdapter adapter = new DiasdeAtencionDALTableAdapters.QueriesTableAdapter();
            int r = 0;
            try
            {
                object elId = adapter.H2_Turnos_DiaDeAtencion_Guardar(id, medicoId, diaDeAtencion, horaInicio.ToDateTime(), horaFin.ToDateTime(), Duracion, Consultorio, EspecialidadId, UsuarioId);
                r = Convert.ToInt32(elId);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Errors[0].Message);
            }
            return r; 
        }


        public int Guardar_No_Atencion(int id, int medicoId, string FechaDesde, string FechaHasta, int EspecialidadId, string Motivo)
        {
            VerificarProblema_NoDisponible(id, medicoId, FechaDesde, FechaHasta, EspecialidadId);
            DiasdeAtencionDALTableAdapters.QueriesTableAdapter adapter = new DiasdeAtencionDALTableAdapters.QueriesTableAdapter();
            object elId = adapter.H2_Turnos_DiaDeNoAtencion_Guardar(id, medicoId, Convert.ToDateTime(FechaDesde), Convert.ToDateTime(FechaHasta), Motivo, EspecialidadId);
            return Convert.ToInt32(elId);
        }



        public void Eliminar_DiasNoAtencion_Id(int id)
        {
            DiasdeAtencionDALTableAdapters.QueriesTableAdapter adapter = new DiasdeAtencionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Turnos_DiaDeNoAtencion_Borrar(id, null);
        }

        public int CantSobreturnos(int MedicoId)
        {
            DiasdeAtencionDALTableAdapters.QueriesTableAdapter adapter = new DiasdeAtencionDALTableAdapters.QueriesTableAdapter();
            int CantSobreturnos;
            if (int.TryParse(adapter.H2_MEDICOS_CANT_SOBRETURNOS(MedicoId).ToString(), out CantSobreturnos))
                return CantSobreturnos;
            else return -1;
        }

        public void Eliminar_Id(int id, long UsuarioId)
        {
            DiasdeAtencionDALTableAdapters.QueriesTableAdapter adapter = new DiasdeAtencionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Turnos_DiaDeAtencion_Borrar(id, null, UsuarioId);
        }


        public diasdeatencion_Vista_Lista DiasAtencionVistaMedi_Esp(int MedicoId, int Especialidad)
        {
            DiasdeAtencionDALTableAdapters.H2_Turnos_DiaDeAtencion_ListaTableAdapter adapter = new DiasdeAtencionDALTableAdapters.H2_Turnos_DiaDeAtencion_ListaTableAdapter();
            DiasdeAtencionDAL.H2_Turnos_DiaDeAtencion_ListaDataTable aTable = adapter.GetData(MedicoId, null, Especialidad);

            diasdeatencion_Vista_Lista lista = new diasdeatencion_Vista_Lista();
            foreach (DiasdeAtencionDAL.H2_Turnos_DiaDeAtencion_ListaRow row in aTable.Rows)
            {
                diasdeatencion_Vista d = new diasdeatencion_Vista();

                switch (row.DiaDeAtencion)
                {
                    case 0: d.Dia = "Domingo"; break;
                    case 1: d.Dia = "Lunes"; break;
                    case 2: d.Dia = "Martes"; break;
                    case 3: d.Dia = "Miércoles"; break;
                    case 4: d.Dia = "Jueves"; break;
                    case 5: d.Dia = "Viernes"; break;
                    case 6: d.Dia = "Sábado"; break;
                    case 7: d.Dia = "Domingo"; break;
                    default: d.Dia = ""; break;
                }

                if (!row.IsConsultorioDescripcionNull()) d.Consultorio = row.ConsultorioDescripcion;
                if (!row.IsConsultorioIdNull()) d.ConsultorioId = row.ConsultorioId;
                d.Inicio = row.HoraInicio.ToString("HH:mm");
                d.Fin = row.HoraFin.ToString("HH:mm");
                d.Duracion = row.DuracionMinutos.ToString();

                d.Id = row.Id;
                lista.Add(d);
            }
            return lista;

        }





        public diasdeatencion_Vista_Lista DiasAtencionVistaMedi_Esp_Id(int Id)
        {
            DiasdeAtencionDALTableAdapters.H2_Turnos_DiaDeAtencion_ListaTableAdapter adapter = new DiasdeAtencionDALTableAdapters.H2_Turnos_DiaDeAtencion_ListaTableAdapter();
            DiasdeAtencionDAL.H2_Turnos_DiaDeAtencion_ListaDataTable aTable = adapter.GetData(null, Id, null);

            diasdeatencion_Vista_Lista lista = new diasdeatencion_Vista_Lista();
            foreach (DiasdeAtencionDAL.H2_Turnos_DiaDeAtencion_ListaRow row in aTable.Rows)
            {
                diasdeatencion_Vista d = new diasdeatencion_Vista();

                d.Dia = row.DiaDeAtencion.ToString();
                if (!row.IsConsultorioDescripcionNull()) d.Consultorio = row.ConsultorioDescripcion;
                if (!row.IsConsultorioIdNull()) d.ConsultorioId = row.ConsultorioId;
                d.Inicio = row.HoraInicio.ToString("HH:mm");
                d.Fin = row.HoraFin.ToString("HH:mm");
                d.Duracion = row.DuracionMinutos.ToString();

                d.Id = row.Id;
                lista.Add(d);
            }
            return lista;

        }



        public List<diasdenoatencion> Dias_de_No_Atencion_Lista(int medicoId, int EspecialidadId)
        {
            List<diasdenoatencion> list = new List<diasdenoatencion>();
            DiasdeAtencionDALTableAdapters.H2_Turnos_DiaDeNoAtencion_ListTableAdapter adapter = new DiasdeAtencionDALTableAdapters.H2_Turnos_DiaDeNoAtencion_ListTableAdapter();
            DiasdeAtencionDAL.H2_Turnos_DiaDeNoAtencion_ListDataTable aTable = adapter.GetData(medicoId, null, EspecialidadId);
            
            foreach (DiasdeAtencionDAL.H2_Turnos_DiaDeNoAtencion_ListRow row in aTable.Rows)
            {
                diasdenoatencion d = new diasdenoatencion();

                d.Id = row.Id;
                d.FechaDesde = row.FechaDesde.ToShortDateString();
                d.FechaHasta = row.FechaHasta.ToShortDateString();
                if (!row.IsMotivoAusenciaNull()) { d.MotivoAusencia = row.MotivoAusencia; }
                if (!row.IsEspecialidadIdNull()) { d.EspecialidadId = row.EspecialidadId; }

                list.Add(d);
            }
            return list;
        }




        public List<diasdenoatencion> Dias_de_No_Atencion_Id(int Id)
        {
            DiasdeAtencionDALTableAdapters.H2_Turnos_DiaDeNoAtencion_ListTableAdapter adapter = new DiasdeAtencionDALTableAdapters.H2_Turnos_DiaDeNoAtencion_ListTableAdapter();
            DiasdeAtencionDAL.H2_Turnos_DiaDeNoAtencion_ListDataTable aTable = adapter.GetData(null, Id, null);

           List<diasdenoatencion> lista = new List<diasdenoatencion>();
            foreach (DiasdeAtencionDAL.H2_Turnos_DiaDeNoAtencion_ListRow row in aTable.Rows)
            {
                diasdenoatencion d = new diasdenoatencion();

                d.FechaDesde = row.FechaDesde.ToShortDateString();
                d.FechaHasta = row.FechaHasta.ToShortDateString();
                if (!row.IsMotivoAusenciaNull()) { d.MotivoAusencia = row.MotivoAusencia; }
                if (!row.IsEspecialidadIdNull()) { d.EspecialidadId = row.EspecialidadId; }

                d.Id = row.Id;
                lista.Add(d);
            }
            return lista;
        }




                

        public diasdeatencion_Vista_Lista DiasAtencionVista(int MedicoId)
        {
            DiasdeAtencionDALTableAdapters.H2_Turnos_DiaDeAtencion_VistaTableAdapter adapter = new DiasdeAtencionDALTableAdapters.H2_Turnos_DiaDeAtencion_VistaTableAdapter();
            DiasdeAtencionDAL.H2_Turnos_DiaDeAtencion_VistaDataTable aTable = adapter.GetData(MedicoId);

            diasdeatencion_Vista_Lista lista = new diasdeatencion_Vista_Lista();
            foreach (DiasdeAtencionDAL.H2_Turnos_DiaDeAtencion_VistaRow row in aTable.Rows)
            {
                diasdeatencion_Vista d = new diasdeatencion_Vista();
                switch (row.Dia)
                {
                    case 0: d.Dia = "Domingo"; break;
                    case 1: d.Dia = "Lunes"; break;
                    case 2: d.Dia = "Martes"; break;
                    case 3: d.Dia = "Miércoles"; break;
                    case 4: d.Dia = "Jueves"; break;
                    case 5: d.Dia = "Viernes"; break;
                    case 6: d.Dia = "Sábado"; break;
                    case 7: d.Dia = "Domingo"; break;
                    default: d.Dia = ""; break;
                }

                if (!row.IsInicioNull()) d.Inicio = row.Inicio;
                if (!row.IsFinNull()) d.Fin = row.Fin;
                d.Duracion = row.Duracion.ToString();
                if (!row.IsConsultorioNull()) d.Consultorio = row.Consultorio;
                if (!row.IsEspecialidadNull()) d.Especialidad = row.Especialidad;
                d.Medico = row.Medico;
                lista.Add(d);
            }
            return lista;
        }

    }
}