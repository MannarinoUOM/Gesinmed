using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Drawing;


public partial class testCam : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    private bool Archivo_Guardar_Reclamo_Afiliaciones(HttpPostedFile Archivo_Actual, string Ruta, string IdReclamo)
    {
        try
        {
            if (Archivo_Actual.ContentLength > 0)
            {

                Archivo_Actual.SaveAs(Ruta + "/" + "_" + System.IO.Path.GetFileName(Archivo_Actual.FileName));

                //Ruta = Ruta + "adjunto_" + ReclamoId.Value;
                //Archivo_Actual.SaveAs(Ruta + "/" + reclamorIdAfiliaciones.Value + "_" + System.IO.Path.GetFileName(Archivo_Actual.FileName));
                //Archivo_Guardar_en_Base_Reclamo_Afiliaciones(reclamorIdAfiliaciones.Value + "_" + System.IO.Path.GetFileName(Archivo_Actual.FileName), reclamorIdAfiliaciones.Value);

                Response.Write("<script>");
                //Response.Write("alert('../Impresiones/reclamos/reclamoImpresion.aspx?id=" + ReclamoId.Value + "&estado=" + 0 + "');");
                Response.Write("window.open('../Impresiones/reclamosAfiliaciones/reclamoAfiliacionImpresion.aspx?id=" + "" + "&estado=" + 0 + "' ,'_blank');");
                Response.Write("</script>");
                return true;
            }
            else return false;
        }
        catch (Exception ex)
        {
            throw new Exception("No se pudo guardar el archivo " + System.IO.Path.GetFileName(Archivo_Actual.FileName));
        }
    }


}