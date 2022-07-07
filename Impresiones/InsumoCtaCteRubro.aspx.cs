using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;
using Hospital;

public partial class Impresiones_InsumoCtaCteRubro : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            ReportParameter[] parameters = new ReportParameter[7];
            parameters[0] = new ReportParameter("Usuario", "" + ((usuarios)Session["Usuario"]).nombre);
            parameters[1] = new ReportParameter("Imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
            parameters[2] = new ReportParameter("ConInv", Request.QueryString["ConInv"]);
            parameters[3] = new ReportParameter("Desde", Request.QueryString["Desde"]);
            parameters[4] = new ReportParameter("Hasta", Request.QueryString["Hasta"]);
            parameters[5] = new ReportParameter("RubroId", GetRubro());
            parameters[6] = new ReportParameter("Excel", Request.QueryString["Excel"]);
            ReportViewer1.LocalReport.EnableExternalImages = true;
            ReportViewer1.LocalReport.SetParameters(parameters);
            ReportViewer1.LocalReport.Refresh();
        }
    }

    public string GetRubro()
    {
        FarmaciaBLL b = new FarmaciaBLL();
        List<Medicamento_Rubro> lista = new List<Medicamento_Rubro>();
        lista = b.List_Medicamentos_Rubro();
        int Rubro = int.Parse(Request.QueryString["RubroId"]);
        Medicamento_Rubro m = lista.Find(delegate (Medicamento_Rubro m1) {
            return m1.Id == Rubro;
        });
        return m.Rubro;
    }

    public void Crearpdf()
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
        HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=InsumoCtaCteRubro." + "PDF"));
        HttpContext.Current.Response.BinaryWrite(byteArray);
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();
    }
}