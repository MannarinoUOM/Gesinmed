using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using Hospital;

/// <summary>
/// Summary description for Epicrisis
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class Epicrisis : System.Web.Services.WebService {

    public Epicrisis () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public void GuardarEpicrisis(int Medico, int Especialidad, long PacienteNHC, int internacionid, string Ingreso_DX, string Ingreso_Detalle, string Ingreso_Ant1, 
        string Ingreso_Ant2, string Ingreso_Ant3, string Ingreso_Ant4, string Ingreso_Ant5, string Ingreso_Ant6, string Ingreso_Ant7, string Ingreso_Ant8, 
        string Ingreso_Ant9, string Ingreso_Ant10, string Ingreso_Motivo, string Ingreso_Antecedentes_Personales, string Ingreso_Internacion_Actual, 
        string Complementarios_Laboratorio, string Complementarios_Imagenes, string Complementarios_Otros, string Egreso_Diagnostico, int Egreso_Motivo_Alta,
        string Egreso_Indicacion, string Egreso_Concurrir, string Egreso_Complicacion, string Egreso_Dx, string Egreso_Detalle, string Egreso_Detalle3, string FechaIngreso, string FechaEgreso)
    {
        if (Session["Usuario"] != null)
        {
            AtInternadosBLL a = new AtInternadosBLL();
            int U = (Int32)((usuarios)(Session["Usuario"])).id;
            a.Epicrisis_Guardar(0, PacienteNHC, internacionid, Ingreso_DX, Ingreso_Detalle, Ingreso_Ant1, Ingreso_Ant2, Ingreso_Ant3, Ingreso_Ant4, Ingreso_Ant5,
                Ingreso_Ant6, Ingreso_Ant7, Ingreso_Ant8, Ingreso_Ant9, Ingreso_Ant10, Ingreso_Motivo, Ingreso_Antecedentes_Personales, Ingreso_Internacion_Actual,
                Complementarios_Laboratorio, Complementarios_Imagenes, Complementarios_Otros, Egreso_Diagnostico, Egreso_Motivo_Alta, Egreso_Indicacion, Egreso_Concurrir,
                Egreso_Complicacion, Egreso_Dx, Egreso_Detalle, Egreso_Detalle3, U, Medico, Especialidad, FechaIngreso, FechaEgreso);
        }
        else throw new Exception("Inicie Sesion");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public void IQB_Epicrisis_Guardar(int EpicrisisId, long PacienteNHC, int internacionid, string Ingreso_DX, string Ingreso_Detalle, string Ingreso_Motivo, 
          string Egreso_Indicacion, string Egreso_Concurrir, string Egreso_Complicacion, string Egreso_Dx, int MedicoId, int EspecialidadId, string FechaIngreso,
          string FechaEgreso, string CirugiaRealizada)
    {
        if (Session["Usuario"] != null)
        {
            AtInternadosBLL a = new AtInternadosBLL();
            int Usuario = (Int32)((usuarios)(Session["Usuario"])).id;
            a.IQB_Epicrisis_Guardar(EpicrisisId, PacienteNHC, internacionid, Ingreso_DX, Ingreso_Detalle, Ingreso_Motivo, 
            Egreso_Indicacion, Egreso_Concurrir, Egreso_Complicacion, Egreso_Dx, Usuario, MedicoId, EspecialidadId, FechaIngreso,
            FechaEgreso, CirugiaRealizada);
        }
        else throw new Exception("Inicie Sesion");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public void IQB_INGRESO_INSERT(IQB_HC_INGRESO oData)
    {
        if (Session["Usuario"] != null)
        {
            AtInternadosBLL a = new AtInternadosBLL();
            oData.HC_IQB_USU_ID = ((usuarios)Session["Usuario"]).id;
            a.IQB_INGRESO_INSERT(oData);
        }
        else throw new Exception("Inicie Sesion");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public IQB_HC_INGRESO IQB_INGRESO_LIST_BY_INT(long InternacionId)
    {
        if (Session["Usuario"] != null)
        {
            AtInternadosBLL a = new AtInternadosBLL();
            return a.IQB_INGRESO_LIST_BY_INT(InternacionId);
        }
        else throw new Exception("Inicie Sesion");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void GuardarPase_UTI_Piso(int Medico, int Especialidad, long PacienteNHC, int internacionid, string Ingreso_DX, string Ingreso_Detalle, string Ingreso_Ant1,
        string Ingreso_Ant2, string Ingreso_Ant3, string Ingreso_Ant4, string Ingreso_Ant5, string Ingreso_Ant6, string Ingreso_Ant7, string Ingreso_Ant8,
        string Ingreso_Ant9, string Ingreso_Ant10, string Ingreso_Motivo, string Ingreso_Antecedentes_Personales, string Ingreso_Internacion_Actual,
        string Complementarios_Laboratorio, string Complementarios_Imagenes, string Complementarios_Otros, string Egreso_Diagnostico, int Egreso_Motivo_Alta,
        string Egreso_Indicacion, string Egreso_Concurrir, string Egreso_Complicacion, string Egreso_Dx, string Egreso_Detalle, string FechaIngreso, string FechaEgreso)
    {
        if (Session["Usuario"] != null)
        {
            AtInternadosBLL a = new AtInternadosBLL();
            int U = (Int32)((usuarios)(Session["Usuario"])).id;
            a.PaseUTI_Piso_Guardar(0, PacienteNHC, internacionid, Ingreso_DX, Ingreso_Detalle, Ingreso_Ant1, Ingreso_Ant2, Ingreso_Ant3, Ingreso_Ant4, Ingreso_Ant5,
                Ingreso_Ant6, Ingreso_Ant7, Ingreso_Ant8, Ingreso_Ant9, Ingreso_Ant10, Ingreso_Motivo, Ingreso_Antecedentes_Personales, Ingreso_Internacion_Actual,
                Complementarios_Laboratorio, Complementarios_Imagenes, Complementarios_Otros, Egreso_Diagnostico, Egreso_Motivo_Alta, Egreso_Indicacion, Egreso_Concurrir,
                Egreso_Complicacion, Egreso_Dx, Egreso_Detalle, U, Medico, Especialidad, FechaIngreso, FechaEgreso);
        }

    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public EpicrisisDatosCargado CargarEpicrisis(int Id)
    {
        if (Session["Usuario"] != null)
        {
            AtInternadosBLL a = new AtInternadosBLL();
            return a.CargarEpicrisis(Id);
        }
        else throw new Exception("Inicie Sesion");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public EpicrisisDatosCargado IQB_CargarEpicrisis(int Id)
    {
        if (Session["Usuario"] != null)
        {
            AtInternadosBLL a = new AtInternadosBLL();
            return a.IQB_CargarEpicrisis(Id);
        }
        else throw new Exception("Inicie Sesion");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public EpicrisisDatosCargado CargarPaseUTI_Piso(int Id)
    {
        if (Session["Usuario"] != null)
        {
            AtInternadosBLL a = new AtInternadosBLL();
            return a.CargarPaseUTI_Piso(Id);
        }
        else throw new Exception("Inicie Sesion Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public long Pase_Guardia_UTI_Guardar(Pase_Guardia_UTI datos)
    {
        /*
         * Fecha: 06/04/2016.
         * Guarda Plantilla de Pase de Guardia a UTI. 
         * Retorno Id con el que se guardo la plantilla.
         * Por Fede.
        */
        if (Session["Usuario"] != null)
        {
            datos.UsuarioId = ((usuarios)Session["Usuario"]).id;
            AtInternadosBLL a = new AtInternadosBLL();
            return a.Pase_Guardia_UTI_Guardar(datos);
        }
        else throw new Exception("Inicie Sesion Nuevamente.");
    }


    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public Pase_Guardia_UTI Pase_Guardia_UTI_Listar(long Pase_Guardia_UTI_Id)
    {
        /*
         * Fecha: 06/04/2016.
         * Lista Plantilla de Pase de Guardia a UTI. 
         * Retorno objeto con la plantilla.
         * Por Fede.
        */
        AtInternadosBLL a = new AtInternadosBLL();
        return a.Pase_Guardia_UTI_Listar(Pase_Guardia_UTI_Id);
    }

    [WebMethod(EnableSession=true)]
    [ScriptMethod]
    public void Pase_Guardia_UTI_Grabar_Visto(long Pase_Guardia_UTI_Id)
    {
        /*
         * Fecha: 12/04/2016.
         * Graba la fecha y el usuario que visualizo la plantilla.
         * Retorno nada.
         * Por Fede.
        */
        if (Session["Usuario"] != null)
        {
            AtInternadosBLL a = new AtInternadosBLL();
            a.Pase_Guardia_UTI_Grabar_Visto(Pase_Guardia_UTI_Id, ((usuarios)Session["Usuario"]).id);
        }
        else throw new Exception("Inicie sesion nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public Pase_Guardia_UTI Pase_Guardia_UTI_Cargar_Ultimo_Pase_NHC(long NHC)
    {
        /*
         * Fecha: 12/04/2016.
         * Recibe PacienteId y busca el ultimo pase a UTI del mismo
         * Retorno Pase UTI.
         * Por Fede.
        */
        if (Session["Usuario"] != null)
        {
            AtInternadosBLL a = new AtInternadosBLL();
            return a.Pase_Guardia_UTI_Cargar_Ultimo_Pase_NHC(NHC);
        }
        else throw new Exception("Inicie sesion nuevamente.");
    }

    [WebMethod]
    [ScriptMethod]
    public long Pase_Guardia_UTI_Cargar_DiasVent(long InternacionId)
    {
        /*
         * Fecha: 14/04/2016.
         * Recibe InternacionId y cuenta los dias de ventilacion por Nro Internacion.
         * Retorno Dias de Ventilacion.
         * Por Fede.
        */
        AtInternadosBLL a = new AtInternadosBLL();
        return a.Pase_Guardia_UTI_Contar_DiasVentilacion(InternacionId);
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public List<Pase_Guardia_UTI_Lista> Pase_Guardia_UTI_Listar_Pases_del_Dia(string Fecha)
    {
        /**
        * Fecha:                                14/06/2016.
        * @param Fecha string.                  Fecha para buscar la ultima evolucion de cada paciente del dia anterior.
        * @return List<Pase_Guardia_UTI_Lista>  Lista de pases de la fecha buscada.
        * @procedure                            H2_AT_INTERNADOS_LISTADO_PASE_GUARDIA_UTI_EVO
        * Por Fede.
       */
        if (Session["Usuario"] != null)
        {
            AtInternadosBLL a = new AtInternadosBLL();
            return a.Pase_Guardia_UTI_Listar_Pases_del_Dia(DateTime.Parse(Fecha));
        }
        else return null;
    }
}
