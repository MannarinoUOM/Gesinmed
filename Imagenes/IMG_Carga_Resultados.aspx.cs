using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Imagenes_IMG_Carga_Resultados : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {        
        Literal_Usuario.Text = "<input type='hidden' id='U' value='"+((usuarios)Session["Usuario"]).id.ToString()+"'/>";
    }
}