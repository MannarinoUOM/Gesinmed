using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for AnatomiaPatologicaBLL
/// </summary>
namespace Hospital
{
    public class AnatomiaPatologicaBLL
    {
        public AnatomiaPatologicaBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public List<AnatomiaPatologica_Material> List_Material() 
        {
            List<AnatomiaPatologica_Material> list = new List<AnatomiaPatologica_Material>();
            AnatomiaPatologicaDALTableAdapters.H2_ANATOMIAPAT_MATERIAL_LISTTableAdapter adapter = new AnatomiaPatologicaDALTableAdapters.H2_ANATOMIAPAT_MATERIAL_LISTTableAdapter();
            AnatomiaPatologicaDAL.H2_ANATOMIAPAT_MATERIAL_LISTDataTable aTable = adapter.GetData();
            foreach (AnatomiaPatologicaDAL.H2_ANATOMIAPAT_MATERIAL_LISTRow row in aTable.Rows)
            {
                list.Add(CreateFromRow_List_Material(row));
            }
            return list;
        }

        private AnatomiaPatologica_Material CreateFromRow_List_Material(AnatomiaPatologicaDAL.H2_ANATOMIAPAT_MATERIAL_LISTRow row)
        {
            AnatomiaPatologica_Material a = new AnatomiaPatologica_Material();
            if (!row.IsCodigoNull())
            a.Codigo = row.Codigo;
            if (!row.IsDescripcionNull())
            a.Descripcion = row.Descripcion;
            a.Id = row.Id;
            return a;
        }

        public List<AnatomiaPatologica_Metodos> List_Metodos() 
        {
            List<AnatomiaPatologica_Metodos> list = new List<AnatomiaPatologica_Metodos>();
            AnatomiaPatologicaDALTableAdapters.H2_ANATOMIAPAT_METODOS_LISTTableAdapter adapter = new AnatomiaPatologicaDALTableAdapters.H2_ANATOMIAPAT_METODOS_LISTTableAdapter();
            AnatomiaPatologicaDAL.H2_ANATOMIAPAT_METODOS_LISTDataTable aTable = adapter.GetData();
            foreach (AnatomiaPatologicaDAL.H2_ANATOMIAPAT_METODOS_LISTRow row in aTable.Rows)
            {
                list.Add(CreateFromRow_List_Metodos(row));
            }
            return list;
        }

        private AnatomiaPatologica_Metodos CreateFromRow_List_Metodos(AnatomiaPatologicaDAL.H2_ANATOMIAPAT_METODOS_LISTRow row)
        {
            AnatomiaPatologica_Metodos a = new AnatomiaPatologica_Metodos();
            if (!row.IsDescripcionNull())
                a.Descripcion = row.Descripcion;
            a.Id = row.Id;
            return a;
        }

        public List<AnatomiaPatologica_Procedimientos> List_Procedimientos()
        {
            List<AnatomiaPatologica_Procedimientos> list = new List<AnatomiaPatologica_Procedimientos>();
            AnatomiaPatologicaDALTableAdapters.H2_ANATOMIAPAT_PROCEDIMIENTOS_LISTTableAdapter adapter = new AnatomiaPatologicaDALTableAdapters.H2_ANATOMIAPAT_PROCEDIMIENTOS_LISTTableAdapter();
            AnatomiaPatologicaDAL.H2_ANATOMIAPAT_PROCEDIMIENTOS_LISTDataTable aTable = adapter.GetData();
            foreach (AnatomiaPatologicaDAL.H2_ANATOMIAPAT_PROCEDIMIENTOS_LISTRow row in aTable.Rows)
            {
                list.Add(CreateFromRow_List_Procedimientos(row));
            }
            return list;
        }

        private AnatomiaPatologica_Procedimientos CreateFromRow_List_Procedimientos(AnatomiaPatologicaDAL.H2_ANATOMIAPAT_PROCEDIMIENTOS_LISTRow row)
        {
            AnatomiaPatologica_Procedimientos a = new AnatomiaPatologica_Procedimientos();
            if (!row.IsCodigoNull())
                a.Codigo = row.Codigo;
            if (!row.IsDescripcionNull())
                a.Descripcion = row.Descripcion;
            a.Id = row.Id;
            return a;
        }

        public long InsertProtocoloCab(AnatomiaPatologica_ProtocoloCab Cab)
        {
            AnatomiaPatologicaDALTableAdapters.QueriesTableAdapter adapter = new AnatomiaPatologicaDALTableAdapters.QueriesTableAdapter();
            object Id = adapter.H2_ANATOMIAPAT_PROTOCOLOCAB_INSERT(Cab.NroProtocolo, Cab.NHC, Cab.Pendiente, Cab.Baja, Cab.UsuarioId,Convert.ToDateTime(Cab.Fecha));
            return Convert.ToInt64(Id.ToString());
        }

        public long InsertProtocoloDet(AnatomiaPatologica_ProtocoloDet Det)
        {
            AnatomiaPatologicaDALTableAdapters.QueriesTableAdapter adapter = new AnatomiaPatologicaDALTableAdapters.QueriesTableAdapter();
            object Id = adapter.H2_ANATOMIAPAT_PROTOCOLODET_INSERT(Det.NroProtocolo, Det.MaterialId, Det.ProcedimientoId, Det.MetodosId, Det.EspecialidadId, Det.ServicioId,
                Det.MedicoCentralId, Det.ServicioExt, Det.Estadistica, Det.NroEstudio, Det.MedicoExt, Det.Macroscopia, Det.Microscopia, Det.Diagnostico, Det.Especiales, Det.CodDiagnostico,
                Det.NomencladorId, Det.Tacos, Det.Preparados, Convert.ToDateTime(Det.FechaSalida), Det.EspecialesCant, Det.IHQCant, Det.RecepHormonales, Det.Placa);
            return Convert.ToInt64(Id.ToString());
        }

        public List<AnatomiaPatologica_Nomenclador> List_Nomenclador()
        {
            List<AnatomiaPatologica_Nomenclador> list = new List<AnatomiaPatologica_Nomenclador>();
            AnatomiaPatologicaDALTableAdapters.H2_ANATOMIAPAT_NOMENCLADOR_LISTTableAdapter adapter = new AnatomiaPatologicaDALTableAdapters.H2_ANATOMIAPAT_NOMENCLADOR_LISTTableAdapter();
            AnatomiaPatologicaDAL.H2_ANATOMIAPAT_NOMENCLADOR_LISTDataTable aTable = adapter.GetData();
            foreach (AnatomiaPatologicaDAL.H2_ANATOMIAPAT_NOMENCLADOR_LISTRow row in aTable.Rows)
            {
                list.Add(CreateFromRow_List_Nomenclador(row));
            }
            return list;
        }

        private AnatomiaPatologica_Nomenclador CreateFromRow_List_Nomenclador(AnatomiaPatologicaDAL.H2_ANATOMIAPAT_NOMENCLADOR_LISTRow row)
        {
            AnatomiaPatologica_Nomenclador a = new AnatomiaPatologica_Nomenclador();
            if (!row.IsValorNull())
                a.Valor = row.Valor;
            a.Descripcion = row.Descripcion;
            a.Id = row.Id;
            return a;
        }

        public List<AnatomiaPatologica_Diagnostico> List_Diagnosticos()
        {
            List<AnatomiaPatologica_Diagnostico> list = new List<AnatomiaPatologica_Diagnostico>();
            AnatomiaPatologicaDALTableAdapters.H2_ANATOMIAPAT_DIAGNOSTICOS_LISTTableAdapter adapter = new AnatomiaPatologicaDALTableAdapters.H2_ANATOMIAPAT_DIAGNOSTICOS_LISTTableAdapter();
            AnatomiaPatologicaDAL.H2_ANATOMIAPAT_DIAGNOSTICOS_LISTDataTable aTable = adapter.GetData();
            foreach (AnatomiaPatologicaDAL.H2_ANATOMIAPAT_DIAGNOSTICOS_LISTRow row in aTable.Rows)
            {
                list.Add(CreateFromRow_List_Diagnosticos(row));
            }
            return list;
        }

        private AnatomiaPatologica_Diagnostico CreateFromRow_List_Diagnosticos(AnatomiaPatologicaDAL.H2_ANATOMIAPAT_DIAGNOSTICOS_LISTRow row)
        {
            AnatomiaPatologica_Diagnostico a = new AnatomiaPatologica_Diagnostico();
            a.Descripcion = row.Descripcion;
            a.Id = row.Id;
            return a;
        }
    }
}