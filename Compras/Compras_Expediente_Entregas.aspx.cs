using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Configuration;

public partial class Compras_Compras_Expediente_Entregas : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
  
        // para bloquear controles a el usuario de farmacia externa
        usuarios u = (usuarios)HttpContext.Current.Session["Usuario"];
        string[] array = ConfigurationManager.AppSettings.Get("usuariosFE").Split(',');
        if (array.Contains(u.id.ToString()))
        {
                editar.Value = "0";
                btnPedidosVolver.Disabled = true;
        }
    }
}