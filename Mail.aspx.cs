using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net.Mail;
using System.Net;
using iTextSharp.text;
using iTextSharp.text.html.simpleparser;
using iTextSharp.text.pdf;
using System.Configuration;
using System.IO;
using System.Text;
using System.Threading;


public partial class Mail : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        // esperar a que se cargue el gif y luego enviar email
        //Thread.Sleep(2000);

    }


    public void enviarEmail() {
        try
        {
            ImagenesDALTableAdapters.QueriesTableAdapter adapter = new ImagenesDALTableAdapters.QueriesTableAdapter();
            string destino = Convert.ToString(adapter.H2_Traer_Email_x_Turno(Convert.ToInt64(Request.QueryString["id"])));
            StringBuilder sb = new StringBuilder();
            sb.Append(Convert.ToString(adapter.H2_Traer_Informe_Img_Para_Email(Convert.ToInt64(Request.QueryString["id2"]))));//352859

            StringReader sr = new StringReader(sb.ToString());
            byte[] bytes;

            Document pdfDoc = new Document(PageSize.A4, 10f, 10f, 10f, 0f);
            HTMLWorker htmlparser = new HTMLWorker(pdfDoc);
            using (MemoryStream memoryStream = new MemoryStream())
            {
                PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
                pdfDoc.Open();

                htmlparser.Parse(sr);
                pdfDoc.Close();

                bytes = memoryStream.ToArray();
                memoryStream.Close();

                File.WriteAllBytes("\\\\10.10.8.66\\Files\\EmailInformeImagenes" + "\\Informe.pdf", bytes);
            }

            if (destino.Length == 0) { destino = "informespoliclinicocentral@gmail.com"; }

            string body = "<html><body><h1>Se adjunta informe de referencia</h1></body><footer>firmado por Equipo Imágenes Policlínico Central. Tel 011-4014-6914</footer></html>";
            //string adjunto = "C:\\Users\\Desarrollo1\\Desktop\\manuel.PDF";
            //587  465
            SmtpClient smtp = new SmtpClient();

            smtp.Host = "smtp.gmail.com";
            smtp.Port = 587;                                                               //uomimagenes
            smtp.Credentials = new NetworkCredential("imagenespoliclinicocentral@gmail.com", "uomra3352");


            smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
            smtp.EnableSsl = true;
            // smtp.UseDefaultCredentials = false;


            MailMessage mail = new MailMessage();
            mail.From = new MailAddress("imagenespoliclinicocentral@gmail.com", "Imágenes Policlínico Central");
            mail.To.Add(new MailAddress(destino));
            //mail.To.Add(new MailAddress("mdeliens82@gmail.com"));
            mail.Subject = "Su informe del Area de Imágenes Policlínico Central";
            mail.IsBodyHtml = true;
            mail.Body = body;
            mail.Attachments.Add(new Attachment("\\\\10.10.8.66\\Files\\EmailInformeImagenes\\Informe.pdf"));
            smtp.Send(mail);

            Response.Write("<script>");
            Response.Write(" parent.alert('E-mail enviado'); window.close();");
            //Response.Write(" parent.alert('E-mail enviado');");
            Response.Write("</script>");

            //else
            //{
            //    // enviar a este correo: informespoliclinicocentral@gmail.com
            //    Response.Write("<script>");
            //    Response.Write(" alert('Este paciente no tiene E-mail cargado'); window.close();");
            //    //Response.Write(" alert('Este paciente no tiene E-mail cargado');");
            //    Response.Write("</script>");
            //}
        }
        catch
        {
            Response.Write("<script>");
            Response.Write(" alert('No se pudo enviar el E-Mail!'); window.close();");
            //Response.Write(" alert('No se pudo enviar el E-Mail!'); ");
            Response.Write("</script>");
        }
    
    }

    protected void Button1_Click(object sender, EventArgs e)
    {
        enviarEmail();
    }
}

    
