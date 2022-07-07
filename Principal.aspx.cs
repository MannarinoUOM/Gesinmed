using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Hospital;

public partial class Principal : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {

            if (Session["Usuario"] == null)
            {
                Response.Redirect("Login.aspx");
            }

            string ElDia = "Buenas Noches";
            CentroBLL cbll = new CentroBLL();
            centro c = cbll.elCentro();
            LSeccional.Text = "GESTIÓN INTEGRAL MÉDICA - " + c.RazonSocial.ToUpper();
            //LSeccional.Text = "GESTIÓN INTEGRAL MÉDICA - " + "Pepito";
            //LSeccional.Text = "GESTIÓN INTEGRAL MÉDICA - SECCIONAL " + ((usuarios)Session["Usuario"]).seccional.ToUpper();
            if (DateTime.Now.Hour >= 6 && DateTime.Now.Hour <= 12) { ElDia = "Buenos días"; }
            if (DateTime.Now.Hour >= 13 && DateTime.Now.Hour <= 18) { ElDia = "Buenas tardes"; }
            LUsuario.Text = ElDia + "<p style='margin-top:20px; margin-left:Auto; margin-right:Auto; padding-bottom: 20px; width:70%; text-aling:center;line-height:100%' class='bNombre'> " + ((usuarios)Session["Usuario"]).nombre + "</p>";

            lscript.Text = "<script>var Nombre_Usuario = '" + ((usuarios)Session["Usuario"]).nombre + "';</script>";

            InicioBLL i = new InicioBLL();
            List<version> list = i.ListVersiones();
            foreach (version v in list)
            {
                LNovedades.Text += "<div class='FechaNovedad' style='width:60%; margin:auto'>" + "Version " + v.Version + " - " + v.Fecha +"</div>";
                InicioBLL com_bll = new InicioBLL();
                List<version> comentarios = com_bll.ListComentarios_Fecha(DateTime.Parse(v.Fecha));
                string contenido = "<div style='width:60%; text-aling:center; margin:auto'>";
                foreach (version com_v in comentarios)
                {
                    contenido += com_v.Comentario + "<br>";
                }
                contenido += "</div>";
                LNovedades.Text += contenido;
            }
        }
    }
}