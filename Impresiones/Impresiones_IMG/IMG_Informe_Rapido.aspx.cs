using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;

public partial class Impresiones_Impresiones_IMG_Informe_Rapido : System.Web.UI.Page
{
    private string TurnoId;
    
    protected void Page_Load(object sender, EventArgs e)
    {        
        
        if (!IsPostBack)
        {
            ReportParameter[] parameters = new ReportParameter[4];
            parameters[0] = new ReportParameter("Logo", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
            usuarios u = (usuarios)Session["Usuario"];
            parameters[1] = new ReportParameter("Usuario", "" + u.nombre);

            string MI_SobreFirma = "";
            string MI_Firma = "";            

            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            IMG_PROTOCOLO_FIRMA unaFirma = img.IMG_FIRMA_PROTOCOLORAPIDO(long.Parse(Request.QueryString["TurnoId"]));

            MI_SobreFirma = unaFirma.MI_SOBREFIRMA;
            if (unaFirma.MI_MEDICOID == "") { unaFirma.MI_MEDICOID = "0"; }
            MI_Firma = "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/Firmas_IMG/" + unaFirma.MI_MEDICOID + ".png";
            
            parameters[2] = new ReportParameter("MI_SobreFirma", "" + MI_SobreFirma);
            parameters[3] = new ReportParameter("MI_Firma", "" + MI_Firma);

            ReportViewer1.LocalReport.EnableExternalImages = true;
            ReportViewer1.LocalReport.SetParameters(parameters);
            ReportViewer1.LocalReport.Refresh();

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
        HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=IMG_Turno_" + TurnoId + ".PDF"));
        HttpContext.Current.Response.BinaryWrite(byteArray);
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();
    }
}