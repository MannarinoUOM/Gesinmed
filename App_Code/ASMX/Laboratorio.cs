using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using System.Web.Script.Serialization;

/// <summary>
/// Summary description for Laboratorio
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class Laboratorio : System.Web.Services.WebService {

    public Laboratorio () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }



    [WebMethod(EnableSession = true)]
    public practicaLista SubPracticas_Listar(int Cod)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.LaboratorioBLL Laboratorio = new Hospital.LaboratorioBLL();
            return Laboratorio.Lista_SubPracticas(Cod);
        }
        else
        {
            return null;
        }
    }


    [WebMethod(EnableSession = true)]
    public practicaLista Practicas_Listar()
    {
        if (Session["Usuario"] != null)
        {
            Hospital.LaboratorioBLL Laboratorio = new Hospital.LaboratorioBLL();
            return Laboratorio.Lista_Practicas_Todas();
        }
        else
        {
            return null;
        }
    }


    [WebMethod(EnableSession = true)]
    public List<FactPracticasDetalles> Practicas_Listar_Facturacion(string Practica, int? Codigo)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.PracticasBLL Practicas = new Hospital.PracticasBLL();
            return Practicas.Practica_Listar_Facturacion(Practica, Codigo);
        }
        else
        {
            return null;
        }
    }


    [WebMethod(EnableSession = true)]
    public int Practicas_Guardar(string Practica, int Codigo, string FE, string FG, int Id, int Estado)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.PracticasBLL Practicas = new Hospital.PracticasBLL();
            decimal PrecioE = Convert.ToDecimal(FE.Replace(".", ","));
            decimal PrecioG = Convert.ToDecimal(FG.Replace(".", ","));

            return Practicas.Practica_Guardar(Id, Practica, Codigo, PrecioE, ((usuarios)(Context.Session["Usuario"])).usuario, PrecioG, Estado);
        }
        else
        {
            return 0;
        }
    }

    [WebMethod(EnableSession = true)]
    public void Practica_Nueva(int Codigo, string Practica, string FE, string FG)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.PracticasBLL Practicas = new Hospital.PracticasBLL();
            decimal PrecioE = Convert.ToDecimal(FE.Replace(".", ","));
            decimal PrecioG = Convert.ToDecimal(FG.Replace(".", ","));
            Practicas.Practica_Nueva(Practica, Codigo, PrecioE, PrecioG, ((usuarios)(Context.Session["Usuario"])).usuario);
        }
    }

    [WebMethod(EnableSession = true)]
    public List<listarEspecialidadPracticarelacion> Practicas_Listar_Facturacion_PracticaEspecialidad(long PracticaId)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();
            return f.ListadePracticasyEspecialidades(PracticaId);
        }
        else
        {
            return null;
        }
    }

    [WebMethod]
    public List<pacientes> Cargar_Paciente_Bono(string Bono)
    {
        try
        {
            long nroBono = Convert.ToInt64(Bono);
            Hospital.LaboratorioBLL pacientes = new Hospital.LaboratorioBLL();
            return pacientes.Cargar_Paciente_Bono(nroBono);
        }
        catch (Exception e)
        {
            return null;
        }

    }

    [WebMethod(EnableSession = true)]
    public string GuardarLaboratorio(List<laboratoriopracticas> objPracticas, string TipoOrden, string FechaPrescripcion, string FUM, string Diagnostico1, string Diagnostico2, string FechaAEntregar, int MedicoId, string Observacion, long NroBono)
    {
        Hospital.BonosBLL B = new Hospital.BonosBLL();
        bono_estado_usado E = B.EstadodelBono(NroBono);
        if (E.id == null) { throw new Exception("Atención. El Bono ingresado No es un Bono Valido"); }
        if (E.id != null && E.usado) {throw new Exception("Atención. El Bono ya ha sido utilizado");}

        if (objPracticas.Count <= 0) { throw new Exception("Atención. NO se puede generar un comprobante de Laboratrio sin prácticas"); }

        bool Existe = false;
        foreach (laboratoriopracticas o in objPracticas)
        {
            if (o.Estado != 0) { Existe = true; }
        }

        if (Existe == false) { throw new Exception("Atención. NO se puede vender un bono sin prácticas"); }
        Int32 Usuario = (Int32)((usuarios)HttpContext.Current.Session["Usuario"]).id;

        object Turno = "";
        DateTime FechadelTurno = DateTime.Now;

        JavaScriptSerializer ser = new JavaScriptSerializer();
        Hospital.LaboratorioBLL Labo = new Hospital.LaboratorioBLL();
        string Guardado = Labo.GuardarLaboratorio(objPracticas, MedicoId, TipoOrden, FechaPrescripcion, FUM, Diagnostico1, Diagnostico2, FechaAEntregar, Usuario, Observacion, NroBono);
        return Guardado;
    //FechaAEntregar    
    }



    [WebMethod(EnableSession = true)]
    public string GuardarLaboratorioInternacion(List<laboratoriopracticas> objPracticas, string TipoOrden, string FechaPrescripcion, string FUM, string Diagnostico1, string Diagnostico2, string FechaAEntregar, int MedicoId, string Observacion, string Servicio, string Sala, string Cama, long Documento, string NroBono)
    {
        if (objPracticas.Count <= 0) { throw new Exception("Atención. NO se puede generar un comprobante de Laboratrio sin prácticas"); }

        bool Existe = false;
        foreach (laboratoriopracticas o in objPracticas)
        {
            if (o.Estado != 0) { Existe = true; }
        }

        if (Existe == false) { throw new Exception("Atención. NO se puede vender un bono sin prácticas"); }
        Int32 Usuario = (Int32)((usuarios)HttpContext.Current.Session["Usuario"]).id;

        object Turno = "";
        DateTime FechadelTurno = DateTime.Now;

        JavaScriptSerializer ser = new JavaScriptSerializer();
        Hospital.LaboratorioBLL Labo = new Hospital.LaboratorioBLL();
        string Guardado = Labo.GuardarLaboratorioInternacion(objPracticas, MedicoId, TipoOrden, FechaPrescripcion, FUM, Diagnostico1, Diagnostico2, FechaAEntregar, Usuario, Observacion, Servicio, Sala, Cama, Documento, NroBono);
        return Guardado;
        //FechaAEntregar    
    }

    
    [WebMethod(EnableSession = true)]
    public List<laboratorioBuscar> ProtocoloBuscar(string Protocolo, string TipoOrden, string CodPaciente, string Apellido, string Desde, string Hasta)
    {
        Hospital.LaboratorioBLL labo = new Hospital.LaboratorioBLL();
        if (Protocolo == "") Protocolo = "0";
        if (CodPaciente == "") CodPaciente = "0";
        return labo.BuscarProtocolo(Convert.ToInt64(Protocolo), TipoOrden, Convert.ToInt64(CodPaciente), Apellido, Desde, Hasta);
    }


    [WebMethod(EnableSession = true)]
    public LaboratorioPreparacion PreparacionLabo(string Codigo)
    {
        Hospital.LaboratorioBLL labo = new Hospital.LaboratorioBLL();
        return labo.PreparacionLabo(Convert.ToInt64(Codigo));
    }


    

}
