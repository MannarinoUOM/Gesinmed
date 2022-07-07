using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;

public partial class Fotos_Foto : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request.ContentType.Equals("image/jpeg"))
        {
            string CUIL = Request.QueryString["CUIL"];
            //string CUIL = Request.QueryString["CUIL"] + "_" + String.Format("{0:MMddyyyyHHmmss}", DateTime.Now);  
            string strFile = "";
            byte[] buffer = new byte[1024];
            //string photofolder = "../img/pacientes/";
            string photofolder = "../img/pacientes/Local/";
            strFile = photofolder + CUIL;

            int c;
            if ((c = Request.InputStream.Read(buffer, 0, buffer.Length)) > 0)
            {

                FileStream log = new FileStream(Server.MapPath(strFile), FileMode.OpenOrCreate);
                log.Write(buffer, 0, c);

                while ((c = Request.InputStream.Read(buffer, 0, buffer.Length)) > 0)
                {
                    log.Write(buffer, 0, c);
                }
                log.Close();

                string[] parts = { Request.ApplicationPath };
                parts = Request.Url.AbsoluteUri.Split(parts, StringSplitOptions.RemoveEmptyEntries);

                Response.Write(Request.Url.GetLeftPart(UriPartial.Authority) + Request.ApplicationPath.Replace(" ", "%20") + strFile.Replace("..", ""));                                
                Response.End();                
            }

        }
    }
}