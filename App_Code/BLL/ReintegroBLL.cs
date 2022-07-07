using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for AdministracionBLL
/// </summary>
namespace Hospital
{
    public class ReintegroBLL
    {
        public ReintegroBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public void Reintegrar(DateTime Fecha, int Usuario, int NroBono, string Cantidad, int UsuarioActual)
        {
            ReintegroDALTableAdapters.QueriesTableAdapter adapter = new ReintegroDALTableAdapters.QueriesTableAdapter();
            object newId = adapter.H2_Reintegro_Reintegrar(Fecha, NroBono, Convert.ToDouble(Cantidad), Usuario, UsuarioActual);            
        }


        public void Reintegrar_SN(long NroBono, string Cantidad, int UsuarioActual)
        {
            ReintegroDALTableAdapters.QueriesTableAdapter adapter = new ReintegroDALTableAdapters.QueriesTableAdapter();
            object newId = adapter.H2_Reintegro_Reintegrar_SN(NroBono, Convert.ToDouble(Cantidad), UsuarioActual);            
        }

        

        public reintegro ReintegroEstado(string Fecha, int Usuario, int NroBono)
        {
            ReintegroDALTableAdapters.H2_Reintegro_EstadoTableAdapter adapter = new ReintegroDALTableAdapters.H2_Reintegro_EstadoTableAdapter();
            ReintegroDAL.H2_Reintegro_EstadoDataTable aTable = adapter.GetData(NroBono, Convert.ToDateTime(Fecha), Usuario);
            reintegro a = new reintegro();       
            if (aTable.Rows.Count > 0)
            {
                a.cuil = aTable[0].cuil.ToString();
                a.bono_Id = aTable[0].Bono_Id.ToString();
                a.documento = aTable[0].documento.ToString();
                a.especialidad = aTable[0].Especialidad;
                a.fecha = aTable[0].Fecha.ToString();
                a.medico = aTable[0].Medico;
                a.paciente = aTable[0].Afiliado;
                if (!aTable[0].IsReintegroNull()) a.Reintegro = aTable[0].Reintegro.ToString();
            }
            return a;

        }

        public reintegro ReintegroEstadoSN(long NroBono)
        {
            ReintegroDALTableAdapters.H2_Reintegro_Estado_SNTableAdapter adapter = new ReintegroDALTableAdapters.H2_Reintegro_Estado_SNTableAdapter();
            ReintegroDAL.H2_Reintegro_Estado_SNDataTable aTable = adapter.GetData(NroBono);
            reintegro a = new reintegro();
            if (aTable.Rows.Count > 0)
            {
                a.cuil = aTable[0].cuil.ToString();
                a.bono_Id = aTable[0].Bono_Id.ToString();
                a.documento = aTable[0].documento.ToString();
                a.especialidad = aTable[0].Especialidad;
                a.fecha = aTable[0].Fecha.ToString();
                a.medico = aTable[0].Medico;
                a.paciente = aTable[0].Afiliado;
                if (!aTable[0].IsreintegroNull()) a.Reintegro = aTable[0].reintegro.ToString();
            }
            return a;

        }



    }
}