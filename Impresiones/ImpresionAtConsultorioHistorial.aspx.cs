using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;

public partial class Impresiones_ImpresionAtConsultorioHistorial : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {

            if (Request.QueryString["F1"] != null)
            {
                txtFecha1.Text = Request.QueryString["F1"].ToString();
            }

            if (Request.QueryString["F2"] != null)
            {
                txtFecha2.Text = Request.QueryString["F2"].ToString();
            }


            if (Request.QueryString["M"] != null)
            {
                txtMedicoId.Text = Request.QueryString["M"].ToString();
            }

            if (Request.QueryString["H"] != null)
            {
                txtNHC.Text = Request.QueryString["H"].ToString();
            }




            ReportParameter[] parameters = new ReportParameter[5];
            //Establecemos el valor de los parámetros

            parameters[0] = new ReportParameter("RangoFecha", "" + txtFecha1.Text + " - " + txtFecha2.Text);
            if (txtNHC.Text == "-" || txtNHC.Text == "")
            {
                parameters[1] = new ReportParameter("NHC", "Todos");
            }
            else
            {
                parameters[1] = new ReportParameter("NHC", "" + txtNHC.Text);
            }

            string Medico = "";
            if (txtMedicoId.Text != "0")
            {
                medicos_Buscar_Info mm = new medicos_Buscar_Info();
                Hospital.MedicosBLL m = new Hospital.MedicosBLL();
                mm = m.Medicos_Buscar_Info(Convert.ToInt32(txtMedicoId.Text));
                Medico = mm.Medico;
            }
            else
            {
                Medico = "Todos";
            }

            parameters[2] = new ReportParameter("Medico", "" + Medico);

            parameters[3] = new ReportParameter("Usuario", ((usuarios)Session["Usuario"]).nombre);

            parameters[4] = new ReportParameter("Imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");

            //parameters[1] = new ReportParameter("par1", "value_par1");

            //Pasamos el array de los parámetros al ReportViewer
            ReportViewer1.LocalReport.EnableExternalImages = true;
            ReportViewer1.LocalReport.SetParameters(parameters);
            FuenteHistorialGuardia.DataBind();
            ReportViewer1.LocalReport.Refresh();
        }
    }


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
        HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=HistorialLLamado." + "PDF"));
        HttpContext.Current.Response.BinaryWrite(byteArray);
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();
    }

}