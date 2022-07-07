using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;
using System.Web.Configuration;
public partial class Impresiones_ImpresionOrdenesEstudios : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

        if (!IsPostBack)
        {
            int Protocolo = 0;
            if (!string.IsNullOrEmpty(Request.QueryString["Protocolo"]))
            {
                try
                {
                    Protocolo = Convert.ToInt32(Request.QueryString["Protocolo"]);
                    txtProtocolo.Text = Protocolo.ToString();
                    if (Protocolo == 0)
                    {
                        Response.End();
                    }

                }
                catch
                {
                    Protocolo = 0;
                }

            }

            Hospital.CentroBLL Centro = new Hospital.CentroBLL();
            centro C = Centro.elCentro();            
               
              
                ReportParameter[] parameters = new ReportParameter[7];
                parameters[0] = new ReportParameter("Nombre", ((usuarios)Session["Usuario"]).nombre);
                parameters[1] = new ReportParameter("Imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
                parameters[2] = new ReportParameter("Inscripcion", "Nro de Inscripción " + C.NroInscripcion);
                parameters[3] = new ReportParameter("Direccion", "" + C.RazonSocial + " - Tel. " + C.Telefono);
                parameters[4] = new ReportParameter("Titulo", "OSUOMRA");
                parameters[5] = new ReportParameter("Fecha", "FECHA: " + DateTime.Now.ToShortDateString());
                parameters[6] = new ReportParameter("imagenFirma", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/firmaImagen/");

                ReportViewer1.LocalReport.EnableExternalImages = true;
                ReportViewer1.LocalReport.SetParameters(parameters);
                ReportViewer1.LocalReport.Refresh();



            }        }
    

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
        HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=Turnos." + "PDF"));
        HttpContext.Current.Response.BinaryWrite(byteArray);
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();
    }
}