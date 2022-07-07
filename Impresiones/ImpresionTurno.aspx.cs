using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using Microsoft.Reporting.WebForms;
using System.Web.Configuration;
using System.Net;



public partial class Impresiones_ImpresionTurno : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            DateTime Fecha = Convert.ToDateTime(null);
            if (string.IsNullOrEmpty((Request.QueryString["Hora"])))
            {
                Fecha = DateTime.TryParse((Request.QueryString["Fecha"].ToString()), out Fecha) ? Fecha : Convert.ToDateTime("01/01/1990 00:00");
            }
            else
            {
                Fecha = DateTime.TryParse((Request.QueryString["Fecha"].ToString()) + " " + (Request.QueryString["Hora"].ToString()), out Fecha) ? Fecha : Convert.ToDateTime("01/01/1990 00:00");
            }

            txtFecha.Text = Fecha.ToString("dd/MM/yyyy HH:mm");


            string codigo = Request.QueryString["Ids"].ToString().Split(',')[1].Trim().PadLeft(10, '0');
            string TurnoId = "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + string.Format(@"/fonts/code.ashx?code={0}&format={1}" + "&width=400&height=30&size=55", codigo, "0");

            ReportParameter[] parameters = new ReportParameter[5];
            parameters[0] = new ReportParameter("Logo", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
            parameters[1] = new ReportParameter("PiePagina2", "Si por cualquier motivo no puede venir, avisar 48hs. antes; de lo contrario, perderá el valor del bono.");
            parameters[2] = new ReportParameter("PiePagina4", "<b>Si algún dato personal no coincide, por favor dirijase a ventanilla.</b>");
            parameters[3] = new ReportParameter("TurnoId", TurnoId);
            parameters[4] = new ReportParameter("CodTurnoId", codigo);
            //parameters[3] = new ReportParameter("PC", GetComputerName(Request.UserHostAddress));

            ReportViewer1.LocalReport.EnableExternalImages = true;
            ReportViewer1.LocalReport.SetParameters(parameters);
            ReportViewer1.LocalReport.Refresh();
        }
    }

    public string GetComputerName(string clientIP)
    {
        try
        {
            var hostEntry = Dns.GetHostEntry(clientIP);
            return hostEntry.HostName;
        }
        catch 
        {
            return string.Empty;
        }
    }

    public void PDF()
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