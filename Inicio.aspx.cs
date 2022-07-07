using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Hospital;

public partial class Inicio : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (Session["Usuario"] != null)
            {
                CentroBLL cbll = new CentroBLL();
                centro c = cbll.elCentro();
                usuarios u = new usuarios();
                u = ((usuarios)Session["Usuario"]);
                lblSeccional.Text = c.RazonSocial.ToUpper();
                LiteralUsuario.Text = u.usuario;
                LiteralUsuario2.Text = u.usuario;
                AtInternadosBLL at = new AtInternadosBLL();
                cantidad.Value = at.Interconsultas_Pendientes_by_Usuario(((usuarios)Session["Usuario"]).id).ToString();


                InicioBLL i = new InicioBLL();
                List<version> list = i.ListVersiones();
                if (list.Count > 0) Version.InnerHtml = "<strong>GesInMed</strong> Versión " + list[0].Version + " - " + list[0].Fecha;

                string Nro_Box = "-1";
                if (((usuarios)Session["Usuario"]).Box_Turno_Bono != null)
                {
                    Nro_Box = ((usuarios)Session["Usuario"]).Box_Turno_Bono;
                }

                lit_java_script.Text = "<script>$('#span_nro_box').html('" + Nro_Box + "'); Nro_Box = " + Nro_Box + " ;</script>";

            }
            else
            {
                Response.Redirect("Login.aspx");
            }
        }



    }
}
