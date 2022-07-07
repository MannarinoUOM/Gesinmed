<%@ WebHandler Language="C#" Class="SubirFirma" %>

using System;
using System.Web;

public class SubirFirma : IHttpHandler {

    public void ProcessRequest(HttpContext context)
    {
        if (context.Request.Files.Count > 0)
        {
            string MedId = context.Request.QueryString["Med"].ToString();
            HttpFileCollection files = context.Request.Files;
            for (int i = 0; i < files.Count; i++)
            {
                HttpPostedFile file = files[i];
                //string fname = context.Server.MapPath("~/img/Firmas_IMG/" + file.FileName);
                string fname = context.Server.MapPath("~/img/Firmas_IMG/" + MedId + ".png");
                file.SaveAs(fname);
            }
            context.Response.ContentType = "text/plain";
            context.Response.Write("¡Firma Subida!");
        }

    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }    

}