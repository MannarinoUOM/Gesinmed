<%@ WebHandler Language="C#" Class="code" %>

using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Text;
using System.Linq;
using System.Web;

public class code : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
  var cd = context.Request.QueryString.Get("code");
            var fm = context.Request.QueryString.Get("format");
            var width = (!string.IsNullOrEmpty(context.Request.QueryString.Get("width")))
                            ? int.Parse(context.Request.QueryString.Get("width"))
                            : 200;
            var height = (!string.IsNullOrEmpty(context.Request.QueryString.Get("height")))
                             ? int.Parse(context.Request.QueryString.Get("height"))
                             : 60;
            var size = (!string.IsNullOrEmpty(context.Request.QueryString.Get("size")))
                           ? int.Parse(context.Request.QueryString.Get("size"))
                           : 60;

            if (!string.IsNullOrEmpty(cd))
            {
                using (new System.IO.MemoryStream())
                {
                    var bitmap = new Bitmap(width, height);
                    var grafic = Graphics.FromImage(bitmap);
                    var fuente = CargarFuente(fm, size);
                    var point = new Point();
                    var brush = new SolidBrush(Color.Black);

                    grafic.FillRectangle(new SolidBrush(Color.White), 0, 0, width, (float)height);
                    grafic.DrawString(FormatBarCode(cd), fuente, brush, point);
                    context.Response.ContentType = "image/jpeg";
                    bitmap.Save(context.Response.OutputStream, System.Drawing.Imaging.ImageFormat.Jpeg);
                }
            }
            else context.Response.Write("");
        }
        /// <summary>
        /// Formato con los caracteres de escape establecidos en la fuente que utilizamos.
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        private string FormatBarCode(string code)
        {
            return string.Format("*{0}*", code);
        }
        /// <summary>
        /// Generamos la nueva fuente para cargar en la imagen
        /// </summary>
        /// <param name="fuente"></param>i
        /// <param name="size"></param>
        /// <returns></returns>
        private Font CargarFuente(string fuente, int size)
        {
            var pfc = new PrivateFontCollection();
            var f = "FRE3OF9X.TTF";

            pfc.AddFontFile(System.Configuration.ConfigurationManager.AppSettings.Get("PATH_FONTS") + @"\" + f);
            //pfc.AddFontFile(f);
            return new Font(pfc.Families[0], (float)size);
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    

}