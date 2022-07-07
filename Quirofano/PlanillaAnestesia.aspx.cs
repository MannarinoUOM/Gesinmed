using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Drawing;
using System.IO;

public partial class Quirofano_PlanillaAnestesia : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //string strImage = "hola mundo";
        //CreateImageFromString(strImage);
        //convertirTextoImagen("Esto es una prueba");
        //metodo();
    }


    public void metodo()
    {

        //creando el objeto de la imagen
        System.Drawing.Image bitmap = (System.Drawing.Image)Bitmap.FromFile(Server.MapPath("prueba.jpg")); // set image 
        //Dibujo la imagen
        Graphics graphicsImage = Graphics.FromImage(bitmap);

        //Establezco la orientación mediante coordenadas  
        StringFormat stringformat = new StringFormat();
        stringformat.Alignment = StringAlignment.Far;
        stringformat.LineAlignment = StringAlignment.Far;

        StringFormat stringformat2 = new StringFormat();
        stringformat2.Alignment = StringAlignment.Center;
        stringformat2.LineAlignment = StringAlignment.Center;

        //Propiedades de la fuente  
        Color StringColor = System.Drawing.ColorTranslator.FromHtml("#933eea");//le damos color
        Color StringColor2 = System.Drawing.ColorTranslator.FromHtml("#e80c88");//le damos color
        string Str_TextOnImage = "chau";//Your Text On Image
        string Str_TextOnImage2 = "pepe";//Your Text On Image

        graphicsImage.DrawString(Str_TextOnImage, new Font("arial", 40,
        FontStyle.Regular), new SolidBrush(StringColor), new Point(100, 100),
        stringformat); Response.ContentType = "image/jpg";

        graphicsImage.DrawString(Str_TextOnImage2, new Font("Edwardian Script ITC", 111,
        FontStyle.Bold), new SolidBrush(StringColor2), new Point(145, 255),
        stringformat2); Response.ContentType = "image/jpeg";

        bitmap.Save(Server.MapPath("prueba.jpeg"), System.Drawing.Imaging.ImageFormat.Jpeg);

    }

//string text = strImage;
////create new image
//Bitmap bitmap = new Bitmap(1, 1);
////Properties string to draw
//Font font = new Font("Arial", 25, FontStyle.Regular, GraphicsUnit.Pixel);
//Graphics graphics = Graphics.FromImage(bitmap);
////properties new image
//int width = (int)graphics.MeasureString(text, font).Width;
//int height = (int)graphics.MeasureString(text, font).Height;
//bitmap = new Bitmap(bitmap, new Size(width, height));
////add text to image
//graphics = Graphics.FromImage(bitmap);
//graphics.Clear(Color.White);
////graphics.SmoothingMode = SmoothingMode.AntiAlias;
////graphics.TextRenderingHint = TextRenderingHint.AntiAlias;
//graphics.DrawString(text, font, new SolidBrush(Color.Coral), 0, 0);
////execute pending graphics
//graphics.Flush();
////release resources used by graphics
//graphics.Dispose();
////save the image

//if (System.IO.File.Exists("C:\\"))
//{
//    bitmap.Save("C:\\prueba.png", System.Drawing.Imaging.ImageFormat.Png);
//}
////using (MemoryStream stream = new MemoryStream())
////{
    
////    stream.WriteTo(Context.Response.OutputStream);

    
////}


////do something with image

}