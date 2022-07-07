using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;
using System.Web.Configuration;
using System.IO;

public partial class Impresion_Endoscopia_ProEndoscoDibujo : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            string Endoscopia_id = Request.QueryString["Id"];

            ReportParameter[] parameters = new ReportParameter[4];
            parameters[0] = new ReportParameter("Usuario", "" + ((usuarios)Session["Usuario"]).nombre);
            parameters[1] = new ReportParameter("Imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");

            string ruta_archivo = @"\\10.10.8.66\Files\Software\Aplicaciones\documentacion_new\ESTUDIOS\1_" + Endoscopia_id + ".bmp";
            string resumeFile =  Server.MapPath(@"~\Endoscopia\Paint\ESTUDIOS\1_" + Endoscopia_id + ".bmp");
            string Original = Server.MapPath(@"~\Endoscopia\Paint\Endoscopia\Dibujo.bmp"); //@"C:\Users\Santa\Documents\Proyectos\Hospital_Fede_Manu_Gera\Endoscopia\paint\Endoscopia";

            if (File.Exists(ruta_archivo))
            {
                parameters[2] = new ReportParameter("DIBUJO", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/Endoscopia/paint/Estudios/1_" + Endoscopia_id + ".bmp");                          
            }
                else 
            {
                parameters[2] = new ReportParameter("DIBUJO", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/Endoscopia/paint/Endoscopia/Dibujo.bmp");          
            }

            parameters[3] = new ReportParameter("imagenFirma", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/firmaImagen/");
                        
            ReportViewer1.LocalReport.EnableExternalImages = true;
            ReportViewer1.LocalReport.SetParameters(parameters);
            ReportViewer1.LocalReport.Refresh();
        }
    }

    public void Crearpdf()
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
        HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=ProEndoscoDibujo." + "PDF"));
        HttpContext.Current.Response.BinaryWrite(byteArray);
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();
    }
}