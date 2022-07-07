using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.IO;
using Microsoft.Reporting.WebForms;

public partial class Facturacion_CrearArchivo : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        Fact_GeneraArchivo_SN_DALTableAdapters.H2_FACT_GENERA_ARCHIVO_OSAPTableAdapter adapter = new Fact_GeneraArchivo_SN_DALTableAdapters.H2_FACT_GENERA_ARCHIVO_OSAPTableAdapter();
        Fact_GeneraArchivo_SN_DAL.H2_FACT_GENERA_ARCHIVO_OSAPDataTable aTable = adapter.GetData("0001", "00000004");
        HttpContext.Current.Response.Buffer = true;
        HttpContext.Current.Response.Clear();
        HttpContext.Current.Response.ContentType = "text/plain";
        HttpContext.Current.Response.AddHeader("content-disposition", ("attachment; filename=OSAPLIQ.ASC"));
        foreach (Fact_GeneraArchivo_SN_DAL.H2_FACT_GENERA_ARCHIVO_OSAPRow row in aTable.Rows)
        {
            HttpContext.Current.Response.Write(row.NUMERO_FACTURA + row.MATRIPRES.PadRight(7,' ') + row.NUMERO_PRAC.PadRight(8,' ') + row.BENEFICIARIO.PadRight(9,' ') + row.FECHA_PRESTACION + row.HORA +
            row.CANCODNN.Replace(',','.').PadLeft(8,' ') + row.CODNN.PadLeft(6,'0') + row.DESCRIP.ToString().PadRight(40, ' ') + row.HONO.ToString().Replace(',', '.').PadLeft(10, ' ') + row.DERE.ToString().Replace(',', '.').PadLeft(10, ' ') + row.TOTAL.ToString().Replace(',', '.').PadLeft(10, ' ') 
            + row.DIAG.PadRight(40,' ') + Environment.NewLine);
        }
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();
    }
}