using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;

public partial class Impresiones_Imprimir_CaratulaHC : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {

            PacientesDALTableAdapters.H2_Afiliado_Encabezado_IDTableAdapter adapter = new PacientesDALTableAdapters.H2_Afiliado_Encabezado_IDTableAdapter();
            PacientesDAL.H2_Afiliado_Encabezado_IDDataTable aTable = adapter.GetData(Convert.ToInt64(Request.QueryString["NHC"].ToString()));

            string Foto = "";

            if (aTable.Count > 0)
            {
                Foto = aTable[0].foto;
            }


            ReportParameter[] parameters = new ReportParameter[2];
            //parameters[0] = new ReportParameter("PacienteImg", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/pacientes/" + Request.QueryString["NHC"].ToString() + ".jpg");
            parameters[0] = new ReportParameter("PacienteImg", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/pacientes" + Foto);
            parameters[1] = new ReportParameter("Usuario", ((usuarios)Session["Usuario"]).usuario);
            ReportViewer1.LocalReport.EnableExternalImages = true;
            ReportViewer1.LocalReport.SetParameters(parameters);
            ReportViewer1.LocalReport.Refresh();
        }
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
        HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=CaratulaHC." + "PDF"));
        HttpContext.Current.Response.BinaryWrite(byteArray);
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();
    }
}