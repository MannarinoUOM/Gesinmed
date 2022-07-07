using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;

public partial class Impresiones_Impresiones_IMG_IMG_Etiqueta : System.Web.UI.Page
{
    private string TurnoId;
    protected void Page_Load(object sender, EventArgs e)
    {
        TurnoId = Request.QueryString["TurnoId"].PadLeft(10, '0');
         if (!IsPostBack)
         {            

             ReportParameter[] parameters = new ReportParameter[6];
             
             ImagenesDALTableAdapters.H2_IMG_ETIQUETA_IMPRESIONTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_ETIQUETA_IMPRESIONTableAdapter();
             ImagenesDAL.H2_IMG_ETIQUETA_IMPRESIONDataTable aTable = adapter.GetData(long.Parse(TurnoId));
            
             if (aTable.Count == 1){
                ImagenesDAL.H2_IMG_ETIQUETA_IMPRESIONRow row = aTable[0];
                parameters[0] = new ReportParameter("Paciente", row.Paciente);
                parameters[1] = new ReportParameter("DNI", row.DNI.ToString());
                parameters[2] = new ReportParameter("Fecha", row.FECHA.Substring(8, 2) + "/" + row.FECHA.Substring(5, 2) + "/" + row.FECHA.Substring(0, 4) + "  " + row.FECHA.Substring(11, 5));
                
                 string Practicas = "";
                if (!row.IsPracticaNull()) Practicas = row.Practica;
                parameters[3] = new ReportParameter("Practicas", Practicas);                
             }

             //SERVIDOR PHP
            string IMGCodigoBarra = "http://10.10.8.72:85/Imagenes128/html/image_128.php?code=code128&o=1&t=20&r=2&text=" + TurnoId + "&f1=0&f2=8&a1=&a2=C&a3=";

            // string IMGCodigoBarra = "http://10.10.8.71:85/Imagenes128/example/html/BCGcode128.php?code=code128&o=1&t=20&r=2&text=" + TurnoId + "&f1=0&f2=8&a1=&a2=C&a3=";

             parameters[4] = new ReportParameter("CodigoBarra", TurnoId);
             parameters[5] = new ReportParameter("IMGCodigoBarra", IMGCodigoBarra);
             
             

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
        HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=" + TurnoId + ".PDF"));
        HttpContext.Current.Response.BinaryWrite(byteArray);
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();
    }
}