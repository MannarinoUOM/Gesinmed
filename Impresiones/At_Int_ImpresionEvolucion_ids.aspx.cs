using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;

public partial class Impresiones_At_Int_ImpresionEvolucion_ids : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            try
            {

                int linea = Convert.ToInt32(Request.QueryString["lineas"]);
                string frente = Request.QueryString["encabezado"];

                if (frente == "0") { frente = "1"; } else { frente = "0"; }

                string enter = "";
                for (int i = 0; i <= linea; i++)
                {
                    enter = enter + "<br/>";
                }


                ReportParameter[] parameters = new ReportParameter[5];
                parameters[0] = new ReportParameter("Imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
                parameters[1] = new ReportParameter("Usuario", ((usuarios)Session["Usuario"]).nombre);
                parameters[2] = new ReportParameter("Linea", enter);
                parameters[3] = new ReportParameter("Frente", frente);
                parameters[4] = new ReportParameter("imagenFirma", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/firmaImagen/");
                ReportViewer1.LocalReport.EnableExternalImages = true;
                ReportViewer1.LocalReport.SetParameters(parameters);
                ReportViewer1.LocalReport.Refresh();
            }
            catch (Exception ex)
            {
                Response.Write(ex.Message);
                Response.End();
            }
        }
    }


    public void pdf()
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
            HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=Autorizacion." + "PDF"));
            HttpContext.Current.Response.BinaryWrite(byteArray);
            HttpContext.Current.Response.Flush();
            HttpContext.Current.Response.End();        
    }
}