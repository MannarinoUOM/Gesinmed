using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for CentroBLL
/// </summary>
namespace Hospital
{
    public class CentroBLL
    {
        public CentroList List()
        {
            CentroList list = new CentroList();
            CentroDALTableAdapters.Turnos_Centro_ListTableAdapter adapter = new CentroDALTableAdapters.Turnos_Centro_ListTableAdapter();
            CentroDAL.Turnos_Centro_ListDataTable aTable = adapter.GetData(null);
            foreach (CentroDAL.Turnos_Centro_ListRow row in aTable.Rows)
            {
                list.Add(CreateFromRow(row));
            }

            return list;
        }


        public centro GetById(int id)
        {
            centro c = null;
            CentroDALTableAdapters.Turnos_Centro_ListTableAdapter adapter = new CentroDALTableAdapters.Turnos_Centro_ListTableAdapter();
            CentroDAL.Turnos_Centro_ListDataTable aTable = adapter.GetData(id);
            CentroDAL.Turnos_Centro_ListRow row;
            if (aTable.Count > 0)
            {
                row = aTable[0];
                c = CreateFromRow(row);
            }
            return c;
        }


        public centro elCentro()
        {
            centro c = null;
            CentroDALTableAdapters.H2_Turnos_Centro_UnicoTableAdapter adapter = new CentroDALTableAdapters.H2_Turnos_Centro_UnicoTableAdapter();
            CentroDAL.H2_Turnos_Centro_UnicoDataTable aTable = adapter.GetData();
            CentroDAL.H2_Turnos_Centro_UnicoRow row;
            if (aTable.Count > 0)
            {
                row = aTable[0];
                c = CreateFromRowUnico(row);
            }
            return c;
        }


        public CentroUnicoList UnicoCentro()
        {
            CentroUnicoList Lista = new CentroUnicoList();
            centro_unico c = new centro_unico();
            CentroDALTableAdapters.H2_Turnos_Centro_PrimeroTableAdapter adapter = new CentroDALTableAdapters.H2_Turnos_Centro_PrimeroTableAdapter();

            CentroDAL.H2_Turnos_Centro_PrimeroDataTable aTable = adapter.GetData();
            CentroDAL.H2_Turnos_Centro_PrimeroRow row;
            if (aTable.Count > 0)
            {
                row = aTable[0];

                c.Id = row.Id;

                if (!row.IsTelefonoNull())
                    c.Telefono = row.Telefono;

                c.Calle = row.Calle;

                if (!row.IsNroNull())
                    c.Nro = row.Nro;

                if (!row.IsObservacioens2Null())
                    c.Observacioens2 = row.Observacioens2;

                if (!row.IsProvinciaNull())
                    c.Provincia = row.Provincia;

                if (!row.IsLocalidadIdNull())
                    c.Localidad = row.LocNombre;

                c.RazonSocial = row.RazonSocial;

                c.NroInscripcion = row.NroInscripcion;
                Lista.Add(c);
            }
            return Lista;
        }

        private centro CreateFromRowUnico(CentroDAL.H2_Turnos_Centro_UnicoRow row)
        {
            centro c = new centro(row.Id, row.RazonSocial);
            c.Calle = row.Calle;

            if (!row.IsNroNull())
                c.Nro = row.Nro;
            if (!row.IsDeptoNull())
                c.Depto = row.Depto;
            if (!row.IsPisoNull())
                c.Piso = row.Piso;
            if (!row.IsCPNull())
                c.CodigoPostal = row.CP;
            if (!row.IsProvinciaNull())
                c.Provincia = row.Provincia;
            if (!row.IsTelefonoNull())
                c.Telefono = row.Telefono;
            if (!row.IsFaxNull())
                c.Fax = row.Fax;
            if (!row.IsObservacionesNull())
                c.Observaciones = row.Observaciones;
            if (!row.IsDirectorNull())
                c.Director = row.Director;
            if (!row.IsNroCuitNull())
                c.NroCuit = row.NroCuit;
            if (!row.IsObservacioens2Null())
                c.Observacioens2 = row.Observacioens2;
            if (!row.IsLocalidadIdNull())
                c.LocalidadId = row.LocalidadId;
            if (!row.IsNroInscripcionNull())
                c.NroInscripcion = row.NroInscripcion;

            c.LOCNOMBRE = row.LocNombre;

            return c;
        }

        private centro CreateFromRow(CentroDAL.Turnos_Centro_ListRow row)
        {
            centro c = new centro(row.Id, row.RazonSocial);
            c.Calle = row.Calle;

            if (!row.IsNroNull())
                c.Nro = row.Nro;
            if (!row.IsDeptoNull())
                c.Depto = row.Depto;
            if (!row.IsPisoNull())
                c.Piso = row.Piso;
            if (!row.IsCPNull())
                c.CodigoPostal = row.CP;
            if (!row.IsProvinciaNull())
                c.Provincia = row.Provincia;
            if (!row.IsTelefonoNull())
                c.Telefono = row.Telefono;
            if (!row.IsFaxNull())
                c.Fax = row.Fax;
            if (!row.IsObservacionesNull())
                c.Observaciones = row.Observaciones;
            if (!row.IsDirectorNull())
                c.Director = row.Director;
            if (!row.IsNroCuitNull())
                c.NroCuit = row.NroCuit;
            if (!row.IsObservacioens2Null())
                c.Observacioens2 = row.Observacioens2;
            if (!row.IsLocalidadIdNull())
                c.LocalidadId = row.LocalidadId;
            if (!row.IsNroInscripcionNull())
                c.NroInscripcion = row.NroInscripcion;

            c.LOCNOMBRE = row.LocNombre;

            return c;
        }

        public int Guardar_Centro(string RazonSocial, string Calle, string Nro, string Piso,string Depto, string CodigoPostal, int LocalidadId, string Provincia, string Observaciones, string Director, string NroCuit, string Observacioens2, string Telefono, string Fax, string NroInscripcion)
        {
            CentroDALTableAdapters.QueriesTableAdapter adapter = new CentroDALTableAdapters.QueriesTableAdapter();
            object newId = adapter.H2_Turnos_Centro_Guardar(RazonSocial, Calle, Nro, Piso, Depto, CodigoPostal, LocalidadId, Provincia, Observaciones, Director, NroCuit, Observacioens2, Telefono, Fax, NroInscripcion);
            return Convert.ToInt32(newId);
        }

    }
}