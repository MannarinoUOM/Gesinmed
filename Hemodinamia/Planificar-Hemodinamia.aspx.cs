using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;

public partial class Quirofano_Planificar_Hemodinamia : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Hospital.VerificadorBLL v = new Hospital.VerificadorBLL(); if (!v.Permiso("101")) { Response.Redirect("Login.aspx"); }
        #region
        // string[] files = Directory.GetFiles(Server.MapPath("../Consentimientos Hemodinamia PDFS/"), "*.pdf");
        //foreach (var file in files)
        //{
        //    ListItem i;
        //    i = new ListItem(file, "1");
        //    cboConsentimientos.Items.Add(i);
        //}
        #endregion

        DirectoryInfo DI = new DirectoryInfo(Server.MapPath("../Consentimientos Hemodinamia PDFS/"));

        FileInfo[] files = DI.GetFiles("*.pdf");
        int index = 1;
        ListItem a = new ListItem("Seleccione Consentimiento", "0");
        cboConsentimientos.Items.Add(a);
        foreach (FileInfo file in files)
        {
            ListItem i = new ListItem(file.Name, index.ToString());
            cboConsentimientos.Items.Add(i);
            index ++;
        }


    }
}