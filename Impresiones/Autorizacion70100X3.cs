using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;
using System.Web.Configuration;

public partial class Impresiones_Autorizacion70100 : System.Web.UI.Page
{

 bool Existe = false;

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
                }
                catch
                {
                    Protocolo = 0;
                }

            }

            if (Protocolo != 0)
            {

                Existe = true;

                Hospital.CentroBLL Centro = new Hospital.CentroBLL();
                centro C = Centro.elCentro();

                ReportParameter[] parameters = new ReportParameter[11];
                parameters[0] = new ReportParameter("LogoForjar", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/Logo2.gif");
                parameters[1] = new ReportParameter("Imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
                parameters[2] = new ReportParameter("Direccion", "" + C.Calle);
                parameters[3] = new ReportParameter("Numero", "" + C.Nro);
                parameters[4] = new ReportParameter("CodigoPostal", "" + C.CodigoPostal);
                parameters[5] = new ReportParameter("Localidad", "" + C.LOCNOMBRE);
                parameters[6] = new ReportParameter("Provincia", "" + C.Provincia);                
                parameters[7] = new ReportParameter("Telefono", "Tel. " + C.Telefono.ToString());
                parameters[8] = new ReportParameter("RazonSocial", C.RazonSocial);
                parameters[9] = new ReportParameter("imagenFirma", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/firmaImagen/" + Request.QueryString["imgF"]);
                parameters[10] = new ReportParameter("imagenFirmaTrue", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/firmaImagen/");


                ReportViewer1.LocalReport.EnableExternalImages = true;
                ReportViewer1.LocalReport.SetParameters(parameters);
                ReportViewer1.LocalReport.Refresh();
                

            }
        }
    }

    public void pdf()
    {


        if (Existe)
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


}