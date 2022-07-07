using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;

public partial class Impresiones_Impresiones_IMG_Informe : System.Web.UI.Page
{
    private string TurnoId;
    
    protected void Page_Load(object sender, EventArgs e)
    {        
        
        if (!IsPostBack)
        {
            ReportParameter[] parameters = new ReportParameter[6];
            parameters[0] = new ReportParameter("Logo", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
            usuarios u = (usuarios)Session["Usuario"];
            parameters[1] = new ReportParameter("Usuario", "" + u.nombre);

            string MI_SobreFirma = "";
            string MI_Firma = "";
            string MV_SobreFirma = "";
            string MV_Firma = "";
                      
            
            

            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            IMG_PROTOCOLO_FIRMA unaFirma = img.IMG_FIRMA_PROTOCOLO(long.Parse(Request.QueryString["TurnoId"]));

            MI_SobreFirma = unaFirma.MI_SOBREFIRMA;
            if (unaFirma.MI_MEDICOID == "") { unaFirma.MI_MEDICOID = "0"; }
            MI_Firma = "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/Firmas_IMG/" + unaFirma.MI_MEDICOID + ".png";
                       
                        
            if (unaFirma.MI_MEDICOID != unaFirma.MV_MEDICOID && unaFirma.MV_MEDICOID != "")
            {
                MV_SobreFirma = unaFirma.MV_SOBREFIRMA;
                if (unaFirma.MV_MEDICOID == "") { unaFirma.MV_MEDICOID = "0"; }
                MV_Firma = "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/Firmas_IMG/" + unaFirma.MV_MEDICOID + ".png";
            }
            
            
            if (unaFirma.MI_MEDICOID == "0" && unaFirma.MV_MEDICOID != "" && unaFirma.MV_MEDICOID != "0")
            {
                MI_SobreFirma = MV_SobreFirma;
                MI_Firma = MV_Firma;

                MV_SobreFirma = "";
                MV_Firma = "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/Firmas_IMG/0.png";
            }



            parameters[2] = new ReportParameter("MI_SobreFirma", "" + MI_SobreFirma);
            parameters[3] = new ReportParameter("MI_Firma", "" + MI_Firma);
            parameters[4] = new ReportParameter("MV_SobreFirma", "" + MV_SobreFirma);
            parameters[5] = new ReportParameter("MV_Firma", "" + MV_Firma);                       
            
            


            //string RutaCodigo = "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + string.Format(@"/fonts/code.ashx?code={0}&format={1}" + "&width=500&height=20&size=60", TurnoId, "0");
            //parameters[1] = new ReportParameter("ImgBono", RutaCodigo);
            //parameters[2] = new ReportParameter("TurnoId", TurnoId);

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