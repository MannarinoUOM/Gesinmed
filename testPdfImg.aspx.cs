using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using iTextSharp;
using iTextSharp.text;
using iTextSharp.text.pdf;
using System.IO;

public partial class testPdfImg : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

        //\\10.10.8.66\Files\DocParaFirmar

        //iTextSharp.text.Document doc = new iTextSharp.text.Document(PageSize.LETTER);
        //FileStream F = new FileStream("C:\\Users\\Desarrollo1\\Desktop\\PDF\\DbtAtencion.PDF", FileMode.Append,FileAccess.Write);

        
        //PdfWriter writer = PdfWriter.GetInstance(doc, F);

        
        //doc.OpenDocument();

        // Creamos la imagen y le ajustamos el tamaño
        //iTextSharp.text.Image imagen = iTextSharp.text.Image.GetInstance("C:\\Users\\Desarrollo1\\Pictures\\Saved Pictures\\cuphea.jpg");
        //imagen.BorderWidth = 0;
        //imagen.Alignment = Element.ALIGN_RIGHT;
        //float percentage = 0.0f;
        //percentage = 150 / imagen.Width;
        //imagen.ScalePercent(percentage * 100);

        // Insertamos la imagen en el documento
        //doc.Add(imagen);

         //iTextSharp.text.Image img = iTextSharp.text.Image.GetInstance(imagen);
         //img.ScaleAbsoluteWidth(100);
         //img.ScaleAbsoluteHeight(100);
         //writer.AddDirectImageSimple(img);
         //doc.Add(img);


     
        // Cerramos el documento
        //doc.Close();

        pegar();

        File.Copy("\\\\10.10.8.66\\Files\\DocParaFirmar\\Planilla de entrega de objeto de valor.docxCopia.pdf", "\\\\10.10.8.66\\Files\\DocParaFirmar\\Planilla de entrega de objeto de valor.docx.pdf", true);
        File.Delete("\\\\10.10.8.66\\Files\\DocParaFirmar\\Planilla de entrega de objeto de valor.docxCopia.pdf");
    }



    public static void AddTextToPdf(string inputPdfPath, string outputPdfPath, string textToAdd, System.Drawing.Point point)
    {
        //variables
        string pathin = inputPdfPath;
        string pathout = outputPdfPath;

        //create PdfReader object to read from the existing document
        using (PdfReader reader = new PdfReader(pathin))
        //create PdfStamper object to write to get the pages from reader 
        using (PdfStamper stamper = new PdfStamper(reader, new FileStream(pathout, FileMode.Create)))
        {
            //select two pages from the original document
            reader.SelectPages("1-2");

            //gettins the page size in order to substract from the iTextSharp coordinates
            var pageSize = reader.GetPageSize(1);

            // PdfContentByte from stamper to add content to the pages over the original content
            PdfContentByte pbover = stamper.GetOverContent(1);

            //add content to the page using ColumnText
            Font font = new Font();
            font.Size = 10;

            //setting up the X and Y coordinates of the document
            int x = point.X;
            int y = point.Y;

            y = (int)(pageSize.Height - y);

         
            ColumnText.ShowTextAligned(pbover, Element.ALIGN_CENTER, new Phrase(textToAdd, font), x, y, 0);

        }
    }


    public static MemoryStream pegar()
    {
        //cargamos nuestro pdf                       + fileName
        FileStream File = new FileStream("\\\\10.10.8.66\\Files\\DocParaFirmar\\Planilla de entrega de objeto de valor.docx.pdf", FileMode.Open, FileAccess.Read);
        //lo convertimos a bytes
        byte[] bytes = new byte[File.ReadByte()];
        //Lo cargamos al PdfReader
        File.Position = 0;
        PdfReader reader = new PdfReader(File);
        //en este caso podemos cargarlo en memoria solo para visualizarlo o podemos user de nuevo FileStream para guardarlo en el disco
        MemoryStream stream = new MemoryStream();
        //usamos PdfStamper que es el que permite modificar pdf
        using (PdfStamper stamper = new PdfStamper(reader, stream))
        {
            //Cargamos el archivo de imagen
            // FileStream imagen = new FileStream("C:\\Users\\Desarrollo1\\Pictures\\Saved Pictures\\cuphea.jpg", FileMode.Open);
            iTextSharp.text.Image imagen = iTextSharp.text.Image.GetInstance("\\\\10.10.8.66\\documentacion_new\\firmas\\1_zocco.jpg");
            //obtenemos el total de paginas, en este ejemplo agregaremos una imagen a cada página
            int pages = reader.NumberOfPages;
            //Cargamos la imagen
            iTextSharp.text.Image _imagen = iTextSharp.text.Image.GetInstance(imagen);
            //Definimos el tamaño a redimensionar la imagen si queremos cambiar tamaño
            Rectangle size = new Rectangle(65, 65);
            //Redimensionamos imagen
            _imagen.ScaleAbsolute(size);

            //Recorremos cada página
            for (int i = 1; i <= pages; i++)
            {
                //Obtenemos el contenido de la página                  
                var pdfContentByte = stamper.GetOverContent(i);
                //Definimos la posición donde colocaremos la imagen
                _imagen.SetAbsolutePosition(450, 10);
                //Agregamos la imagen
                pdfContentByte.AddImage(_imagen);
            }
        }
        //Convertimos el stream a un array para cargarlo nuevamente en memoria
        bytes = stream.ToArray();
        MemoryStream mspdf = new MemoryStream(bytes);

        using (FileStream file = new FileStream("\\\\10.10.8.66\\Files\\DocParaFirmar\\Planilla de entrega de objeto de valor.docx.pdf", FileMode.Create, System.IO.FileAccess.Write))
        {
            byte[] bytes2 = new byte[mspdf.Length];
            mspdf.Read(bytes, 0, (int)mspdf.Length);
            file.Write(bytes, 0, bytes.Length);
            mspdf.Close();
        }

        System.Drawing.Point P = new System.Drawing.Point();
        P.X = 500;
        P.Y = 770;
        AddTextToPdf("\\\\10.10.8.66\\Files\\DocParaFirmar\\Planilla de entrega de objeto de valor.docx.pdf", "\\\\10.10.8.66\\Files\\DocParaFirmar\\Planilla de entrega de objeto de valor.docxCopia.pdf", "modificacion", P);

        return mspdf;
    }
    }


