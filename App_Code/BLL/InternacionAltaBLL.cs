using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;

/// <summary>
/// Summary description for InternacionAlta
/// </summary>
/// 
namespace Hospital
{
    public class InternacionAlta
    {
        public InternacionAlta()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public long Internacion_Alta_Guardar(long idAlta, long idInternacion, long idPaciente, long idUsuario, int motivoEgreso, int autopsia, int operado, string fecha,
            string diasOperatorio, string cirugiaRealizda, string princiapl, string conmitentes, string complicaciones, string observaciones, int idMedico)
        {
            try
            {
                object obj = new object();

                InternacionDALTableAdapters.QueriesTableAdapter adapter = new InternacionDALTableAdapters.QueriesTableAdapter();

                obj = adapter.H2_Internacion_Alta(idAlta, idInternacion, idPaciente, idUsuario, motivoEgreso, autopsia, operado, fecha,
                diasOperatorio, cirugiaRealizda, princiapl, conmitentes, complicaciones, observaciones, idMedico);

                if (obj != null) return Convert.ToInt64(obj.ToString());
                else return -1;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public AltaMedica Traer_Alta(long idIntenacion)
        {
            InternacionDALTableAdapters.H2_Internacion_Alta_TraerTableAdapter adapter = new InternacionDALTableAdapters.H2_Internacion_Alta_TraerTableAdapter();
            InternacionDAL.H2_Internacion_Alta_TraerDataTable atable = new InternacionDAL.H2_Internacion_Alta_TraerDataTable();

            atable = adapter.GetData(idIntenacion);
            AltaMedica alta = new AltaMedica();

            foreach (InternacionDAL.H2_Internacion_Alta_TraerRow row in atable.Rows)
            {
                if (!row.IsautopsiaNull())
                    alta.autopsia = row.autopsia;

                if (!row.Iscirugia_realizadaNull())
                    alta.cirugiaRealizada = row.cirugia_realizada;

                if (!row.IscomplicacionesNull())
                    alta.complicaciones = row.complicaciones;

                if (!row.IsconmitentesNull())
                    alta.conmitentes = row.conmitentes;

                if (!row.Isdias_operatorioNull())
                    alta.diasOperatorio = row.dias_operatorio;

                if (!row.IsfechaDeAtencionNull())
                    alta.fechaDeAtencion = row.fechaDeAtencion.ToShortDateString();

                if (!row.IsfechaDeModificacionNull())
                    alta.fechaDeModificacion = row.fechaDeModificacion.ToShortDateString();

                if (!row.IsfechaNull())
                    alta.fecha = row.fecha.ToShortDateString();

                if (!row.IsidInternacionNull())
                    alta.idInternacion = row.idInternacion;

                if (!row.IsidPacienteNull())
                    alta.idPaciente = row.idPaciente;

                if (!row.IsidUsuarioNull())
                    alta.idUsuario = row.idUsuario;

                if (!row.IsmotivoEgresoNull())
                    alta.motivoEgreso = row.motivoEgreso;

                if (!row.IsobservacionesNull())
                    alta.observaciones = row.observaciones;

                if (!row.IsoperadoNull())
                    alta.operado = row.operado;

                if (!row.IsprincipalNull())
                    alta.princpal = row.principal;

                if (!row.IsidMedicoNull())
                    alta.medicoId = row.idMedico;

                alta.idAlta = row.idAlta;

            }

            return alta;
        }


        public long Internacion_Alta_Borrar(long idAlta)
        {
            object obj = new object();

            InternacionDALTableAdapters.QueriesTableAdapter adapter = new InternacionDALTableAdapters.QueriesTableAdapter();

            obj = adapter.H2_Internacion_Alta_Borrar(idAlta);

            if (obj != null) return Convert.ToInt64(obj.ToString());
            else return -1;
        }

    }
}