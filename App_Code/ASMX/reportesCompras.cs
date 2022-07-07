using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using System.Web.Script.Serialization;
using Hospital;

/// <summary>
/// Descripción breve de reportesCompras
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// Para permitir que se llame a este servicio Web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
[System.Web.Script.Services.ScriptService]
public class reportesCompras : System.Web.Services.WebService {

    public reportesCompras () {

        //Eliminar la marca de comentario de la línea siguiente si utiliza los componentes diseñados 
        //InitializeComponent(); 
    }

      [WebMethod(EnableSession = true)]
    public List<itemCombo> ReportesComprasTraerPatologias()
    {
        reportesComprasBLL r = new reportesComprasBLL();
        return r.Reportes_Compras_Traer_Patologias();
    }

      [WebMethod(EnableSession = true)]
      public List<itemCombo> ReportesComprasTraerInsumos()
      {
          reportesComprasBLL r = new reportesComprasBLL();
          return r.Reportes_Compras_Traer_Insumos();
      }


      [WebMethod(EnableSession = true)]
      public List<reporteCABA> ReporteAmbulatorioCABANuevo(string desde, string hasta, string afiliado, int dni, int nhc, int seccional, int pedido, string insumo, int pocentaje, string gastoUOM, int remito)
      {
          reportesComprasBLL r = new reportesComprasBLL();
          return r.ReporteAmbulatorioCABANuevo(desde, hasta, afiliado, dni, nhc, seccional, pedido, insumo, pocentaje, gastoUOM, remito);
      }


      [WebMethod(EnableSession = true)]
      public List<reporteGastosAdministraciónInternación> GastosAdministraciónInternacion(string desde, string hasta, int proveedor, string tipoOrden, int nroOrden, string insumo, string remito, string factura)
      {
          reportesComprasBLL r = new reportesComprasBLL();
          return r.GastosAdministraciónInternacion(desde, hasta, proveedor, tipoOrden, nroOrden,insumo,remito,factura);
      }
}
