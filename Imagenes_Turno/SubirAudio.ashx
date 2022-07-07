<%@ WebHandler Language="C#" Class="SubirAudio" %>

using System;
using System.Web;

public class SubirAudio : IHttpHandler
{
    public void ProcessRequest(HttpContext context)
    {
        if (context.Request.Files.Count > 0)
        {
            string TurnoId = context.Request.QueryString["TurnoId"].ToString();
            string DetalleID = context.Request.QueryString["DetalleID"].ToString();
            HttpFileCollection files = context.Request.Files;
            for (int i = 0; i < files.Count; i++)
            {
                try { 
                
                HttpPostedFile file = files[i];

                string Mes = DateTime.Now.Month.ToString().PadLeft(2,'0');
                string Año = DateTime.Now.Year.ToString();

                if (!System.IO.Directory.Exists(@"C:\Imagenes_Audio\" + Año + "_" + Mes))
                {
                    System.IO.Directory.CreateDirectory(@"C:\Imagenes_Audio\" + Año + "_" + Mes);
                }

                string fname = @"C:\Imagenes_Audio\" + Año + "_" + Mes + @"\AUDIO_" + TurnoId + "_" + DetalleID + "_" + DateTime.Now.ToString("yyyyMMddhhmmss") + ".wav";
                file.SaveAs(fname);

                Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
                img.IMG_AUDIO_INSERTAR(long.Parse(TurnoId), long.Parse(DetalleID), fname );
                    
                }                
                catch(Exception ex){
                    throw new Exception(ex.Message);
                }
                
            }
            context.Response.ContentType = "text/plain";
            context.Response.Write("!Audio Subido!");
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