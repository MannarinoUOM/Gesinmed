﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;
using System.Web.Configuration;


public partial class Impresiones_ranking_SN : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Session.Timeout = 10;
        //Server.ScriptTimeout = 10;
        if (!IsPostBack)
        {
            Hospital.CentroBLL Centro = new Hospital.CentroBLL();
            centro C = Centro.elCentro();

            ReportParameter[] parameters = new ReportParameter[13];
            parameters[0] = new ReportParameter("imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
            parameters[1] = new ReportParameter("Usuario", "Impreso Por: " + ((usuarios)Session["Usuario"]).nombre + ". Fecha: " + DateTime.Now.ToString("dd/MM/yyyy HH:mm"));
            parameters[2] = new ReportParameter("desde", Request.QueryString["desde"]);
            parameters[3] = new ReportParameter("hasta", Request.QueryString["hasta"]);
            parameters[4] = new ReportParameter("os", Request.QueryString["os"]);
            parameters[5] = new ReportParameter("cantidad", Request.QueryString["cantidad"]);
            parameters[6] = new ReportParameter("ordena", Request.QueryString["ordena"]);
            parameters[7] = new ReportParameter("orden", Request.QueryString["orden"]);
            parameters[8] = new ReportParameter("incluirOS", Request.QueryString["incluirOS"]);
            parameters[9] = new ReportParameter("obrasSociales", Request.QueryString["obrasSociales"]);
            parameters[10] = new ReportParameter("incluirPractica", Request.QueryString["incluirPractica"]);
            parameters[11] = new ReportParameter("practicas", Request.QueryString["practicas"]);
            parameters[12] = new ReportParameter("PDF", Request.QueryString["PDF"]);

            //ReportViewer1.ServerReport.Timeout = 900000;
            ReportViewer1.LocalReport.EnableExternalImages = true;
            ReportViewer1.LocalReport.SetParameters(parameters);
            ReportViewer1.LocalReport.Refresh();
        }
    }


    public void pdf()
    {
        //ReportViewer1.LocalReport.ReportPath = "Impresion/ConfirmacionTurnos.rdlc";

        Warning[] warnings;
        string[] streamids;
        string mimeType;
        string encoding;
        string extension;
        //Session.Timeout = 10;
        byte[] byteArray = ReportViewer1.LocalReport.Render("PDF", null, out mimeType, out encoding, out extension, out streamids, out warnings);


        HttpContext.Current.Response.Buffer = true;
        HttpContext.Current.Response.Clear();
        HttpContext.Current.Response.ContentType = mimeType;
        HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=GuardiaAtencion." + "PDF"));
        HttpContext.Current.Response.BinaryWrite(byteArray);
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();

    }

}