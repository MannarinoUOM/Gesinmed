using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;


using System.Net.NetworkInformation;
using System.Net.Mail;
using System.Net;
using System.Data.SqlClient;
using System.Data;



public partial class Imagenes_Turno_Informe_Practica_Cargar : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {        
        //************** Determinar la Ip de acuerdo a la URL **********************
        string DireccionIPLocal, direcionIPRemota, puerto;
        string IP4Address = String.Empty;

        direcionIPRemota = System.Configuration.ConfigurationManager.AppSettings["direcionIPRemota"]; // Esto viene del web.config 
        DireccionIPLocal = System.Configuration.ConfigurationManager.AppSettings["direcionIPLocal"];  // Esto viene del web.config 
        puerto = System.Configuration.ConfigurationManager.AppSettings["puerto"];  // Esto viene del web.config 
        
        IP4Address = HttpContext.Current.Request.Url.Host;
        ipConfiguracion.Value = IP4Address;

        if (IP4Address == DireccionIPLocal)
        {
            ipConfiguracion.Value = DireccionIPLocal;
        }
        if (IP4Address == direcionIPRemota)
        {
            ipConfiguracion.Value = direcionIPRemota + puerto; 
        }
        

        Hospital.VerificadorBLL v = new Hospital.VerificadorBLL(); if (!v.Permiso("115")) { Response.Redirect("Login.aspx"); }
        else
        {
            string fecharestada = DateTime.Now.AddMonths(-2).ToShortDateString();
            scriptliteral.Text = "<script> $('#txt_fecha_desde').val('" + fecharestada + "'); $('#txt_fecha_hasta').val('" + DateTime.Now.ToShortDateString() + "');</script>";
        }
    }


    //protected void Button1_Click(object sender, EventArgs e)
    //{
    //    //if (!IsPostBack)
    //    //{
    //        try
    //        {
    //            ImagenesDALTableAdapters.QueriesTableAdapter adapter = new ImagenesDALTableAdapters.QueriesTableAdapter();
    //            string destino = Convert.ToString(adapter.H2_Traer_Email_x_Turno(Convert.ToInt64(txtTurno.Text)));

    //            if (destino.Length > 0)
    //            {
    //                string body = "<body><h1>INforme Listo</h1></body>";
    //                //string adjunto = "C:\\Users\\Desarrollo1\\Desktop\\manuel.PDF";
    //                //587  465
    //                SmtpClient smtp = new SmtpClient();

    //                smtp.Host = "smtp.gmail.com";
    //                smtp.Port = 587;                                                               //uomimagenes
    //                smtp.Credentials = new NetworkCredential("imagenespoliclinicocentral@gmail.com", "uomra3352");


    //                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
    //                smtp.EnableSsl = true;
    //                // smtp.UseDefaultCredentials = false;


    //                MailMessage mail = new MailMessage();
    //                mail.From = new MailAddress("imagenespoliclinicocentral@gmail.com", "Informe listo");
    //                mail.To.Add(new MailAddress(destino));
    //                mail.Subject = "Informe listo";
    //                mail.IsBodyHtml = true;
    //                mail.Body = body;
    //                //mail.Attachments.Add(new Attachment(adjunto));
    //                smtp.Send(mail);
    //            }
    //            else
    //            {
    //                Response.Write("<script>");
    //                Response.Write(" alert('este paciente no tiene mail cargado');");
    //                Response.Write("</script>");
    //            }
    //        }
    //        catch
    //        {
    //            Response.Write("<script>");
    //            Response.Write(" alert('No se pudo enviar el E-Mail!');");
    //            Response.Write("</script>");
    //        }
    // //   }
    //}
}

   