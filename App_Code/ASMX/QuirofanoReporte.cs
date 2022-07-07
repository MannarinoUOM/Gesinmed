using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;

/// <summary>
/// Descripción breve de QuirofanoReporte
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// Para permitir que se llame a este servicio Web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class QuirofanoReporte : System.Web.Services.WebService {

    public QuirofanoReporte () {

        //Eliminar la marca de comentario de la línea siguiente si utiliza los componentes diseñados 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession=true)]
    public List<QuirofanoReporteItem> TraerFiltros(int tipo)
    {
        Hospital.QuirofanoReporte reporte = new Hospital.QuirofanoReporte();
        return reporte.Traer_Filtros(tipo);
    }

    [WebMethod(EnableSession = true)]
    public List<QuirofanoReporteItem> traerIndicadores()
    {
        Hospital.QuirofanoReporte reporte = new Hospital.QuirofanoReporte();
        return reporte.traer_Indicadores();
    }


    [WebMethod(EnableSession = true)]
    public QuirofanoReporteItem CalcularIndicadores(string desde, string hasta, int tipo)
    {
        Hospital.QuirofanoReporte reporte = new Hospital.QuirofanoReporte();
        return reporte.Calcular_Indicadores(desde,hasta,tipo);
    }

    [WebMethod(EnableSession = true)]
    public void actualizartabla(int id,int cantidad,string desde, string hasta)
    {
        if (Session["Usuario"] != null) { }
        
        Hospital.QuirofanoReporte reporte = new Hospital.QuirofanoReporte();
        reporte.actualizar_tabla(id,cantidad,desde, hasta);
    }

    [WebMethod(EnableSession = true)]
    public void actualizarImpresionIndicadores(List<QuirofanoReporteItem> lista)
    {
        if (Session["Usuario"] != null) { }

        Hospital.QuirofanoReporte reporte = new Hospital.QuirofanoReporte();
        reporte.actualizar_Impresion_Indicadores(lista);
    }
}
