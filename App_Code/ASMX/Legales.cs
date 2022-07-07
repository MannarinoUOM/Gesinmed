using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Hospital;

/// <summary>
/// Descripción breve de Legales
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// Para permitir que se llame a este servicio Web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
[System.Web.Script.Services.ScriptService]
public class Legales : System.Web.Services.WebService {

    public Legales () {

        //Eliminar la marca de comentario de la línea siguiente si utiliza los componentes diseñados 
        //InitializeComponent(); 
    }

    [WebMethod]
    public List<Legales_TipoRequerimiento> Tipo_Requerimiento_List(bool Todos) 
    {
        LegalesBLL lbll = new LegalesBLL();
        return lbll.Tipo_Requerimiento_List(Todos);
    }

    [WebMethod(EnableSession=true)]
    public long Legales_Cabecera_Insert(Legales_Cabecera o)
    {
        if (Session["Usuario"] != null)
        {
            LegalesBLL lbll = new LegalesBLL();
            o.UsuarioId = ((usuarios)Session["Usuario"]).id;
            return lbll.Legales_Cabecera_Insert(o);
        }
        else throw new Exception("Inicie Sesion Nuevamente.");
    }

    [WebMethod]
    public void Legales_Detalles_Insert(Legales_Detalle o)
    {
         LegalesBLL lbll = new LegalesBLL();
         lbll.Legales_Detalle_Insert(o);
    }

    [WebMethod]
    public void Legales_Adjunto_Insert(Legales_Adjuntos adjunto)
    {
        LegalesBLL lbll = new LegalesBLL();
        lbll.Legales_Adjunto_Insert(adjunto);
    }

    [WebMethod]
    public List<Legales_Buscar_Req> Legales_Buscar_Requerimientos(string NHC, long NroDoc, string Paciente, string NroNota, int TipoReq, string PedidoPor
        ,string Desde,string Hasta,bool EsSecuestro, bool EsObito, bool EsART)
    {
            LegalesBLL lbll = new LegalesBLL();
            return lbll.Legales_List_Cabecera(NHC, NroDoc, Paciente, NroNota, TipoReq, PedidoPor, Desde, Hasta, EsSecuestro, EsObito,EsART);
    }


    [WebMethod]
    public Legales_Cabecera Legales_Buscar_Cabecera(long IdReq)
    {
        LegalesBLL lbll = new LegalesBLL();
        return lbll.Legales_List_Cabecera(IdReq);
    }

    [WebMethod]
    public Legales_Detalle Legales_Buscar_Detalle(long IdReq)
    {
        LegalesBLL lbll = new LegalesBLL();
        return lbll.Legales_List_Detalles(IdReq);
    }

    [WebMethod]
    public List<documentacion> Legales_TipoDoc_List()
    {
        LegalesBLL lbll = new LegalesBLL();
        return lbll.Legales_TipoDoc_List();
    }

    [WebMethod]
    public List<Legales_Adjuntos> Adjuntos_List(long IdReq)
    {
        LegalesBLL lbll = new LegalesBLL();
        return lbll.Adjuntos_List(IdReq);
    }

    [WebMethod(EnableSession=true)]
    public void BajaPedido(long IdReq)
    {
        if (Session["Usuario"] != null)
        {
            LegalesBLL lbll = new LegalesBLL();
            lbll.BajaPedido(IdReq);
        }
        else throw new Exception("Inicie sesión nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public void BajaAdjunto(long idArchivo)
    {
        if (Session["Usuario"] != null)
        {
            LegalesBLL lbll = new LegalesBLL();
            lbll.BajaAdjunto(idArchivo);
        }
        else throw new Exception("Inicie sesión nuevamente.");
    }


    [WebMethod(EnableSession = true)]
    public List<ovbitos_IMG> TraerIMGObitos(long afiliadoId)
    {
        if (Session["Usuario"] != null)
        {
            LegalesBLL lbll = new LegalesBLL();
         return lbll.Traer_IMG_Obitos(afiliadoId);
        }
        else throw new Exception("Inicie sesión nuevamente.");
    }

}
