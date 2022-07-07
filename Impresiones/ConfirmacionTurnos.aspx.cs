using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using Microsoft.Reporting.WebForms;
using System.Web.Configuration;
using HospitalBLL.Entities;

public partial class Impresion_ConfirmacionTurnos : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            txtespecialidadId.Text  =  Request.QueryString["especialidadId"].ToString();
            txtmedicoId.Text = Request.QueryString["medicoId"].ToString();

            DateTime? desde = Convert.ToDateTime(Request.QueryString["desde"].ToString());
            DateTime? hasta = Convert.ToDateTime(Request.QueryString["hasta"].ToString());
            if (!desde.HasValue || !hasta.HasValue) return;

            txtdesde.Text = Request.QueryString["desde"].ToString();
            txthasta.Text = Request.QueryString["hasta"].ToString();
            Time horaDesde = null;
            Time horaHasta = null;

            if (Request.QueryString["horadesde"] != null)
            {
                if (Request.QueryString["horadesde"] == "")
                {
                    horaDesde = Convert.ToDateTime("00:00");
                }
                else
                {
                    horaDesde = Convert.ToDateTime(Request.QueryString["horadesde"].ToString());
                }
            }
            else
            {
                horaDesde = Convert.ToDateTime("00:00");
            }

            if (Request.QueryString["horahasta"] != null)
            {
                if (Request.QueryString["horahasta"] != "")
                {
                    horaHasta = Convert.ToDateTime(Request.QueryString["horahasta"].ToString());
                }
                else
                {
                    horaHasta = Convert.ToDateTime("23:59");
                }
            }
            else
            {
                horaHasta = Convert.ToDateTime("23:59");
            }


            int? horaDesdeMilitar = null;
            if (horaDesde != null)
            {
                horaDesdeMilitar = horaDesde.Hour * 100 + horaDesde.Minutes;
            }
            else
            {
                horaDesdeMilitar = 0;
            }

            int? horaHastaMilitar = null;
            if (horaHasta != null)
            {
                horaHastaMilitar = horaHasta.Hour * 100 + horaHasta.Minutes;
            }
            else
            {
                horaHastaMilitar = 2359;
            }


            txthoradesdemilitar.Text = horaDesdeMilitar.ToString();
            txthorahastamilitar.Text = horaHastaMilitar.ToString();
            

            if (Request.QueryString["Libres"] != null)
            {
                txtLibres.Text = Request.QueryString["Libres"].ToString();                
            }

            if (Request.QueryString["Tipo"] != null)
            {
                if (Request.QueryString["Tipo"].ToString() == "0")
                {
                    txtTitulo.Text = "Cancelación Turnos";
                }
                else { txtTitulo.Text = "Confirmación de Turnos"; }
            }

        }

        if (IsPostBack)
        {
            
        }
        else
        {
            ReportParameter[] parameters = new ReportParameter[2];
            parameters[0] = new ReportParameter("Usuario", "" + ((usuarios)Session["Usuario"]).nombre);
            parameters[1] = new ReportParameter("Imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
            ReportViewer1.LocalReport.EnableExternalImages = true;
            ReportViewer1.LocalReport.SetParameters(parameters);
            ReportViewer1.LocalReport.Refresh();
        }
    }
    public void PDF()
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
        HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=Turnos." + "PDF"));
        HttpContext.Current.Response.BinaryWrite(byteArray);
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();
    }

}