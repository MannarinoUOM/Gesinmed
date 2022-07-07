using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;


using Microsoft.Reporting.WebForms;
using System.Web.Configuration;
using Hospital;


public partial class Impresiones_Hemodinamia_ListadoInsumos : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {                
                CentroBLL cent = new CentroBLL();
                centro_unico c = new centro_unico();
                c = cent.UnicoCentro()[0];

                ReportParameter[] parameters = new ReportParameter[4];
                parameters[0] = new ReportParameter("Usuario", "" + ((usuarios)Session["Usuario"]).nombre);
                parameters[1] = new ReportParameter("Imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
                parameters[2] = new ReportParameter("Titulo", c.RazonSocial);
                parameters[3] = new ReportParameter("Nombre", c.Calle + " " + c.Nro + " (" + c.CodigoPostal + ") <br />" + c.Telefono);

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
        HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=ProtesisyOtros." + "PDF"));
        HttpContext.Current.Response.BinaryWrite(byteArray);
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();
    }

}