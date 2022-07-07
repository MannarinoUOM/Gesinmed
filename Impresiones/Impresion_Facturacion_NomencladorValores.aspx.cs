using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;

public partial class Impresiones_Impresion_Facturacion_NomencladorValores : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            ReportParameter[] parameters = new ReportParameter[3];
            parameters[0] = new ReportParameter("Imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
            parameters[1] = new ReportParameter("Usuario", "Impreso por: " + ((usuarios)Session["Usuario"]).nombre + " - Fecha: " + DateTime.Now.ToString("dd/MM/yyyy HH:mm"));
            parameters[2] = new ReportParameter("Nomenclador", Nomenclador_Desc(int.Parse(Request.QueryString["NomencladorId"])));
            ReportViewer1.LocalReport.EnableExternalImages = true;
            ReportViewer1.LocalReport.SetParameters(parameters);
            ReportViewer1.LocalReport.Refresh();
        }
    }

    private string Nomenclador_Desc(int NomencladorId)
    {
        Hospital.FacturacionBLL Fact = new Hospital.FacturacionBLL();
        List<Facturacion_Nomenclador> List = Fact.FACT_NOMENCLA_LIST(false, 10);
        foreach (Facturacion_Nomenclador f in List)
            if (f.FACT_NOMENCLA_ID == NomencladorId) return f.FACT_NOMENCLA_DESC;
        return string.Empty;
    }

    public void pdf_Click()
    {
        Warning[] warnings;
        string[] streamids;
        string mimeType;
        string encoding;
        string extension;

        byte[] byteArray = ReportViewer1.LocalReport.Render("PDF", null, out mimeType, out encoding, out extension, out streamids, out warnings);


        HttpContext.Current.Response.Buffer = true;
        HttpContext.Current.Response.Clear();
        HttpContext.Current.Response.ContentType = mimeType;
        HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=Nomenclador_Valores." + "PDF"));
        HttpContext.Current.Response.BinaryWrite(byteArray);
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();
    }
}