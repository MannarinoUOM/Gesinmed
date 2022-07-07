using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Fotos_Captura : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            ViewState["CUIL"] = Request.QueryString["CUIL"];
            LblCuil.Text = "CUIL: " + ViewState["CUIL"].ToString();
        }
    }

    public void CUIL()
    {
        Response.Write(ViewState["CUIL"].ToString());
    }
}