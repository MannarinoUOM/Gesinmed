using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Impresiones_Impresiones_IMG_Informe_html_rapido : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string MI_SobreFirma = "";
        string MI_Firma = "";
        string MV_SobreFirma = "";
        string MV_Firma = "";

            int TurnoId = int.Parse(Request.QueryString["TurnoId"]);
        

        Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
        IMG_PROTOCOLO_FIRMA unaFirma = img.IMG_FIRMA_PROTOCOLORAPIDO(long.Parse(Request.QueryString["TurnoId"]));

        //MI_SobreFirma = unaFirma.MI_SOBREFIRMA;
        //if (unaFirma.MI_MEDICOID == "") { unaFirma.MI_MEDICOID = "0"; }
        //MI_Firma = "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/Firmas_IMG/" + unaFirma.MI_MEDICOID + ".png";               

        MI_SobreFirma = unaFirma.MI_SOBREFIRMA;
        if (unaFirma.MI_MEDICOID == "") { unaFirma.MI_MEDICOID = "0"; }
        MI_Firma = "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/Firmas_IMG/" + unaFirma.MI_MEDICOID + ".png";


        if (unaFirma.MI_MEDICOID != unaFirma.MV_MEDICOID && unaFirma.MV_MEDICOID != "")
        {
            MV_SobreFirma = unaFirma.MV_SOBREFIRMA;
            if (unaFirma.MV_MEDICOID == "") { unaFirma.MV_MEDICOID = "0"; }
            MV_Firma = "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/Firmas_IMG/" + unaFirma.MV_MEDICOID + ".png";
        }


        if (unaFirma.MI_MEDICOID == "0" && unaFirma.MV_MEDICOID != "" && unaFirma.MV_MEDICOID != "0")
        {
            MI_SobreFirma = MV_SobreFirma;
            MI_Firma = MV_Firma;

            MV_SobreFirma = "";
            MV_Firma = "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/Firmas_IMG/0.png";
        }

        
        lit_firma1.Text = MI_Firma;
        if (unaFirma.MV_MEDICOID == null)
        {
            lit_firma2.Text = "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/Firmas_IMG/0.png";
        }
        else
        {
            lit_firma2.Text = MV_Firma;
        }
        
         
        lit_sobrefirma1.Text = MI_SobreFirma;
        lit_sobrefirma2.Text = MV_SobreFirma;

        ImagenesDALTableAdapters.H2_IMG_IMPRESION_INFORMERAPIDO_CABECERATableAdapter adapter_cabecera = new ImagenesDALTableAdapters.H2_IMG_IMPRESION_INFORMERAPIDO_CABECERATableAdapter();
        ImagenesDAL.H2_IMG_IMPRESION_INFORMERAPIDO_CABECERADataTable aTable_cabecera = adapter_cabecera.GetData(TurnoId);
        if (aTable_cabecera.Count > 0)
        {            
            lit_fecha.Text = aTable_cabecera[0].FECHA.ToShortDateString();
            lit_apellido_nombre.Text = aTable_cabecera[0].PACIENTE;
            if (!aTable_cabecera[0].IsHCNull()) { lit_hc.Text = aTable_cabecera[0].HC; } else { lit_hc.Text = ""; }
            lit_tipoorden.Text = aTable_cabecera[0].ITT_TIPO;
        }

        ImagenesDALTableAdapters.H2_IMG_CARGARINFORME_RAPIDOTableAdapter adapter_informe = new ImagenesDALTableAdapters.H2_IMG_CARGARINFORME_RAPIDOTableAdapter();
        ImagenesDAL.H2_IMG_CARGARINFORME_RAPIDODataTable aTable_informe = adapter_informe.GetData(TurnoId);
        if (aTable_cabecera.Count > 0)
        {
            //if (!aTable_informe[0].IsIMG_INFORME_TEXTONull()) lit_informe.Text = aTable_informe[0].IMG_INFORME_TEXTO; else lit_informe.Text = "";
            lit_informe.Text = aTable_informe[0].IMG_INFORME_TEXTO;
        }
       
    }
}