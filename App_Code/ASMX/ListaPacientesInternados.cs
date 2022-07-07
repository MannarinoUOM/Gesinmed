using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;

/// <summary>
/// Summary description for ListaPacientesInternados
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class ListaPacientesInternados : System.Web.Services.WebService {

    public ListaPacientesInternados () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public void At_Internados_IntraHosp_UPDATE_INFECCION(long NroInternacion, string Valor_Campo,int Campo_Update)
    {
        Hospital.AtInternadosBLL AtInternados = new Hospital.AtInternadosBLL();
        AtInternados.At_Internados_IntraHosp_UPDATE_INFECCION(NroInternacion,Valor_Campo, Campo_Update);
    }

    [WebMethod]
    public List<at_internaciones_cultivo> AT_INTERNADOS_CULTIVO_LIST()
    {
        Hospital.AtInternadosBLL AtInternados = new Hospital.AtInternadosBLL();
        return AtInternados.AT_INTERNADOS_CULTIVO_LIST();
    }

    [WebMethod]
    public List<at_internaciones_germen> AT_INTERNADOS_GERMEN_LIST()
    {
        Hospital.AtInternadosBLL AtInternados = new Hospital.AtInternadosBLL();
        return AtInternados.AT_INTERNADOS_GERMEN_LIST();
    }

    [WebMethod]
    public List<at_internaciones_isq> AT_INTERNADOS_ISQ_LIST()
    {
        Hospital.AtInternadosBLL AtInternados = new Hospital.AtInternadosBLL();
        return AtInternados.AT_INTERNADOS_ISQ_LIST();
    }

    [WebMethod]
    public List<at_internaciones_buscar> BuscarInternados(string ServiciosId, string Paciente,string Documento,string NHC)
    {
        Hospital.AtInternadosBLL AtInternados = new Hospital.AtInternadosBLL();
        int Doc;
        if (string.IsNullOrEmpty(Documento)) Doc = 0;
        else Doc = int.Parse(Documento);
        return AtInternados.Buscar(ServiciosId, Paciente, Doc, NHC);
    }

    [WebMethod]
    public List<at_internados_infrahosp> BuscarInternados_IntraHosp(string ServiciosId, string Paciente, string Documento, string NHC,
        string Desde, string Hasta)
    {
        Hospital.AtInternadosBLL AtInternados = new Hospital.AtInternadosBLL();
        int Doc;
        if (string.IsNullOrEmpty(Documento)) Doc = 0;
        else Doc = int.Parse(Documento);
        return AtInternados.At_Internados_IntraHosp_Buscar(ServiciosId, Paciente, Doc, NHC, Desde,Hasta);
    }

    [WebMethod]
    public List<evolucion> BuscarEvolucion(long Id, long Internacion, int MedicoId)
    {
        Hospital.AtInternadosBLL AtInternados = new Hospital.AtInternadosBLL();
        return AtInternados.CargarEvoluciones(Id, Internacion, MedicoId);
    }

    [WebMethod(EnableSession=true)]
    public int Cant_Interconsultas()
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AtInternadosBLL AtInternados = new Hospital.AtInternadosBLL();
            return AtInternados.Interconsultas_Pendientes_by_Usuario(((usuarios)Session["Usuario"]).id);
        }
        return 0;
    }

    [WebMethod]
    public void EliminarEvolucion(long Id)
    {
        Hospital.AtInternadosBLL AtInternados = new Hospital.AtInternadosBLL();
        AtInternados.Eliminar(Id);
    }

    [WebMethod]
    public long UltimaHojaEnf_by_Int(long IdInternacion)
    {
        Hospital.AtInternadosBLL AtInternados = new Hospital.AtInternadosBLL();
        return AtInternados.UltimaHojaEnf_by_Int(IdInternacion);
    }

    [WebMethod]
    public void GuardarEvolucion(long Internacion, int medicoid, string evolucion, long EvolucionId, int Especialidad)
    {
        List<evolucion> e = new List<global::evolucion>();
        BusquedaInternadosId i = new BusquedaInternadosId();


        Hospital.AtInternadosBLL AtInternados = new Hospital.AtInternadosBLL();
        if (EvolucionId != 0)
        {
            e = AtInternados.CargarEvoluciones(EvolucionId, 0, medicoid);
        }

        i = AtInternados.CargarEncabezdoInternacionId(Internacion);
        string fecha = "";
        int CamaId = 0;
        int SalaId = 0;
        long HNC = 0;

        if (i != null)
        {
            CamaId = i.camaid;
            SalaId = i.salaid;
            HNC = i.NHC;
        }

        if (EvolucionId != 0)
        {
            if (e != null)
            {
                fecha = e[0].fecha;
            }
            else
            {
                fecha = DateTime.Now.ToString();
            }
        }
        else
        {
            fecha = DateTime.Now.ToString();
        }

        DateTime Fecha = Convert.ToDateTime(fecha);
        AtInternados.Guardar(Fecha, medicoid, Internacion, evolucion, HNC, CamaId, SalaId, EvolucionId,Especialidad);
    }

    [WebMethod]
    public BusquedaInternadosId CargarEncabezadoInternacion(long Id)
    {
        Hospital.AtInternadosBLL AtInternados = new Hospital.AtInternadosBLL();
        return AtInternados.CargarEncabezdoInternacionId(Id);
    }

    [WebMethod]
    public EpicrisisDatosCargado CargarEpicrisis(int Id)
    {
        Hospital.AtInternadosBLL AtInternados = new Hospital.AtInternadosBLL();
        return AtInternados.CargarEpicrisis(Id);
    }

    [WebMethod]
    public void Insert_PedidoInterconsulta(Interconsulta i)
    {
        Hospital.AtInternadosBLL AtInternados = new Hospital.AtInternadosBLL();
        try
        {
            AtInternados.Insert_PedidoInterconsulta(i);
        }
        catch {
            throw new Exception("Problema Al Cargar Interconsulta");
        }
    }

    [WebMethod]
    public List<InterconsultaList> Interconsultas_by_NHC(long NHC, long Medico,long Especialidad)
    {
        Hospital.AtInternadosBLL AtInternados = new Hospital.AtInternadosBLL();
        return AtInternados.Interconsultas_by_NHC(NHC,Medico,Especialidad);
    }

    [WebMethod]
    public List<InterconsultaList> Interconsultas_by_Fecha(long NHC, long Medico, long EspId, string Desde, string Hasta, bool Todos, string Afiliado)
    {
        Hospital.AtInternadosBLL AtInternados = new Hospital.AtInternadosBLL();
        return AtInternados.Interconsultas_by_Fecha(NHC, Medico, EspId, Desde, Hasta, Todos,Afiliado);
    }

    [WebMethod(EnableSession=true)]
    public void Interconsultas_Update(long Id, long MedicoInter, string Observacion, string MedicoExterno)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AtInternadosBLL AtInternados = new Hospital.AtInternadosBLL();
            AtInternados.At_Internados_PedidosInter_Update(Id, MedicoInter, Observacion, MedicoExterno);
        }
        else throw new Exception("Inicie Sesion Nuevamente.");
    }

    [WebMethod]
    public List<HojaEnfermeriaDet> UltimaIMbyNHC(long NHC)
    {
        Hospital.AtInternadosBLL AtInternados = new Hospital.AtInternadosBLL();
        return AtInternados.UltimaIMbyNHC(NHC);
    }

    [WebMethod(EnableSession=true)]
    public long Hoja_Enfermeria_InsertCab(HojaEnfermeriaCab h)
    {
        Hospital.AtInternadosBLL AtInternados = new Hospital.AtInternadosBLL();
        h.UsuarioId = ((usuarios)Session["Usuario"]).id;
        return AtInternados.Hoja_Enfermeria_InsertCab(h);
    }

    [WebMethod]
    public long Hoja_Enfermeria_InsertDet(List<HojaEnfermeriaDet> objConsultas, long IdHoja)
    {
        if (objConsultas.Count > 0)
        {
            objConsultas.ForEach(delegate(HojaEnfermeriaDet det) {
                Hospital.AtInternadosBLL AtInternados = new Hospital.AtInternadosBLL();
                det.IdHoja = IdHoja;
                AtInternados.Hoja_Enfermeria_InsertDet(det);
            });
            return IdHoja;
        }
        else return -1;
    }

    [WebMethod(EnableSession = true)]
    public List<HojaEnfermeriaList> Hoja_Enfermeria_List(string NHC, string MedicoId, string FechaDesde, string FechaHasta, string ServicioId, string Afiliado)
    {
        Hospital.AtInternadosBLL AtInternados = new Hospital.AtInternadosBLL();
        long _NHC, _MedicoId, _ServicioId;
        DateTime _FechaDesde, _FechaHasta;
        if (!string.IsNullOrEmpty(NHC)) _NHC = Convert.ToInt64(NHC);
        else _NHC = 0;
        if (!string.IsNullOrEmpty(MedicoId)) _MedicoId = Convert.ToInt64(MedicoId);
        else _MedicoId = 0;
        if (!string.IsNullOrEmpty(ServicioId)) _ServicioId = Convert.ToInt64(ServicioId);
        else _ServicioId = 0;
        if (!string.IsNullOrEmpty(FechaDesde)) _FechaDesde = Convert.ToDateTime(FechaDesde);
        else _FechaDesde = DateTime.MinValue;
        if (!string.IsNullOrEmpty(FechaHasta)) _FechaHasta = Convert.ToDateTime(FechaHasta);
        else _FechaHasta = DateTime.MinValue;
        return AtInternados.Hoja_Enfermeria_List(_NHC, _MedicoId, _FechaDesde, _FechaHasta, _ServicioId, Afiliado);
    }

    [WebMethod]
    public List<HojaEnfermeriaCabList> Hoja_Enfermeria_List_Cab_byId(long Id)
    {
         Hospital.AtInternadosBLL AtInternados = new Hospital.AtInternadosBLL();
         return AtInternados.Hoja_Enfermeria_List_Cab_byId(Id);
    }

    [WebMethod]
    public List<HojaEnfermeriaDet> Hoja_Enfermeria_List_Det_byId(long Id)
    {
         Hospital.AtInternadosBLL AtInternados = new Hospital.AtInternadosBLL();
         return AtInternados.Hoja_Enfermeria_List_Det_byId(Id);
    }

    [WebMethod]
    public void Hoja_Enfermeria_Delete_Det(long Id)
    {
        Hospital.AtInternadosBLL AtInternados = new Hospital.AtInternadosBLL();
        AtInternados.Hoja_Enfermeria_Delete_Det(Id);
    }




    [WebMethod(EnableSession = true)]
    public List<AtInternacionHojaQuirirgico> AtInternados_Hoja_Quirurgica_Listar(int Id, int PacienteId, int InternacionId)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AtInternadosBLL AtInternados = new Hospital.AtInternadosBLL();
            return AtInternados.AtInternados_Hoja_Quirurgica_Listar(Id, PacienteId, InternacionId);
        }
        else
        { return null; }
        
    }


    [WebMethod(EnableSession = true)]
    public List<Consentimiento> Listar_Consentimiento_Normas(int AfiliadoId)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AtInternadosBLL AtInternados = new Hospital.AtInternadosBLL();
            return AtInternados.Listar_Consentimiento_Normas(AfiliadoId);
        }
        else
        { return null; }

    }


    [WebMethod(EnableSession = true)]
    public List<evolucionEspecialista> TraerEvolucionEspecialistaHC(int InternacionId)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AtInternadosBLL AtInternados = new Hospital.AtInternadosBLL();
            return AtInternados.TraerEvolucionEspecialistaHC(InternacionId);
        }
        else
        { return null; }

    }

    [WebMethod(EnableSession = true)]
    public Int32 AtInternados_Hoja_Quirurgica_Guardar(AtInternacionHojaQuirirgico Hoja)
    {

        if (Session["Usuario"] != null)
        {
            Hoja.PRQ_USUARIO = ((usuarios)Session["Usuario"]).id.ToString();
            Hospital.AtInternadosBLL AtInternados = new Hospital.AtInternadosBLL();
            return AtInternados.AtInternados_Hoja_Quirurgica_Guardar(Hoja);
        }
        else
        {
            throw new Exception("Problema con la sesión");
        }
    }


    [WebMethod(EnableSession = true)]
    public buscarinternacion Buscar_Internacion_Id(int Id)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.InternacionesBLL AtInternados = new Hospital.InternacionesBLL();
            return AtInternados.Buscar_Internacion_Id(Id)[0];
        }
        else
        { return null; }

    }

    [WebMethod(EnableSession = true)]
    public long PaseCama_Insert(PaseCama objData)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AtInternadosBLL i = new Hospital.AtInternadosBLL();
            objData.PaseCama_UsuarioId = ((usuarios)Session["Usuario"]).id;
            return i.PaseCama_Insert(objData);
        }
        else throw new Exception("Inicie Sesion");
    }

    [WebMethod(EnableSession = true)]
    public List<PaseCama> PaseCama_List_by_NroInternacion(long NroInternacion)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AtInternadosBLL i = new Hospital.AtInternadosBLL();
            return i.PaseCama_List_by_NroInternacion(NroInternacion);
        }
        else throw new Exception("Inicie Sesion");
    }
}
