using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using Microsoft.Reporting.WebForms;
using System.Web.Configuration;
using HospitalBLL.Entities;

using System.Net;

public partial class Impresiones_ListaInternados : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {


                ReportParameter[] parameters = new ReportParameter[2];

                parameters[0] = new ReportParameter("Logo", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");

                parameters[1] = new ReportParameter("Usuario", ((usuarios)Session["Usuario"]).nombre);

                ReportViewer1.LocalReport.EnableExternalImages = true;
                ReportViewer1.LocalReport.SetParameters(parameters);
                ReportViewer1.LocalReport.Refresh();

           
        }
    }


    public void pdf_Click(object sender, EventArgs e)
    {
        //ReportViewer1.LocalReport.ReportPath = "Impresion/ConfirmacionTurnos.rdlc";

            Warning[] warnings;
            string[] streamids;
            string mimeType;
            string encoding;
            string extension;

            byte[] byteArray = ReportViewer1.LocalReport.Render("PDF", null, out mimeType, out encoding, out extension, out streamids, out warnings);


            HttpContext.Current.Response.Buffer = true;
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ContentType = mimeType;
            HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=Receta." + "PDF"));
            HttpContext.Current.Response.BinaryWrite(byteArray);
            HttpContext.Current.Response.Flush();
            HttpContext.Current.Response.End();
   
    }
}