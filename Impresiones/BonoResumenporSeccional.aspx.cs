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

public partial class Impresion_BonoResumenporSeccional : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            Hospital.CentroBLL cc = new Hospital.CentroBLL();
            centro c = new centro();
            c = cc.elCentro();

            Hospital.SeccionalesBLL s = new Hospital.SeccionalesBLL();
            
            ReportParameter[] parameters = new ReportParameter[8];
            parameters[0] = new ReportParameter("Usuario", ((usuarios)Session["Usuario"]).nombre);
            parameters[1] = new ReportParameter("Imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
            parameters[2] = new ReportParameter("Fechas", Request.QueryString["Fi"].ToString() + " - " + Request.QueryString["Ff"].ToString());
            parameters[3] = new ReportParameter("CentroNombre", c.RazonSocial);
            parameters[4] = new ReportParameter("Direccion", c.Calle + " " + c.Nro + " (" + c.LOCNOMBRE + ")");
            parameters[5] = new ReportParameter("Telefono", "Telefono: " + c.Telefono);

            if (Request.QueryString["Sl"].ToString() == "0")
            {
                parameters[6] = new ReportParameter("Seccional", "CONSULTORIOS Y PRACTICAS DE TODAS LAS SECCIONALES");
            }
            else
            {
                parameters[6] = new ReportParameter("Seccional", " CONSULTORIOS Y PRACTICAS DE SECCIONAL " + s.SeccionalPorNro(Convert.ToInt32(Request.QueryString["Sl"].ToString())).Seccional.ToString().ToUpper());
            }
            
            parameters[7] = new ReportParameter("PC", " " + GetComputerName(Request.UserHostAddress) );
            
            
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
        HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=Turnos." + "PDF"));
        HttpContext.Current.Response.BinaryWrite(byteArray);
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();
    }
}