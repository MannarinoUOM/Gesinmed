using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using System.Web.Script.Serialization;
using Hospital;
/// <summary>
/// Summary description for Facturacion
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class Facturacion : System.Web.Services.WebService {

    public Facturacion () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public long InsertParteCab(Facturacion_Parte_Cab f)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL a = new FacturacionBLL();
            f.UsuarioId = ((usuarios)Session["Usuario"]).id;
            return a.InsertParteCab(f);
        }
        else throw new Exception("Inicie Sesion Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public string FACT_ESTA_FACTURADO_NROREND(long NroParte)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL a = new FacturacionBLL();
            return a.FACT_ESTA_FACTURADO_NROREND(NroParte);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    public void Anular_Rendicion(long NroRendicion)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL a = new FacturacionBLL();
            a.Anular_Rendicion(NroRendicion);
        }
        else throw new Exception("Inicie Sesion Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public void Practica_Eliminar(long Practica, string IsActive)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL a = new FacturacionBLL();
            a.Practica_Eliminar(Practica, IsActive);
        }
        else throw new Exception("Inicie Sesion Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Facturacion_ListNomenclaSN> ListNomencladoresSN()
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL a = new FacturacionBLL();
            return a.ListNomencladoresSN();
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<FacturacionFactura_Cab> VerFacturas(string Desde, string Hasta, string NroPuesto)
    { 
        if (Session["Usuario"] != null)
        {
            DateTime _desde, _hasta;
            if (!DateTime.TryParse(Desde, out _desde)) _desde = DateTime.Now;
            if (!DateTime.TryParse(Hasta, out _hasta)) _hasta = DateTime.Now;
            FacturacionBLL a = new FacturacionBLL();
            return a.VerFacturas(_desde,_hasta,NroPuesto);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<FactModulosDetalles> List_Modulos_SN()
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL a = new FacturacionBLL();
            return a.List_Modulos_SN();
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    public practicaLista Lista_Practicas_Facturacion_por_OS(int Codigo, int Id)
    {

        Hospital.PracticasBLL practicas = new Hospital.PracticasBLL();
        return practicas.Lista_Practicas_Facturacion_por_OS(Codigo,Id);
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<FactModulosDetalles> List_Modulos_SN_por_OS(long OS)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL a = new FacturacionBLL();
            return a.List_Modulos_SN_por_OS(OS);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Facturacion_ListRendicionAmbulatorioSN> ListRendicionAmbulatoriaSN(string Desde, string Hasta, long OS, string DesdeRend, string HastaRend)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL a = new FacturacionBLL();
            long d_rend, h_rend;
            if (!long.TryParse(DesdeRend, out d_rend)) d_rend = 0;
            if (!long.TryParse(HastaRend, out h_rend)) h_rend = 0;
            return a.ListRendicionAmbulatoriaSN(Desde, Hasta, OS, d_rend, h_rend);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public FacturacionTotales ListTotales_by_NroPartes(string lista)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL a = new FacturacionBLL();
            if (!string.IsNullOrEmpty(lista)) return a.ListTotales_by_NroPartes(lista);
            else throw new Exception("Seleccione alguna rendicion.");
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public long InsertParteCabSN(Facturacion_Parte_Cab f)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL a = new FacturacionBLL();
            f.UsuarioId = ((usuarios)Session["Usuario"]).id;
            return a.InsertParteCabSN(f);
        }
        else return -1;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string UpdateCabeceraParteSN(long NroParte, string NroOrdenIntCarpeta,string Observaciones)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL a = new FacturacionBLL();
            a.UpdateCabeceraParteSN(NroParte, NroOrdenIntCarpeta, Observaciones);
            return "Datos Actualizados";
        }
        else throw new Exception("Inicie Sesión Nuevamente");
    }

    

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public long NroInternacionbyNHC(string NHC)
    {
        if (Session["Usuario"] != null)
        {
            long HC;
            FacturacionBLL a = new FacturacionBLL();
            if (long.TryParse(NHC, out HC))
                return a.NroInternacionbyNHC(HC);
            else throw new Exception("Ingrese NHC");
        }
        else return -1;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public long InsertParteDetMedicos(List<Facturacion_Medicos_Det> objPracticas, long NroParte)
    {
        
        if (Session["Usuario"] != null)
        {
            long n = 0;
            objPracticas.ForEach(delegate(Facturacion_Medicos_Det d)
            {
                FacturacionBLL a = new FacturacionBLL();
                d.NroParte = NroParte;
                n = a.Insert_Fact_HonoMedicos_Det(d);
            });
            return n;
        }
        else return -1;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public long InsertParteCabMedicos(Facturacion_Medico_Cab f)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL a = new FacturacionBLL();
            f.UsuarioId = ((usuarios)Session["Usuario"]).id;
            return a.Insert_Fact_HonoMedicos_Cab(f);
        }
        else return -1;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<especialidades> Fac_PracticaEspecialidad_List_by_PracticaId(long CodigoId)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL a = new FacturacionBLL();
            return a.Fac_PracticaEspecialidad_List_by_PracticaId(CodigoId);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public long InsertParteDet(List<Facturacion_Parte_Det> objPracticas, long NroParte,Facturacion_Medicamentos_Cab MedCab ,
        List<Facturacion_Descartables_Det> objDescartables, List<Facturacion_Medicamentos_Det> objMedicamentos, 
        List<Facturacion_Honorarios_Med> objMedicos)
    {
            long mCabId = 0;
            long n = 0;
            n = InsertParteDetalles_List(objPracticas, NroParte); //Inserto Detalles Practicas
            if (objDescartables.Count > 0 || objMedicamentos.Count > 0)
            {
                mCabId = InsertMedicamentosCab(MedCab); //Inserto Cabecera Medicamentos
                InsertDescartablesDet(objDescartables, mCabId); //Inserto Detalles Descartables
                InsertMedicamentosDet(objMedicamentos, mCabId); //Inserto Detalles Medicamentos
            }
            //if (objMedicos.Count > 0) InsertHonorariosMed(objMedicos, NroParte); //Inserto Honorarios de Medicos
            return n;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public long InsertParteDetalles_List(List<Facturacion_Parte_Det> objPracticas, long NroParte)
    {
        long n = 0;
        objPracticas.ForEach(delegate(Facturacion_Parte_Det f)
        {
            FacturacionBLL a = new FacturacionBLL();
            f.NroParte = NroParte;
            n = a.InsertParteDet(f);
        });
        return n;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void InsertHonorariosMed(List<Facturacion_Honorarios_Med> objMedicos, long NroParte)
    {
        if (Session["Usuario"] != null)
        {
            objMedicos.ForEach(delegate(Facturacion_Honorarios_Med f)
            {
                FacturacionBLL a = new FacturacionBLL();
                f.NroParte = NroParte;
                a.InsertHonorariosMed(f);
            });
        }
    }

    //Solo para Capital... Obtiene el valor del honorario del Medico.
    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public FactValorHonoMedicos ValorHonoMedicoporConvenio(int EspecialidadId, int MedicoId, string FechaParte, long Codigo)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL a = new FacturacionBLL();
            return a.ValorHonoMedicoporConvenio(EspecialidadId, MedicoId, DateTime.Parse(FechaParte),Codigo);
        }
        else return null;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public FactValorPracticasEspecialidad ValorPracticaporConvenio(int Seccional, int EspecialidadId, int PracticaId,int NomencladorId)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL a = new FacturacionBLL();
            return a.ValorPracticaporConvenio(Seccional, EspecialidadId, PracticaId, NomencladorId);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public FactValorPracticas BuscarValoresSana_NN(int InstSecc, int Codigo, string Fecha)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL a = new FacturacionBLL();
            return a.BuscarValoresSana_NN(InstSecc, Codigo, Fecha);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public FactValorPracticas BuscarValoresHonorario_NN(int InstSecc, int Codigo, string Fecha)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL a = new FacturacionBLL();
            return a.BuscarValoresHonorario_NN(InstSecc, Codigo, Fecha);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public decimal BuscarValoresHonorario_byTipo(int InstSecc, int Codigo, string Fecha, int Tipo)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL a = new FacturacionBLL();
            return a.BuscarValoresHonorario_byTipo(InstSecc, Codigo, Fecha,Tipo);
        }
        else return 0;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void FACT_COPY_NOMENCLADOR_SN()
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL a = new FacturacionBLL();
            a.FACT_COPY_NOMENCLADOR_SN();
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }
    

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public FactValorPracticasEspecialidad ValorAnteriorPracticaporConvenio(int InstSecc, int EspecialidadId, int PracticaId, string FechaParte)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL a = new FacturacionBLL();
            return a.ValorAnteriorPracticaporConvenio(InstSecc, EspecialidadId, PracticaId, FechaParte);
        }
        else return null;
    }

    [WebMethod]
    [ScriptMethod]
    public FactValorModulosConvenio Fact_Valor_Modulo_Convenio(int NomencladorId, int InstSecc, int ModuloId)
    {
            FacturacionBLL a = new FacturacionBLL();
            return a.Fact_Valor_Modulo_Convenio(NomencladorId,InstSecc, ModuloId);
    }

     [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public FactValorModulosConvenio Fact_ValorAnterior_Modulo_Convenio(int InstSecc, int ModuloId,string FechaParte)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL a = new FacturacionBLL();
            return a.Fact_ValorAnterior_Modulo_Convenio(InstSecc, ModuloId, FechaParte);
        }
        else return null;
    }

     [WebMethod(EnableSession = true)]
     [ScriptMethod]
     public void ActualizarPracticasMasiva(int NomencladorId,long ConvenioId, long EspecialidadId, int CodigoDesde, int CodigoHasta,
         decimal Porcentaje, decimal Valor, int NomencladorBase)
     {
         if (Session["Usuario"] != null)
         {
             FacturacionBLL a = new FacturacionBLL();
             a.ActualizarPracticasMasiva(NomencladorId, ConvenioId, EspecialidadId, CodigoDesde, CodigoHasta, Porcentaje, Valor, ((usuarios)Session["Usuario"]).id,
                 NomencladorBase);
         }
         else throw new Exception("Inicie Sesión Nuevamente.");
     }

     [WebMethod(EnableSession = true)]
     [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
     public void ActualizarModulosMasiva(long ConvenioId, long CodigoDesde, long CodigoHasta, decimal Porcentaje, decimal Valor)
     {
         if (Session["Usuario"] != null)
         {
             FacturacionBLL a = new FacturacionBLL();
             a.ActualizarModulosMasiva(ConvenioId, CodigoDesde, CodigoHasta, Porcentaje, Valor);
         }
     }

     [WebMethod(EnableSession = true)]
     [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
     public List<Facturacion_Buscar_Partes> ListPartesMedicos(string NroParte,string DesdeParte, string HastaParte, string DesdePrac, string HastaPrac, string DesdeRend, string HastaRend, string EspecialidadId, string MedicoId)
     {
         if (Session["Usuario"] != null)
         {
             long Parte;
             int Medico, Especialidad;
             DateTime D_Parte, H_Parte, D_Prac, H_Prac, D_Rend, H_Rend;
             if (!string.IsNullOrEmpty(NroParte)) Parte = Convert.ToInt32(NroParte);
             else Parte = 0;
             if (!string.IsNullOrEmpty(DesdeParte)) D_Parte = DateTime.Parse(DesdeParte);
             else D_Parte = DateTime.MinValue;
             if (!string.IsNullOrEmpty(HastaParte)) H_Parte = DateTime.Parse(HastaParte);
             else H_Parte = DateTime.MinValue;
             if (!string.IsNullOrEmpty(DesdePrac)) D_Prac = DateTime.Parse(DesdePrac);
             else D_Prac = DateTime.MinValue;
             if (!string.IsNullOrEmpty(HastaPrac)) H_Prac = DateTime.Parse(HastaPrac);
             else H_Prac = DateTime.MinValue;
             if (!string.IsNullOrEmpty(DesdeRend)) D_Rend = DateTime.Parse(DesdeRend);
             else D_Rend = DateTime.MinValue;
             if (!string.IsNullOrEmpty(HastaRend)) H_Rend = DateTime.Parse(HastaRend);
             else H_Rend = DateTime.MinValue;
             Medico = Convert.ToInt32(MedicoId);
             Especialidad = Convert.ToInt32(EspecialidadId);
             FacturacionBLL a = new FacturacionBLL();
             return a.ListPartesMedicos(Parte, D_Parte, H_Parte, D_Prac, H_Prac, D_Rend, H_Rend, Especialidad, Medico);
         }
         else return null;
     }

    
    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Facturacion_Buscar_Partes> ListPartes(string NHC, string InstitucionId, string Afiliado, string SeccionalId, string NroParte,
           string DesdeParte, string HastaParte, string DesdePrac, string HastaPrac, string DesdeRend, string HastaRend, string EspecialidadId, string MedicoId)
    {
        if (Session["Usuario"] != null)
        {
            long HC, Parte;
            int Institucion, Seccional, Medico, Especialidad;
            DateTime D_Parte, H_Parte, D_Prac, H_Prac, D_Rend, H_Rend;
            if (!string.IsNullOrEmpty(NHC)) HC = Convert.ToInt64(NHC);
            else HC = 0;
            if (!string.IsNullOrEmpty(InstitucionId)) Institucion = Convert.ToInt32(InstitucionId);
            else Institucion = 0;
            if (!string.IsNullOrEmpty(SeccionalId)) Seccional = Convert.ToInt32(SeccionalId);
            else Seccional = 0;
            if (!string.IsNullOrEmpty(NroParte)) Parte = Convert.ToInt32(NroParte);
            else Parte = 0;
            if (!string.IsNullOrEmpty(DesdeParte)) D_Parte = DateTime.Parse(DesdeParte);
            else D_Parte = DateTime.MinValue;
            if (!string.IsNullOrEmpty(HastaParte)) H_Parte = DateTime.Parse(HastaParte);
            else H_Parte = DateTime.MinValue;
            if (!string.IsNullOrEmpty(DesdePrac)) D_Prac = DateTime.Parse(DesdePrac);
            else D_Prac = DateTime.MinValue;
            if (!string.IsNullOrEmpty(HastaPrac)) H_Prac = DateTime.Parse(HastaPrac);
            else H_Prac = DateTime.MinValue;
            if (!string.IsNullOrEmpty(DesdeRend)) D_Rend = DateTime.Parse(DesdeRend);
            else D_Rend = DateTime.MinValue;
            if (!string.IsNullOrEmpty(HastaRend)) H_Rend = DateTime.Parse(HastaRend);
            else H_Rend = DateTime.MinValue;
            Medico = Convert.ToInt32(MedicoId);
            Especialidad = Convert.ToInt32(EspecialidadId);
            FacturacionBLL a = new FacturacionBLL();
            return a.ListPartes(HC, Institucion, Afiliado, Seccional, Parte, D_Parte, H_Parte, D_Prac, H_Prac, D_Rend, H_Rend, Especialidad, Medico);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Facturacion_Buscar_Partes> ListPartesSN(string NHC, string InstitucionId, string Afiliado, string NroParte,
           string DesdeParte, string HastaParte)
    {
        if (Session["Usuario"] != null)
        {
            long HC, Parte;
            int Institucion;
            DateTime D_Parte, H_Parte;
            if (!string.IsNullOrEmpty(NHC)) HC = Convert.ToInt64(NHC);
            else HC = 0;
            if (!string.IsNullOrEmpty(InstitucionId)) Institucion = Convert.ToInt32(InstitucionId);
            else Institucion = 0;
            if (!string.IsNullOrEmpty(NroParte)) Parte = Convert.ToInt32(NroParte);
            else Parte = 0;
            if (!string.IsNullOrEmpty(DesdeParte)) D_Parte = DateTime.Parse(DesdeParte);
            else D_Parte = DateTime.MinValue;
            if (!string.IsNullOrEmpty(HastaParte)) H_Parte = DateTime.Parse(HastaParte);
            else H_Parte = DateTime.MinValue;
            FacturacionBLL a = new FacturacionBLL();
            return a.ListPartesSN(HC, Institucion, Afiliado, Parte, D_Parte, H_Parte);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public Facturacion_ParteMedicos_Cab ListPartesMedicoCab(int NroParte)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            return f.ListParteCabMedicos(NroParte);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public Facturacion_Parte_Cab ListPartesCab(int NroParte)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            return f.ListParteCab(NroParte);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int EstaProcesadoParte(int NroParte)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            return f.EstaProcesadoParte(NroParte);
        }
        else return 0;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int EstaProcesadoParteMedicos(int NroParte)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            return f.EstaProcesadoParteMedicos(NroParte);
        }
        else return 0;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Facturacion_Medicos_Det> ListPartesDetMedicos(int NroParte)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            return f.ListParteDetMedicos(NroParte);
        }
        else return null;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Facturacion_Parte_Det> ListPartesDet(int NroParte)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            return f.ListParteDet(NroParte);
        }
        else return null;
    }

    /*LABORATORIO: OBTIENE LAS PRACTICAS DE LABORATORIO DEL PACIENTE INTERNADO*/
    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Facturacion_Parte_Det> ListParteDet_Labo(long NroInternacion, long ObraSocial, string Nomenclador)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            return f.ListParteDet_Labo(NroInternacion, ObraSocial, Nomenclador);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void DeleteParteDet(long NroParte)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            f.DeleteParteDetalles(NroParte);
            f.Delete_Descartables_Det(NroParte);
            f.Delete_Medicamentos_Det(NroParte);
            //f.DeleteHonorariosMed(NroParte);
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void DeleteParteDetMedicos(long NroParte)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            f.DeleteParteDetallesMedicos(NroParte);
        }
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public decimal Fact_PrecioMax_Monodroga(int MonodrogaId, int InsumoId)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            return f.Fact_PrecioMax_Monodroga(MonodrogaId,InsumoId);
        }
        return 0;
    }
	
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public long InsertMedicamentosCab(Facturacion_Medicamentos_Cab m)
    {
        FacturacionBLL f = new FacturacionBLL();
        return f.InsertMedicamentosCab(m.NroParte, DateTime.Parse(m.FechaParte), DateTime.Parse(m.FechaRendicion), m.NHC);
    }

    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void InsertMedicamentosDet(List<Facturacion_Medicamentos_Det> objMedicamentos, Int64 NroParte)
    {
            objMedicamentos.ForEach(delegate (Facturacion_Medicamentos_Det m) {
                FacturacionBLL f = new FacturacionBLL();
                m.NroParte = Convert.ToInt64(NroParte);
                f.InsertMedicamentosDet(m);
            });
    }

    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void InsertDescartablesDet(List<Facturacion_Descartables_Det> objDescartables, Int64 NroParte)
    {
            objDescartables.ForEach(delegate(Facturacion_Descartables_Det m)
            {
                FacturacionBLL f = new FacturacionBLL();
                m.NroParte = Convert.ToInt64(NroParte);
                f.InsertDescartablesDet(m);
            });
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public Facturacion_Medicamentos_Cab List_Medicamentos_Cab(long NroParte)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            return f.List_Medicamentos_Cab(NroParte);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Facturacion_Medicamentos_Det> List_Medicamentos_Det(long NroParte)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            return f.List_Medicamentos_Det(NroParte);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Facturacion_Descartables_Det> List_Descartables_Det(long NroParte)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            return f.List_Descartables_Det(NroParte);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Delete_Descartables_Det(long NroParte)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            f.Delete_Descartables_Det(NroParte);
            return 1;
        }
        else return -1;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Delete_Medicamentos_Det(long NroParte)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            f.Delete_Medicamentos_Det(NroParte);
            return 1;
        }
        else return -1;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Baja_Parte(long NroParte)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            return f.ParteBaja(NroParte, ((usuarios)Session["Usuario"]).id);
        }
        else return 0;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Baja_ParteMedicos(long NroParte)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            return f.ParteBajaMedicos(NroParte);
        }
        else return 0;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Facturacion_SeleccionDatos> List_Partes_SeleccionDatos(string NHC, string Afiliado, string SeccionalId, int Estado,
        bool Ambos, bool Internacion, bool Ambulatorio, string DesdeParte, string HastaParte, int Order, int ServicioId)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            long HC;
            int Seccional;
            DateTime DParte, HParte;

            if (!string.IsNullOrEmpty(NHC)) HC = Convert.ToInt64(NHC);
            else HC = 0;
            if (!string.IsNullOrEmpty(SeccionalId)) Seccional = Convert.ToInt32(SeccionalId);
            else Seccional = 0;

            if (!string.IsNullOrEmpty(DesdeParte)) DParte = DateTime.Parse(DesdeParte);
            else DParte = DateTime.MinValue;

            if (!string.IsNullOrEmpty(HastaParte)) HParte = DateTime.Parse(HastaParte);
            else HParte = DateTime.MinValue;

            return f.List_Partes_SeleccionDatos(HC, Afiliado, Seccional, Estado, Ambos, Internacion, Ambulatorio, DParte, HParte, Order, ServicioId);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Facturacion_SeleccionDatos> List_Partes_SeleccionDatosMedicos(string NroParte, string MedicoId,
        string EspecialidadId, int Estado, bool DatosRevalorizar, bool Ambos, bool Internacion, bool Ambulatorio,
        string DesdeParte, string HastaParte, string DesdePractica, string HastaPractica, string DesdeRendicion, string HastaRendicion)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            long Nro_Parte;
            int Medico, Especialidad;
            DateTime DParte, HParte, DPractica, HPractica, DRendicion, HRendicion;
            if (!string.IsNullOrEmpty(NroParte)) Nro_Parte = Convert.ToInt64(NroParte);
            else Nro_Parte = 0;
            if (!string.IsNullOrEmpty(MedicoId)) Medico = Convert.ToInt32(MedicoId);
            else Medico = 0;
            if (!string.IsNullOrEmpty(EspecialidadId)) Especialidad = Convert.ToInt32(EspecialidadId);
            else Especialidad = 0;

            if (!string.IsNullOrEmpty(DesdeParte)) DParte = DateTime.Parse(DesdeParte);
            else DParte = DateTime.MinValue;
            if (!string.IsNullOrEmpty(DesdePractica)) DPractica = DateTime.Parse(DesdePractica);
            else DPractica = DateTime.MinValue;
            if (!string.IsNullOrEmpty(DesdeRendicion)) DRendicion = DateTime.Parse(DesdeRendicion);
            else DRendicion = DateTime.MinValue;

            if (!string.IsNullOrEmpty(HastaParte)) HParte = DateTime.Parse(HastaParte);
            else HParte = DateTime.MinValue;
            if (!string.IsNullOrEmpty(HastaPractica)) HPractica = DateTime.Parse(HastaPractica);
            else HPractica = DateTime.MinValue;
            if (!string.IsNullOrEmpty(HastaRendicion)) HRendicion = DateTime.Parse(HastaRendicion);
            else HRendicion = DateTime.MinValue;

            return f.List_Partes_SeleccionDatosMedicos(Nro_Parte, Medico, Especialidad, Estado, DatosRevalorizar, Ambos, Internacion, Ambulatorio,
                DParte, DRendicion, DPractica, HParte, HPractica, HRendicion);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Facturacion_SeleccionDatos> List_Partes_SeleccionDatosSN(string NroParte,bool Ambos, bool Ambulatorio
        ,string NHC, string Afiliado, string SeccionalId, string InstitucionId, int Estado, string DesdeParte, string HastaParte)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            long Nro_Parte, Institucion, HC;
            int Seccional;
            DateTime DParte, HParte;
            if (!string.IsNullOrEmpty(NroParte)) Nro_Parte = Convert.ToInt64(NroParte);
            else Nro_Parte = 0;

            if (!string.IsNullOrEmpty(NHC)) HC = Convert.ToInt64(NHC);
            else HC = 0;
            if (!string.IsNullOrEmpty(SeccionalId)) Seccional = Convert.ToInt32(SeccionalId);
            else Seccional = 0;
            if (!string.IsNullOrEmpty(InstitucionId)) Institucion = Convert.ToInt64(InstitucionId);
            else Institucion = 0;

            if (!string.IsNullOrEmpty(DesdeParte)) DParte = DateTime.Parse(DesdeParte);
            else DParte = DateTime.MinValue;

            if (!string.IsNullOrEmpty(HastaParte)) HParte = DateTime.Parse(HastaParte);
            else HParte = DateTime.MinValue;

            return f.List_Partes_SeleccionDatosSN(Nro_Parte,Ambos,Ambulatorio, HC, Afiliado, Seccional, Institucion, Estado, DParte, HParte);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Facturacion_ListRendicionInternacionSN> List_RendicionInternacion_SN(string InstitucionId, string DesdeParte, string HastaParte, string DesdeRendicion, string HastaRendicion)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            long Institucion, D_Rend, H_Rend;
            DateTime DParte, HParte;           
            if (!string.IsNullOrEmpty(InstitucionId)) Institucion = Convert.ToInt64(InstitucionId);
            else Institucion = 0;

            if (!string.IsNullOrEmpty(DesdeParte)) DParte = DateTime.Parse(DesdeParte);
            else DParte = DateTime.MinValue;

            if (!string.IsNullOrEmpty(HastaParte)) HParte = DateTime.Parse(HastaParte);
            else HParte = DateTime.MinValue;

            if (!long.TryParse(DesdeRendicion, out D_Rend)) D_Rend = 0;
            if (!long.TryParse(HastaRendicion, out H_Rend)) H_Rend = 0;

            return f.List_RendicionInternacion_SN(Institucion, DParte, HParte,D_Rend,H_Rend);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Facturacion_ListRendicionInternacionSN> List_RendicionAmbulatoria_Monica_SN(string InstitucionId, string DesdeParte, string HastaParte, string DesdeRendicion, string HastaRendicion)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            long Institucion, D_Rend, H_Rend;
            DateTime DParte, HParte;
            if (!string.IsNullOrEmpty(InstitucionId)) Institucion = Convert.ToInt64(InstitucionId);
            else Institucion = 0;

            if (!string.IsNullOrEmpty(DesdeParte)) DParte = DateTime.Parse(DesdeParte);
            else DParte = DateTime.MinValue;

            if (!string.IsNullOrEmpty(HastaParte)) HParte = DateTime.Parse(HastaParte);
            else HParte = DateTime.MinValue;

            if (!long.TryParse(DesdeRendicion, out D_Rend)) D_Rend = 0;
            if (!long.TryParse(HastaRendicion, out H_Rend)) H_Rend = 0;

            return f.List_RendicionAmbulatoria_Monica_SN(Institucion, DParte, HParte, D_Rend, H_Rend);
        }
        else return null;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Facturacion_ListRendicionInternacionSN> List_Rendicion_Facturacion_SN(string InstitucionId, string Periodo, long NHC, int Tipo)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            long Institucion;
            if (!string.IsNullOrEmpty(InstitucionId)) Institucion = Convert.ToInt64(InstitucionId);
            else Institucion = 0;

            if (string.IsNullOrEmpty(Periodo)) throw new Exception("Ingrese Periodo a Facturar");

            return f.List_Rendicion_Facturacion_SN(DateTime.Parse(Periodo),Institucion,NHC,Tipo);
        }
        else throw new Exception("Inicie Sesion Nuevamente");
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Facturacion_ListRendicionInternacionSN> List_HonorariosInternacion_SN(string InstitucionId, string DesdeParte, string HastaParte, string DesdeRendicion, string HastaRendicion)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            long Institucion, D_Rend, H_Rend;
            DateTime DParte, HParte;           
            if (!string.IsNullOrEmpty(InstitucionId)) Institucion = Convert.ToInt64(InstitucionId);
            else Institucion = 0;

            if (!string.IsNullOrEmpty(DesdeParte)) DParte = DateTime.Parse(DesdeParte);
            else DParte = DateTime.MinValue;

            if (!string.IsNullOrEmpty(HastaParte)) HParte = DateTime.Parse(HastaParte);
            else HParte = DateTime.MinValue;

            if (!long.TryParse(DesdeRendicion, out D_Rend)) D_Rend = 0;
            if (!long.TryParse(HastaRendicion, out H_Rend)) H_Rend = 0;

            return f.List_HonorariosInternacion_SN(Institucion, DParte, HParte, D_Rend, H_Rend);
        }
        else return null;
    }
    


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void InsertSeleccionDatos(List<Facturacion_SelectDatos_Table> Obj)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            Obj.ForEach(delegate(Facturacion_SelectDatos_Table s) {
                f.InsertSeleccionDatos(s);
            });
            
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void InsertSeleccionDatosMedicos(List<Facturacion_SelectDatos_Table> Obj)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            Obj.ForEach(delegate(Facturacion_SelectDatos_Table s)
            {
                f.InsertSeleccionDatosMedicos(s);
            });

        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void InsertSeleccionDatosSN(List<Facturacion_SelectDatos_Table> Obj)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            Obj.ForEach(delegate(Facturacion_SelectDatos_Table s)
            {
                List<Facturacion_Descartables_Det> Desc = f.List_Descartables_Det(s.NroParte);
                List<Facturacion_Medicamentos_Det> Medic = f.List_Medicamentos_Det(s.NroParte);
                List<Facturacion_Parte_Det> Detalles = f.ListParteDet((int)s.NroParte);
                f.InsertSeleccionDatosSN(s,Desc,Medic,Detalles);
            });

        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public void RevalorizarParte(List<Facturacion_SelectDatos_Table> Obj)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            Obj.ForEach(delegate(Facturacion_SelectDatos_Table s)
            {
                f.RevalorizarParte(s);
            });
            
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void RevalorizarParteSN(List<Facturacion_SelectDatos_Table> Obj)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            Obj.ForEach(delegate(Facturacion_SelectDatos_Table s)
            {
                f.RevalorizarParteSN(s);
            });

        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void UpdateFechaRendicion(List<Facturacion_SelectDatos_Table> Obj,string Fecha)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            Obj.ForEach(delegate(Facturacion_SelectDatos_Table s) {
                f.UpdateFechaRendicion(s.NroParte, s.Codigo ,  DateTime.Parse(Fecha));
            });
            
        }
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Facturacion_PreFacturacion> ListPreFacturacion(bool Ambulatorio, bool PorPractica, string Fecha, bool Internacion,string Seccionales)
    {
            FacturacionBLL f = new FacturacionBLL();
            DateTime Fe;
            if (!string.IsNullOrEmpty(Fecha)) Fe = DateTime.Parse(Fecha);
            else Fe = DateTime.MinValue;
            return f.List_PreFacturacion(Ambulatorio, PorPractica, Fe,Internacion,Seccionales,string.Empty);
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Facturacion_PreFacturacion> ListPreFacturacionMedicos(bool Ambulatorio, bool PorPractica, string Fecha, bool Internacion, string Medicos)
    {
        FacturacionBLL f = new FacturacionBLL();
        DateTime Fe;
        if (!string.IsNullOrEmpty(Fecha)) Fe = DateTime.Parse(Fecha);
        else Fe = DateTime.MinValue;
        return f.List_PreFacturacionMedicos(Ambulatorio, PorPractica, Fe, Internacion,Medicos);
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Facturacion_PreFacturacion> List_PreFacturacionSN(bool Ambulatorio, bool PorPractica, string Fecha, bool Internacion, string Seccionales, string Instituciones)
    {
        FacturacionBLL f = new FacturacionBLL();
        DateTime Fe;
        if (!string.IsNullOrEmpty(Fecha)) Fe = DateTime.Parse(Fecha);
        else Fe = DateTime.MinValue;
        return f.List_PreFacturacionSN(Ambulatorio, PorPractica, Fe, Internacion, Seccionales, Instituciones);
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void FacturarPartes(List<Facturacion_Parte_Det> list, long NroRendicion, string FechaFacturacion, string Observacion)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            list.ForEach(delegate(Facturacion_Parte_Det det)
            {
                f.FacturarPartes(det, NroRendicion, ((usuarios)Session["Usuario"]).id, DateTime.Parse(FechaFacturacion), Observacion);
            });
        }
        else throw new Exception("Inicie Sesion Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void FacturarPartesMedicos(List<Facturacion_Parte_Det> list, long NroRendicion, string FechaFacturacion, string Observacion)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            list.ForEach(delegate(Facturacion_Parte_Det det)
            {
                f.FacturarPartesMedicos(det, NroRendicion, ((usuarios)Session["Usuario"]).id, DateTime.Parse(FechaFacturacion), Observacion);
            });
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public long UltimaRendicion()
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            return f.UltimaRendicion();
        }
        else return -1;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public long UltimaRendicionMedicos()
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            return f.UltimaRendicionMedicos();
        }
        else return -1;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<farmacia> ListInsumosDescartables()
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            return f.ListInsumosDescartables();
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public long GetNroParte()
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            return f.GetNroParte();
        }
        else return -1;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Facturacion_Rendiciones> List_Rendiciones(string NroRendicion, long SeccionalId, bool Ambulatorio, bool Internacion, string FechaDesde, string FechaHasta)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            long Nro_Rendicion;
            if (Int64.TryParse(NroRendicion, out Nro_Rendicion)) Nro_Rendicion = Convert.ToInt64(NroRendicion);
            else Nro_Rendicion = 0;

            DateTime FechaD, FechaH;
            if (!string.IsNullOrEmpty(FechaDesde)) FechaD = DateTime.Parse(FechaDesde);
            else FechaD = DateTime.MinValue;
            if (!string.IsNullOrEmpty(FechaHasta)) FechaH = DateTime.Parse(FechaHasta);
            else FechaH = DateTime.MinValue;
            return f.List_Rendiciones(Nro_Rendicion, SeccionalId, Ambulatorio, Internacion, FechaD, FechaH);
        }
        else throw new Exception("Inicie Sesion Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Facturacion_Rendiciones> List_RendicionesMedicos(string NroRendicion, long MedicoId, bool Ambulatorio, bool Internacion, string FechaDesde, string FechaHasta)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            long Nro_Rendicion;
            if (Int64.TryParse(NroRendicion, out Nro_Rendicion)) Nro_Rendicion = Convert.ToInt64(NroRendicion);
            else Nro_Rendicion = 0;

            DateTime FechaD, FechaH;
            if (!string.IsNullOrEmpty(FechaDesde)) FechaD = DateTime.Parse(FechaDesde);
            else FechaD = DateTime.MinValue;
            if (!string.IsNullOrEmpty(FechaHasta)) FechaH = DateTime.Parse(FechaHasta);
            else FechaH = DateTime.MinValue;
            return f.List_RendicionesMedicos(Nro_Rendicion, MedicoId, Ambulatorio, Internacion, FechaD, FechaH);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Facturacion_PreFacturacion> List_Partes_Facturados(long NroRendicion)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            return f.List_Partes_Facturados(NroRendicion);
        }
        else throw new Exception("Inicie Sesion Nuevamente.");
    }
    
    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Facturacion_PreFacturacion> List_Partes_FacturadosMedicos(long NroRendicion)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            return f.List_Partes_FacturadosMedicos(NroRendicion);
        }
        else return null;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Facturacion_PracticasFaltantes> List_PracticasFaltantes(long Seccional, long Institucion, bool Practica, string FechaDesde, string FechaHasta)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            DateTime FDesde, FHasta;
            if (DateTime.TryParse(FechaDesde, out FDesde)) FDesde = DateTime.Parse(FechaDesde);
            else FDesde = DateTime.MinValue;
            if (DateTime.TryParse(FechaHasta, out FHasta)) FHasta = DateTime.Parse(FechaHasta);
            else FHasta = DateTime.MinValue;
            return f.List_PracticasFaltantes(Seccional, Institucion, Practica, FDesde, FHasta);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public long PresupuestoInsertCab(Facturacion_Presupuesto_Cab o)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            o.UsuarioId = ((usuarios)Session["Usuario"]).id;
            return f.PresupuestoInsertCab(o);
        }
        else return -1;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void PresupuestoInsertDet(List<Facturacion_Presupuesto_Det> List, long PresupuestoId)
    {
        if (Session["Usuario"] != null)
        {
            List.ForEach(delegate(Facturacion_Presupuesto_Det det)
            {
                FacturacionBLL f = new FacturacionBLL();
                det.Presupuesto_Id = PresupuestoId;
                f.PresupuestoInsertDet(det);
            });
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Facturacion_Presupuesto_Cab> List_Presupuesto_Cab(string Nro_Presupuesto, long SeccionalId, long Institucion, string FechaDesde, string FechaHasta)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            long NroPresupuesto;
            if (Int64.TryParse(Nro_Presupuesto, out NroPresupuesto)) NroPresupuesto = Convert.ToInt64(Nro_Presupuesto);
            else NroPresupuesto = 0;

            DateTime FechaD, FechaH;
            if (!string.IsNullOrEmpty(FechaDesde)) FechaD = DateTime.Parse(FechaDesde);
            else FechaD = DateTime.MinValue;
            if (!string.IsNullOrEmpty(FechaHasta)) FechaH = DateTime.Parse(FechaHasta);
            else FechaH = DateTime.MinValue;
            return f.List_Presupuesto_Cab(NroPresupuesto, SeccionalId, Institucion, FechaD, FechaH);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public Facturacion_Presupuesto_Cab List_Cabecera_byId(string Nro_Presupuesto)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            long NroPresupuesto;
            if (Int64.TryParse(Nro_Presupuesto, out NroPresupuesto)) NroPresupuesto = Convert.ToInt64(Nro_Presupuesto);
            else NroPresupuesto = 0;
            return f.List_Cabecera_byId(NroPresupuesto);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Facturacion_Presupuesto_Det> List_Detalles_byId(string Nro_Presupuesto)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            long NroPresupuesto;
            if (Int64.TryParse(Nro_Presupuesto, out NroPresupuesto)) NroPresupuesto = Convert.ToInt64(Nro_Presupuesto);
            else NroPresupuesto = 0;
            return f.List_Detalles_byId(NroPresupuesto);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Facturacion_ModulosEnc> ListModulosEnc()
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            return f.ListModulosEnc();
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public registro_internacion List_Fact_Internacion_by_Id(string Id, long NHC)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            if (!string.IsNullOrEmpty(Id))
                return f.List_Fact_Internacion_by_Id(Convert.ToInt64(Id),NHC);
            else return null;
        }
        else return null;
    }

     [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Facturacion_Honorarios_Med> List_Fact_MedicosHono_by_Parte(long NroParte)
    {
        if (Session["Usuario"] != null)
        {
            FacturacionBLL f = new FacturacionBLL();
            return f.List_Fact_MedicosHono_by_Parte(NroParte);
        }
        else return null;
    }

     [WebMethod(EnableSession = true)]
     [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
     public List<Facturacion_GenerarHono_List> GenerarHono_List(string Desde, string Hasta)
     {
         if (Session["Usuario"] != null)
         {
             FacturacionBLL f = new FacturacionBLL();
             return f.GenerarHono_List(Desde,Hasta);
         }
         else return null;
     }

     [WebMethod(EnableSession = true)]
     [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
     public void Insert_Fact_HonoMedicos_NroOrdenInt(int NroParte, string NroOrdenInt)
     {
         if (Session["Usuario"] != null)
         {
            FacturacionBLL f = new FacturacionBLL();
            f.Insert_Fact_HonoMedicos_NroOrdenInt(NroParte, NroOrdenInt);
         }
     }

     [WebMethod(EnableSession = true)]
     [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
     public long EmiteFacturaInsertSN(Facturacion_EmiteFactura f)
     {
         if (Session["Usuario"] != null)
         {
             FacturacionBLL a = new FacturacionBLL();
             f.UsuarioId = ((usuarios)Session["Usuario"]).id;
             return a.EmiteFacturaInsertSN(f);
         }
         else return -1;
     }

     [WebMethod(EnableSession = true)]
     [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
     public List<FacturacionPuesto> ListPuestos()
     {
         if (Session["Usuario"] != null)
         {
             FacturacionBLL a = new FacturacionBLL();
             return a.ListPuestos();
         }
         else throw new Exception("Inicie Sesión Nuevamente.");
     }

     [WebMethod]
     [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
     public string GET_NROFACTURA_PUESTO(string NroPuesto)
     {
             FacturacionBLL a = new FacturacionBLL();
             if (!string.IsNullOrEmpty(NroPuesto)) return a.FACT_GET_NROFACTURA_PUESTO(NroPuesto);
             else throw new Exception("Ingrese Puesto de Facturacion");
     }

     [WebMethod(EnableSession=true)]
     [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
     public string FACT_FACTURA_INSERT_CAB(FacturacionFactura_Cab Cab)
     {
         if (Session["Usuario"] != null)
         {
             Cab.UsuarioId = ((usuarios)Session["Usuario"]).id;
             FacturacionBLL a = new FacturacionBLL();
             return a.FACT_FACTURA_INSERT_CAB(Cab);
         }
         else throw new Exception("Inicie Sesion Nuevamente.");
     }

     [WebMethod]
     [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
     public void FACT_FACTURA_INSERT_DET(string Partes, string NroFactura)
     {
         List<FacturacionFactura_Det> Det = new List<FacturacionFactura_Det>();
         FacturacionBLL b = new FacturacionBLL();
         Det = b.SplitPartes(Partes);
         Det.ForEach(delegate (FacturacionFactura_Det f)
         {
             FacturacionBLL a = new FacturacionBLL();
             string [] arr = NroFactura.Split('-');
             f.NroPuesto = arr[0];
             f.NroFactura = arr[1];
             a.FACT_FACTURA_INSERT_DET(f);
         });    
     }

     [WebMethod]
     [ScriptMethod]
     public List<Facturacion_Nomenclador> FACT_NOMENCLA_LIST(bool Todos, int ConvenioId)
     {
             FacturacionBLL a = new FacturacionBLL();
             return a.FACT_NOMENCLA_LIST(Todos, ConvenioId);
     }

     [WebMethod(EnableSession=true)]
     [ScriptMethod]
     public int FACT_NOMENCLA_INSERT(Facturacion_Nomenclador nomencla)
     {
         if (Session["Usuario"] != null)
         {
             nomencla.FACT_USUARIO_ID = ((usuarios)Session["Usuario"]).id;
             FacturacionBLL a = new FacturacionBLL();
             return a.FACT_NOMENCLA_INSERT(nomencla);
         }
         else throw new Exception("Inicie Sesion");
     }


     [WebMethod]
     [ScriptMethod]
     public string FACT_REPORTES_RENDICION_SEC_FECHA(int Seccional, string Desde, string Hasta)
     {
             FacturacionBLL a = new FacturacionBLL();
             return a.FACT_REPORTES_RENDICION_SEC_FECHA(Seccional, Desde, Hasta);
     }
    
}

