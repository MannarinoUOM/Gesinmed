using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;

public partial class Endoscopia_Paint : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string Endoscopia_id = Request.QueryString["Endoscopia_id"];

        string ruta_archivo = @"\\10.10.8.66\Files\Software\Aplicaciones\documentacion_new\ESTUDIOS\1_" + Endoscopia_id + ".bmp";
        string resumeFile =  Server.MapPath(@"~\Endoscopia\Paint\ESTUDIOS\1_" + Endoscopia_id + ".bmp");
        string Original = Server.MapPath(@"~\Endoscopia\Paint\Endoscopia\Dibujo.bmp"); //@"C:\Users\Santa\Documents\Proyectos\Hospital_Fede_Manu_Gera\Endoscopia\paint\Endoscopia";

        //string Limpiar = "var Limpiar = false;";

        if (Request.QueryString["B"] != null)
        {
            //Limpiar = "var Limpiar = true;";
            File.Copy(Original, ruta_archivo, true);
        }

        
        //if (File.Exists(resumeFile))
        if (File.Exists(ruta_archivo))
        {
            literal_script.Text = "<script> var Endoscopia_id = '" + Endoscopia_id + "'; imageObj.src = 'Estudios/1_" + Endoscopia_id + ".bmp?s="+DateTime.Now.Ticks+"';</script>";                        
        }
        else
        {
            literal_script.Text = "<script> var Endoscopia_id = '" + Endoscopia_id + "'; imageObj.src = 'Endoscopia/Dibujo.bmp';</script>";
        }

        
    }
}