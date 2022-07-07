using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using System.Web.Script.Serialization;
using Hospital;

/// <summary>
/// Descripción breve de anatomiaPatologicaTrue
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// Para permitir que se llame a este servicio Web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
 [System.Web.Script.Services.ScriptService]
public class anatomiaPatologicaTrue : System.Web.Services.WebService {

    public anatomiaPatologicaTrue () {

        //Eliminar la marca de comentario de la línea siguiente si utiliza los componentes diseñados 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession = true)]
    public List<topografias> PatoMaterialTopografiasListado(int tipo, string busqueda)
    {
        if (Session["Usuario"] != null)
        {
            AnatomiaPatologicaTrueBLL a = new AnatomiaPatologicaTrueBLL();
            return a.Pato_Material_Topografias_Listado(tipo, busqueda);
        }
         else throw new Exception("Ha Perdido Sesión!!!") ;
    }

    [WebMethod(EnableSession = true)]
    public int eliminarTopografias(int id)
    {
        if (Session["Usuario"] != null)
        {
            AnatomiaPatologicaTrueBLL a = new AnatomiaPatologicaTrueBLL();
            return a.eliminar_Topografias(id);
        }
        else throw new Exception("Ha Perdido Sesión!!!");
    }

    [WebMethod(EnableSession = true)]
    public int guardarEditarMaterial(int id, string codigo, string descripcion)
    {
        if (Session["Usuario"] != null)
        {
            AnatomiaPatologicaTrueBLL a = new AnatomiaPatologicaTrueBLL();
            return a.guardar_Editar_Topografias(id,codigo,descripcion);
        }
        else throw new Exception("Ha Perdido Sesión!!!");
    }
    /// <summary>
    /// /////////////////
    /// </summary>
    /// <param name="tipo"></param>
    /// <param name="busqueda"></param>
    /// <returns></returns>
    [WebMethod(EnableSession = true)]
    public List<procedimientos> PatoProcedimientosListado(int tipo, string busqueda)
    {
        if (Session["Usuario"] != null)
        {
            AnatomiaPatologicaTrueBLL a = new AnatomiaPatologicaTrueBLL();
            return a.Pato_Procedimientos_Listado(tipo, busqueda);
        }
        else throw new Exception("Ha Perdido Sesión!!!");
    }

    [WebMethod(EnableSession = true)]
    public int eliminarProcedimientos(int id)
    {
        if (Session["Usuario"] != null)
        {
            AnatomiaPatologicaTrueBLL a = new AnatomiaPatologicaTrueBLL();
            return a.eliminar_Procedimientos(id);
        }
        else throw new Exception("Ha Perdido Sesión!!!");
    }

    [WebMethod(EnableSession = true)]
    public int guardarEditarProcedimientos(int id, string codigo, string descripcion)
    {
        if (Session["Usuario"] != null)
        {
            AnatomiaPatologicaTrueBLL a = new AnatomiaPatologicaTrueBLL();
            return a.guardar_Editar_Procedimientos(id, codigo, descripcion);
        }
        else throw new Exception("Ha Perdido Sesión!!!");
    }
    /// <summary>
    /// /////////////////
    /// </summary>
    /// <param name="tipo"></param>
    /// <param name="busqueda"></param>
    /// <returns></returns>
    [WebMethod(EnableSession = true)]
    public List<metodos> PatoMetodosListado(int tipo, string busqueda)
    {
        if (Session["Usuario"] != null)
        {
            AnatomiaPatologicaTrueBLL a = new AnatomiaPatologicaTrueBLL();
            return a.Pato_Metodos_Listado(tipo, busqueda);
        }
        else throw new Exception("Ha Perdido Sesión!!!");
    }

    [WebMethod(EnableSession = true)]
    public List<metodos> PatoDiagnosticosListado(int tipo, string busqueda)
    {
        if (Session["Usuario"] != null)
        {
            AnatomiaPatologicaTrueBLL a = new AnatomiaPatologicaTrueBLL();
            return a.Pato_Diagnosticos_Listado(tipo, busqueda);
        }
        else throw new Exception("Ha Perdido Sesión!!!");
    }

    [WebMethod(EnableSession = true)]
    public int guardarEditarDiagnosticos(int id, string descripcion)
    {
        if (Session["Usuario"] != null)
        {
            AnatomiaPatologicaTrueBLL a = new AnatomiaPatologicaTrueBLL();
            return a.guardar_Editar_Diagnosticos(id, descripcion);
        }
        else throw new Exception("Ha Perdido Sesión!!!");
    }


    [WebMethod(EnableSession = true)]
    public List<Patologos> PatoMedicosCentListado()
    {
        //if (Session["Usuario"] != null)
        //{
            AnatomiaPatologicaTrueBLL a = new AnatomiaPatologicaTrueBLL();
            return a.Pato_Medicos_Cent_Listado();
        //}
        //else throw new Exception("Ha Perdido Sesión!!!");
    }

    [WebMethod(EnableSession = true)]
    public List<Patologos> PatoMedicosExtListado()
    {
        if (Session["Usuario"] != null)
        {
            AnatomiaPatologicaTrueBLL a = new AnatomiaPatologicaTrueBLL();
            return a.Pato_Medicos_Ext_Listado();
        }
        else throw new Exception("Ha Perdido Sesión!!!");
    }

    [WebMethod]
    public List<sericiosPato> TraerServiciosExtAnatomiaPatologica()
    {
        Hospital.AnatomiaPatologicaTrueBLL s = new Hospital.AnatomiaPatologicaTrueBLL();
        return s.Traer_Servicios_Ext_Anatomia_Patologica();
    }

    [WebMethod]
    public List<sericiosPato> TraerServiciosCentAnatomiaPatologica()
    {
        Hospital.AnatomiaPatologicaTrueBLL s = new Hospital.AnatomiaPatologicaTrueBLL();
        return s.Traer_Servicios_Cent_Anatomia_Patologica();
    }

    [WebMethod(EnableSession = true)]
    public int eliminarMetodos(int id)
    {
        if (Session["Usuario"] != null)
        {
            AnatomiaPatologicaTrueBLL a = new AnatomiaPatologicaTrueBLL();
            return a.eliminar_Metodos(id);
        }
        else throw new Exception("Ha Perdido Sesión!!!");
    }

    [WebMethod(EnableSession = true)]
    public int guardarEditarMetodos(int id, string descripcion)
    {
        if (Session["Usuario"] != null)
        {
            AnatomiaPatologicaTrueBLL a = new AnatomiaPatologicaTrueBLL();
            return a.guardar_Editar_Metodos(id, descripcion);
        }
        else throw new Exception("Ha Perdido Sesión!!!");
    }

    [WebMethod(EnableSession = true)]
    public List<nomenclador> traerNomenclador(int tipo,string busqueda)
    {
        if (Session["Usuario"] != null)
        {
            AnatomiaPatologicaTrueBLL a = new AnatomiaPatologicaTrueBLL();
            return a.traer_Nomenclador(tipo, busqueda);
        }
        else throw new Exception("Ha Perdido Sesión!!!");
    }

    [WebMethod(EnableSession = true)]
    public int guardarEditarNomenclador(int id, string descripcion, decimal precio)
    {
        if (Session["Usuario"] != null)
        {
            AnatomiaPatologicaTrueBLL a = new AnatomiaPatologicaTrueBLL();
            return a.guardar_Editar_Nomenclador(id, descripcion, precio);
        }
        else throw new Exception("Ha Perdido Sesión!!!");
    }

    [WebMethod(EnableSession = true)]
    public int eliminarNomenclador(int id)
    {
        if (Session["Usuario"] != null)
        {
            AnatomiaPatologicaTrueBLL a = new AnatomiaPatologicaTrueBLL();
            return a.eliminar_Nomenclador(id);
        }
        else throw new Exception("Ha Perdido Sesión!!!");
    }

    [WebMethod(EnableSession = true)]
    public List<tecnicas> traerTecnicas(int tipo, string busqueda)
    {
        if (Session["Usuario"] != null)
        {
            AnatomiaPatologicaTrueBLL a = new AnatomiaPatologicaTrueBLL();
            return a.traer_Tecnicas(tipo,busqueda);
        }
        else throw new Exception("Ha Perdido Sesión!!!");
    
    

    }


    [WebMethod(EnableSession = true)]
    public int guardarEditarTecnicas(int id, string descripcion)
    {
        if (Session["Usuario"] != null)
        {
            AnatomiaPatologicaTrueBLL a = new AnatomiaPatologicaTrueBLL();
            return a.guardar_Editar_Tecnicas(id, descripcion);
        }
        else throw new Exception("Ha Perdido Sesión!!!");
    }

    [WebMethod(EnableSession = true)]
    public int eliminarTecnicas(int id)
    {
        if (Session["Usuario"] != null)
        {
            AnatomiaPatologicaTrueBLL a = new AnatomiaPatologicaTrueBLL();
            return a.eliminar_Tecnicas(id);
        }
        else throw new Exception("Ha Perdido Sesión!!!");
    }

    [WebMethod(EnableSession = true)]
    public List<diagnosticoPat> TraerDiagnosticosComboAnatomia(int cuantos, int id)
    {
        if (Session["Usuario"] != null)
        {
            AnatomiaPatologicaTrueBLL a = new AnatomiaPatologicaTrueBLL();
            return a.Traer_Diagnosticos_Combo_Anatomia(cuantos,id);
        }
        else throw new Exception("Ha Perdido Sesión!!!");

    }

    [WebMethod]
    public List<seccionalPato> Seccionales_Listar()
    {
        AnatomiaPatologicaTrueBLL secionales = new AnatomiaPatologicaTrueBLL();
        return secionales.SeccionalListar();
    }

    [WebMethod(EnableSession = true)]
    public List<estudioPato> buscarEstudios(busquedaPato b)
    {
        if (Session["Usuario"] != null)
        {
            AnatomiaPatologicaTrueBLL a = new AnatomiaPatologicaTrueBLL();
            return a.buscar_Estudios(b);
        }
        else throw new Exception("Ha Perdido Sesión!!!");

    }

    [WebMethod(EnableSession = true)]
    public estudioPato PatoTraerCargaPorId(int id)
    {
        if (Session["Usuario"] != null)
        {
            AnatomiaPatologicaTrueBLL a = new AnatomiaPatologicaTrueBLL();
            return a.Pato_Traer_Carga_Por_Id(id);
        }
        else throw new Exception("Ha Perdido Sesión!!!");

    }

    [WebMethod(EnableSession = true)]
    public int PatoGuardarEditar(estudioPato obj)
    {
        if (Session["Usuario"] != null)
        {
            usuarios u = (usuarios)Session["Usuario"];
            int usuario = (int)u.id;
            obj.usuario = usuario;
            AnatomiaPatologicaTrueBLL a = new AnatomiaPatologicaTrueBLL();
            return a.Pato_Guardar_Editar(obj);
        }
        else throw new Exception("Ha Perdido Sesión!!!");
    }

    [WebMethod(EnableSession = true)]
    public List<farmaciaPedido> EntregasPorServicioCantidad(string desde,string hasta,int servicio)
    {
        if (Session["Usuario"] != null)
        {
            AnatomiaPatologicaTrueBLL a = new AnatomiaPatologicaTrueBLL();
            return a.Entregas_Por_Servicio_Cantidad(desde,hasta,servicio);
        }
        else throw new Exception("Ha Perdido Sesión!!!");
    }

    [WebMethod(EnableSession = true)]
    public int PatoVerificarExistenciaProtocolo(int protocolo,int tipo)
    {
        if (Session["Usuario"] != null)
        {
            AnatomiaPatologicaTrueBLL a = new AnatomiaPatologicaTrueBLL();
            return a.Pato_Verificar_Existencia_Protocolo(protocolo,tipo);
        }
        else throw new Exception("Ha Perdido Sesión!!!");
    }

    [WebMethod(EnableSession = true)]
    public int PatoReasignarProtocolo(reasinarProtocolo obj)
    {
        if (Session["Usuario"] != null)
        {
            AnatomiaPatologicaTrueBLL a = new AnatomiaPatologicaTrueBLL();
            return a.Pato_ReasignarProtocolo(obj);
        }
        else throw new Exception("Ha Perdido Sesión!!!");
    }

    [WebMethod(EnableSession = true)]
    public reasinarProtocolo PatoTraerPacienteEncabezadoReasignado(int pacienteId)
    {
        if (Session["Usuario"] != null)
        {
            AnatomiaPatologicaTrueBLL a = new AnatomiaPatologicaTrueBLL();
            return a.H2_Pato_Traer_Paciente_Encabezado_Reasignado(pacienteId);
        }
        else throw new Exception("Ha Perdido Sesión!!!");
    }

    //////////////PAP//////////////////////////////////////////////////////////////////////////////////////////////////

    [WebMethod(EnableSession = true)]
    public List<PAP_Item> PAPTraerCombos(int tipo)
    {
        //if (Session["Usuario"] != null)
        //{
            AnatomiaPatologicaTrueBLL a = new AnatomiaPatologicaTrueBLL();
            return a.PAP_Traer_Combos(tipo);
        //}
        //else throw new Exception("Ha Perdido Sesión!!!");
    }

    [WebMethod(EnableSession = true)]
    public int PAPGuardarEditar(PAP_Estudio obj)
    {
        if (Session["Usuario"] != null)
        {
            usuarios U = new usuarios();
            U = (usuarios)Session["Usuario"];
            obj.usuario = (int)U.id;
            AnatomiaPatologicaTrueBLL a = new AnatomiaPatologicaTrueBLL();
            return a.PAP_Guardar_Editar(obj);
        }
        else throw new Exception("Ha Perdido Sesión!!!");
    }

    [WebMethod(EnableSession = true)]
    public List<PAP_Estudio> buscarPAP(PAP_Estudio pap)
    {
        //if (Session["Usuario"] != null)
        //{
        AnatomiaPatologicaTrueBLL p = new AnatomiaPatologicaTrueBLL();
        return p.buscar_PAP(pap);
        //}
        //else throw new Exception("Ha Perdido Sesión!!!");

    }

    [WebMethod(EnableSession = true)]
    public PAP_Estudio PAPTraerCargaPorId(int id)
    {
        //if (Session["Usuario"] != null)
        //{
        AnatomiaPatologicaTrueBLL p = new AnatomiaPatologicaTrueBLL();
        return p.PAP_Traer_Carga_Por_Id(id);
        //}
        //else throw new Exception("Ha Perdido Sesión!!!");

    }

    [WebMethod(EnableSession = true)]
    public List<PAP_Estudio_Viejo> PAPTraerEstudioViejo(int idPaciente, string nombrePacienteExt, int extInt)
    {
        //if (Session["Usuario"] != null)
        //{
        AnatomiaPatologicaTrueBLL p = new AnatomiaPatologicaTrueBLL();
        return p.PAP_Traer_Estudio_Viejo(idPaciente,nombrePacienteExt,extInt);
        //}
        //else throw new Exception("Ha Perdido Sesión!!!");

    }

    [WebMethod(EnableSession = true)]
    public int PATOBorrar(int protocolo)
    {
        if (Session["Usuario"] != null)
        {
        AnatomiaPatologicaTrueBLL p = new AnatomiaPatologicaTrueBLL();
        return p.PATO_Borrar(protocolo);
        }
        else throw new Exception("Ha Perdido Sesión!!!");
    }

    [WebMethod(EnableSession = true)]
    public int PAPBorrar(int protocolo)
    {
        if (Session["Usuario"] != null)
        {
            AnatomiaPatologicaTrueBLL p = new AnatomiaPatologicaTrueBLL();
            return p.PAP_Borrar(protocolo);
        }
        else throw new Exception("Ha Perdido Sesión!!!");
    }



    [WebMethod(EnableSession = true)]
    public int PapReasignarProtocolo(reasinarProtocolo obj)
    {
        if (Session["Usuario"] != null)
        {
            AnatomiaPatologicaTrueBLL a = new AnatomiaPatologicaTrueBLL();
            return a.Pap_ReasignarProtocolo(obj);
        }
        else throw new Exception("Ha Perdido Sesión!!!");
    }

    [WebMethod(EnableSession = true)]
    public reasinarProtocolo PapTraerPacienteEncabezadoReasignado(int pacienteId)
    {
        if (Session["Usuario"] != null)
        {
            AnatomiaPatologicaTrueBLL a = new AnatomiaPatologicaTrueBLL();
            return a.H2_Pap_Traer_Paciente_Encabezado_Reasignado(pacienteId);
        }
        else throw new Exception("Ha Perdido Sesión!!!");
    }


    [WebMethod(EnableSession = true)]
    public List<reasinarProtocolo> PAPTraerPacienteExterno(string paciente,string nhc, int tipo)
    {
        if (Session["Usuario"] != null)
        {
            AnatomiaPatologicaTrueBLL a = new AnatomiaPatologicaTrueBLL();
            return a.H2_PAP_Traer_Paciente_Externo(paciente,nhc, tipo);
        }
        else throw new Exception("Ha Perdido Sesión!!!");
    }

    [WebMethod]
    public List<busquedaPato> TraerEstudiosPatologiaExternos()
    {
        //if (Session["Usuario"] != null)
        //{
            AnatomiaPatologicaTrueBLL a = new AnatomiaPatologicaTrueBLL();
            return a.Traer_Estudios_Patologia_Externos();
        //}
        //else throw new Exception("Ha Perdido Sesión!!!");
    }

    [WebMethod]
    public int ActualizarSeccionalExternaPatologia(long PAT_ID, string pat_seccional_ext)
    {
        //if (Session["Usuario"] != null)
        //{
            AnatomiaPatologicaTrueBLL a = new AnatomiaPatologicaTrueBLL();
            return a.Actualizar_Seccional_Externa_Patologia(PAT_ID, pat_seccional_ext);
        //}
        //else throw new Exception("Ha Perdido Sesión!!!");
    }
}
