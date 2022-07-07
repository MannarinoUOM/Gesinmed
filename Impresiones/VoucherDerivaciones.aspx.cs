using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;


public partial class Impresiones_VoucherDerivaciones : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {

            AutorizacionesDALTableAdapters.sp_voucherDatosPorNCTableAdapter adapter = new AutorizacionesDALTableAdapters.sp_voucherDatosPorNCTableAdapter();
            AutorizacionesDAL.sp_voucherDatosPorNCDataTable tabla = new AutorizacionesDAL.sp_voucherDatosPorNCDataTable();

            int valor = Convert.ToInt32(Request.QueryString["ID"]);

            ReportParameter[] parameters = new ReportParameter[3];

            parameters[0] = new ReportParameter("Usuario", ((usuarios)Session["Usuario"]).usuario);
            parameters[1] = new ReportParameter("Imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
            parameters[2] = new ReportParameter("imagenFirma", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/firmaImagen/");

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


        string deviceinf = "<DeviceInfo><PageHeight>29,7cm</PageHeight><PageWidth>21cm</PageWidth></DeviceInfo>";//va donde dice null en el byteArray

        byte[] byteArray = ReportViewer1.LocalReport.Render("PDF", deviceinf, out mimeType, out encoding, out extension, out streamids, out warnings);
        HttpContext.Current.Response.Buffer = true;
        HttpContext.Current.Response.Clear();
        HttpContext.Current.Response.ContentType = mimeType;
        HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=CaratulaHC." + "PDF"));
        HttpContext.Current.Response.BinaryWrite(byteArray);
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();
        
    }
}





    