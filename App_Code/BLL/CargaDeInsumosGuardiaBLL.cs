using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

/// <summary>
/// Summary description for CargaDeInsumosGuardiaBLL
/// </summary>
public class CargaDeInsumosGuardiaBLL
{
    public CargaDeInsumosGuardiaBLL()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public List<Medicamentos> TraerDatos()
    {
        Guardia_PruebaDALTableAdapters.SELECT_GUARDIA_MEDICAMENTOSTableAdapter adapter = new Guardia_PruebaDALTableAdapters.SELECT_GUARDIA_MEDICAMENTOSTableAdapter();
        Guardia_PruebaDAL.SELECT_GUARDIA_MEDICAMENTOSDataTable aTable = adapter.GetData();

        List<Medicamentos> lista = new List<Medicamentos>();

        foreach (Guardia_PruebaDAL.SELECT_GUARDIA_MEDICAMENTOSRow row in aTable.Rows)
        {
            Medicamentos gm = new Medicamentos();
            gm.InsumoID = row.InsumoId.ToString();
            gm.PrecioUOM = row.PrecioUOM.ToString("#,##0.00");
            gm.PrecioOS = row.PrecioOS.ToString("#,##0.00");
            //if(!row.IsNombreNull())
            gm.Nombre = row.Nombre;
            if (!row.IsCodigo_kikeNull())
            { gm.Codigo_Kike = row.Codigo_kike.ToString(); }
            else
            { gm.Codigo_Kike = ""; }



            lista.Add(gm);

        }

        return lista;
    }

    public void ModificarMedicamento(int id, float precioUOM, float precioOS, string nombre, Int64 codKike)
    {
        Guardia_PruebaDALTableAdapters.QueriesTableAdapter adapter = new Guardia_PruebaDALTableAdapters.QueriesTableAdapter();
        adapter.H2_INSERTAR_MEDICAMENTOS_GUARDIA(id, precioUOM, precioOS, nombre, codKike);

    }
    //para cargar tabla de busqueda
    public List<MedicamentosSeleccionar> TraerDatosBusqueda(string Nombre)
    {
        //Guardia_PruebaDALTableAdapters.SELECT_GUARDIA_MEDICAMENTOSTableAdapter adapter = new Guardia_PruebaDALTableAdapters.SELECT_GUARDIA_MEDICAMENTOSTableAdapter();
        //Guardia_PruebaDAL.SELECT_GUARDIA_MEDICAMENTOSDataTable aTable = adapter.GetData();


        Guardia_PruebaDALTableAdapters.H2_SELECCIONAR_INSUMOSTableAdapter adapter = new Guardia_PruebaDALTableAdapters.H2_SELECCIONAR_INSUMOSTableAdapter();
        Guardia_PruebaDAL.H2_SELECCIONAR_INSUMOSDataTable aTable = adapter.GetData(Nombre);

        List<MedicamentosSeleccionar> listilla = new List<MedicamentosSeleccionar>();

        foreach (Guardia_PruebaDAL.H2_SELECCIONAR_INSUMOSRow row in aTable.Rows)
        {
            //Medicamentos gm = new Medicamentos();
            MedicamentosSeleccionar ms = new MedicamentosSeleccionar();
            ms.id = row.REM_ID.ToString();
            ms.nombre = row.REM_NOMBRE.ToString();

            //gm.InsumoID = row.InsumoId.ToString();
            //gm.PrecioUOM = row.PrecioUOM.ToString("#,##0.00");
            //gm.PrecioOS = row.PrecioOS.ToString("#,##0.00");
            ////if(!row.IsNombreNull())
            //gm.Nombre = row.Nombre;
            //if (!row.IsCodigo_kikeNull()) gm.Codigo_Kike = row.Codigo_kike.ToString();



            listilla.Add(ms);

        }

        return listilla;
    }
  
}