using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;

/// <summary>
/// Summary description for HistoriaClinicaFacturacion
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
 [System.Web.Script.Services.ScriptService]
public class HistoriaClinicaFacturacion : System.Web.Services.WebService {

    public HistoriaClinicaFacturacion () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<lista_anios> Internaciones_Anios(long nhc,string desde,string hasta)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            Hospital.HistoriaClinicaFacturacionBLL H = new Hospital.HistoriaClinicaFacturacionBLL();
            return H.Internaciones_Anios(nhc,desde,hasta);
        }
        else
        {
            return null;
        }

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<labo_protocolos> Labo_Datos_Bacterio(string nhc, string anio,string mes ,string desde,string hasta)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            Hospital.HistoriaClinicaFacturacionBLL H = new Hospital.HistoriaClinicaFacturacionBLL();
            return H.Labo_Protocolos_Bacterio_by_Anio(nhc,anio,mes,desde,hasta);
        }
        else return null;
    }



    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<otras> Otras_Datos(string nhc, string anio, string mes, int interno)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            Hospital.HistoriaClinicaFacturacionBLL H = new Hospital.HistoriaClinicaFacturacionBLL();
            return H.Otras_by_Anio(nhc, anio,Convert.ToInt32(mes),interno);
        }
        else return null;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<otras> Internos_Datos(string nhc, string anio, int? tipo, int? agrupado)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            Hospital.HistoriaClinicaFacturacionBLL H = new Hospital.HistoriaClinicaFacturacionBLL();
            return H.Inrernos_by_Anio(nhc, anio, tipo, agrupado);
        }
        else return null;
    }



    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<hc_imagenes> Imagenes_Datos(string nhc, string anio, string PacienteId, string AxionNumeroHC, int mes, string desde, string hasta)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            Hospital.HistoriaClinicaFacturacionBLL H = new Hospital.HistoriaClinicaFacturacionBLL();
            return H.Imagenes_Datos(nhc, anio, PacienteId, AxionNumeroHC,mes,desde,hasta);
        }
        else return null;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<hc_anatomiapatologica> AnatomiaPatologica_Datos(string nhc, string anio,int mes ,string desde, string hasta)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            Hospital.HistoriaClinicaFacturacionBLL H = new Hospital.HistoriaClinicaFacturacionBLL();
            return H.AnatomiaPatologica_Datos(nhc, anio,mes,desde,hasta);
        }
        else return null;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<labo_protocolos> Labo_Datos(string nhc, string anio,string mes, string desde, string hasta)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            Hospital.HistoriaClinicaFacturacionBLL H = new Hospital.HistoriaClinicaFacturacionBLL();
            return H.Labo_Protocolos_by_Anio(nhc, anio,mes ,desde,hasta);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<interconsulta> Interconsultas_Datos(string nhc, string anio)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            Hospital.HistoriaClinicaFacturacionBLL H = new Hospital.HistoriaClinicaFacturacionBLL();
            return H.Interconsultas_Datos(nhc, anio);
        }
        else return null;
    }



    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<lista_anios> Cirugias_Anios(long nhc, string desde, string hasta)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            Hospital.HistoriaClinicaFacturacionBLL H = new Hospital.HistoriaClinicaFacturacionBLL();
            return H.Cirugias_Anios(nhc,desde,hasta);
        }
        else
        {
            return null;
        }

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<lista_anios> Guardia_Anios(long nhc, string desde, string hasta)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            Hospital.HistoriaClinicaFacturacionBLL H = new Hospital.HistoriaClinicaFacturacionBLL();
            return H.Guardia_Anios(nhc,desde,hasta);
        }
        else
        {
            return null;
        }

    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<lista_anios> Ambulatorio_Anio(long nhc, string desde, string hasta)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            Hospital.HistoriaClinicaFacturacionBLL H = new Hospital.HistoriaClinicaFacturacionBLL();
            return H.Ambulatorio_Anios(nhc,desde,hasta);
        }
        else
        {
            return null;
        }

    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<lista_meses> Ambulatorio_Mes(long nhc, int anio, string desde, string hasta)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            Hospital.HistoriaClinicaFacturacionBLL H = new Hospital.HistoriaClinicaFacturacionBLL();
            return H.Ambulatorio_Meses(nhc, anio,desde,hasta);
        }
        else
        {
            return null;
        }

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<registro_internacion> Internacion_Datos(long nhc, int anio,int mes, string desde, string hasta)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            Hospital.HistoriaClinicaFacturacionBLL H = new Hospital.HistoriaClinicaFacturacionBLL();
            return H.Internacion_Datos(nhc, anio,mes,desde,hasta);
        }
        else
        {
            return null;
        }

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<registro_cirugias> Cirugia_Datos(long nhc, int anio,int mes ,string desde, string hasta)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            Hospital.HistoriaClinicaFacturacionBLL H = new Hospital.HistoriaClinicaFacturacionBLL();
            return H.Cirugia_Datos(nhc, anio, mes,desde,hasta);
        }
        else
        {
            return null;
        }

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<registro_recetas> Recetas_Datos(long nhc, int anio,int mes ,string desde, string hasta)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            Hospital.HistoriaClinicaFacturacionBLL H = new Hospital.HistoriaClinicaFacturacionBLL();
            return H.Recetas_Datos(nhc, anio,mes ,desde,hasta);
        }
        else
        {
            return null;
        }

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<registro_recetas> Guardia_Datos(long nhc, int anio,int mes ,string desde, string hasta)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            Hospital.HistoriaClinicaFacturacionBLL H = new Hospital.HistoriaClinicaFacturacionBLL();
            return H.Guardia_Datos(nhc, anio,mes,desde,hasta);
        }
        else
        {
            return null;
        }

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<registro_ambulatorio> Ambulatorio_Datos(long nhc, int anio, int mes, string desde, string hasta)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            Hospital.HistoriaClinicaFacturacionBLL H = new Hospital.HistoriaClinicaFacturacionBLL();
            return H.Ambulatorio_Datos(nhc, anio, mes,desde,hasta);
        }
        else
        {
            return null;
        }

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<HC_Compacta> Historia_Clinica_Compacta(long nhc, string desde, string hasta)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            Hospital.HistoriaClinicaFacturacionBLL H = new Hospital.HistoriaClinicaFacturacionBLL();
            return H.Historia_Clinica_Compacta(nhc,desde,hasta);
        }
        else
        {
            return null;
        }

    }

    [WebMethod(EnableSession = true)]
    public void HC_Movimiento_Insert(HC_Movimiento h)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.HistoriaClinicaFacturacionBLL Hbll = new Hospital.HistoriaClinicaFacturacionBLL();
            Hbll.HC_Movimiento_Insert(h);
        }
    }

    [WebMethod(EnableSession = true)]
    public void HC_Movimiento_Delete(long Id)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.HistoriaClinicaFacturacionBLL Hbll = new Hospital.HistoriaClinicaFacturacionBLL();
            Hbll.HC_Movimiento_Delete(Id, ((usuarios)Session["Usuario"]).id);
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<HC_Movimiento> HC_Movimiento_Listar(long NHC)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.HistoriaClinicaFacturacionBLL Hbll = new Hospital.HistoriaClinicaFacturacionBLL();
            return Hbll.HC_Movimiento_Listar(NHC);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int ActualizarTomoHC(long nhc, long afiliafoId, int tomos)
    {
        if (Session["Usuario"] != null)
        {
            var usu = (usuarios)HttpContext.Current.Session["Usuario"];
            Hospital.HistoriaClinicaFacturacionBLL Hbll = new Hospital.HistoriaClinicaFacturacionBLL();
            return Hbll.Actualizar_Tomo_HC(nhc, afiliafoId, usu.id, tomos);
        }
        else { return -1; }
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int TraerTomoNHC(long nhc, long afiliafoId)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.HistoriaClinicaFacturacionBLL Hbll = new Hospital.HistoriaClinicaFacturacionBLL();
            return Hbll.Traer_Tomo_NHC(nhc, afiliafoId);
        }
        else { return -1; }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<IM_Buscar> BuscarIM_by_Internacion(string IdInt)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.HistoriaClinicaFacturacionBLL Hbll = new Hospital.HistoriaClinicaFacturacionBLL();
            return Hbll.BuscarIM_by_Internacion(IdInt);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    public long MedicoporUsuario()
    {
        if (Session["Usuario"] != null)
        {
            Hospital.HistoriaClinicaFacturacionBLL Hbll = new Hospital.HistoriaClinicaFacturacionBLL();
            return Hbll.MedicoporUsuario(((usuarios)Session["Usuario"]).id);
        }
        else return -1;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<lista_anios> Endoscopias_Anios(long nhc, string desde, string hasta)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            Hospital.HistoriaClinicaFacturacionBLL H = new Hospital.HistoriaClinicaFacturacionBLL();
            return H.Endoscopia_Anios(nhc,desde,hasta);
        }
        else
        {
            return null;
        }

    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<registro_cirugias> Endoscopia_Datos(long nhc, int anio,int mes, string desde, string hasta)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            Hospital.HistoriaClinicaFacturacionBLL H = new Hospital.HistoriaClinicaFacturacionBLL();
            return H.Endoscopia_Datos(nhc, anio,mes,desde,hasta);
        }
        else
        {
            return null;
        }

    }


    [WebMethod(EnableSession = true)]
    public List<HC_Movimiento> HCMOVIMIENTOSPORCOLUMNA(string desde, string hasta, string columna)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            Hospital.HistoriaClinicaFacturacionBLL H = new Hospital.HistoriaClinicaFacturacionBLL();
            return H.HC_MOVIMIENTOS_POR_COLUMNA(desde, hasta, columna);
        }
        else
        {
            return null;
        }

    }

    [WebMethod(EnableSession = true)]
    public int VerificarTurnoExistente(long afiliadoId)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            Hospital.HistoriaClinicaFacturacionBLL H = new Hospital.HistoriaClinicaFacturacionBLL();
            return H.Verificar_Turno_Existente(afiliadoId, ((usuarios)Session["Usuario"]).id);
        }
        else
        { return 0; }
    }

    [WebMethod(EnableSession = true)]
    public int VerificarHcExistente(string hc)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            Hospital.HistoriaClinicaFacturacionBLL H = new Hospital.HistoriaClinicaFacturacionBLL();
            return H.VerificarHcExistente(hc);
        }
        else
        { return 0; }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<lista_meses> Internacion_Mes(long nhc, int anio, string desde, string hasta)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            Hospital.HistoriaClinicaFacturacionBLL H = new Hospital.HistoriaClinicaFacturacionBLL();
            return H.Internacion_Mes(nhc, anio, desde, hasta);
        }
        else
        {
            return null;
        }

    }

}
