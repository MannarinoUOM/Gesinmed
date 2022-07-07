using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for EspecialidadesBLL
/// </summary>
/// 
namespace Hospital
{
    public class EspecialidadesBLL
    {
        public EspecialidadesBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public List<especialidades> Especialidades_Lista(bool Todos, long? Agregar_Id, bool SoloTurnos)
        {
            List<especialidades> lista = new List<especialidades>();
            EspecialidadesDALTableAdapters.H2_Especialidades_ListaTableAdapter adapter = new EspecialidadesDALTableAdapters.H2_Especialidades_ListaTableAdapter();
            EspecialidadesDAL.H2_Especialidades_ListaDataTable aTable = adapter.GetData(Todos, Agregar_Id, SoloTurnos);

            foreach (EspecialidadesDAL.H2_Especialidades_ListaRow row in aTable.Rows)
            {
                especialidades e = new especialidades();
                if (!row.IsIdNull()) e.Id = row.Id;
                if (!row.IsDescripcionNull()) e.Especialidad = row.Descripcion;
                if (!row.IsCHK_ESP_SHOWNull()) { e.teleconsulta = row.CHK_ESP_SHOW; }
                lista.Add(e);
            }

            return lista;
        }


        public List<especialidades> Especialidades_Lista_Parte(bool Todos, long? Agregar_Id, bool SoloTurnos)
        {
            List<especialidades> lista = new List<especialidades>();
            EspecialidadesDALTableAdapters.H2_Especialidades_Lista_ParteTableAdapter adapter = new EspecialidadesDALTableAdapters.H2_Especialidades_Lista_ParteTableAdapter();
            EspecialidadesDAL.H2_Especialidades_Lista_ParteDataTable aTable = adapter.GetData(Todos, Agregar_Id, SoloTurnos);

            foreach (EspecialidadesDAL.H2_Especialidades_Lista_ParteRow row in aTable.Rows)
            {
                especialidades e = new especialidades();
                if (!row.IsIdNull()) e.Id = row.Id;
                if (!row.IsDescripcionNull()) e.Especialidad = row.Descripcion;
                lista.Add(e);
            }

            return lista;
        }



        public especialidades Especialidades_Id(long Id)
        {
            EspecialidadesDALTableAdapters.H2_Especialidad_IdTableAdapter adapter = new EspecialidadesDALTableAdapters.H2_Especialidad_IdTableAdapter();
            EspecialidadesDAL.H2_Especialidad_IdDataTable aTable = adapter.GetData(Id);

            if (aTable.Rows.Count > 0)
            {
                especialidades e = new especialidades();
                e.Id = aTable[0].Id;
                e.Especialidad = aTable[0].Descripcion;
                return e;
            }

            return null;
        }

        
        public List<especialidades> Imagenes_Especialidades(long Id)
        {
            List<especialidades> lista = new List<especialidades>();
            EspecialidadesDALTableAdapters.H2_IMG_Listar_EspecialidadesTableAdapter adapter = new EspecialidadesDALTableAdapters.H2_IMG_Listar_EspecialidadesTableAdapter();
            EspecialidadesDAL.H2_IMG_Listar_EspecialidadesDataTable aTable = adapter.GetData(Id);

            foreach (EspecialidadesDAL.H2_IMG_Listar_EspecialidadesRow row in aTable)
            { 
                especialidades e = new especialidades();
                e.Id = row.Id;
                e.Especialidad = row.Descripcion;
                lista.Add(e);
            }            
            return lista;
        }

        

        public List<Especialidad> Especialidades_Lista()
        {
            List<Especialidad> lista = new List<Especialidad>();
            EspecialidadesDALTableAdapters.H2_ESPECIALIDAD_LISTATableAdapter adapter = new EspecialidadesDALTableAdapters.H2_ESPECIALIDAD_LISTATableAdapter();
            EspecialidadesDAL.H2_ESPECIALIDAD_LISTADataTable aTable = adapter.GetData();

            foreach (EspecialidadesDAL.H2_ESPECIALIDAD_LISTARow row in aTable.Rows)
            {
                Especialidad e = new Especialidad();
                e.Id = row.Id;
                e.Especialidad_Nombre = row.Especialidad;
                if (!row.IsActivaNull())
                    e.Activa = row.Activa;
                else e.Activa = true;
                if (!row.IsTurnosNull())
                    e.Turnos = row.Turnos;
                else e.Turnos = true;
                lista.Add(e);
            }

            return lista;
        }

        public void Especialidad_Guardar(Especialidad e)
        {
            EspecialidadesDALTableAdapters.QueriesTableAdapter adapter = new EspecialidadesDALTableAdapters.QueriesTableAdapter();
            adapter.H2_ESPECIALIDAD_INSERT(e.Id, e.Especialidad_Nombre, e.Activa, e.Turnos);
        }

    }
}