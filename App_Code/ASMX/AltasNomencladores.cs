using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;

/// <summary>
/// Summary description for AltasNomencladores
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class AltasNomencladores : System.Web.Services.WebService {

    public AltasNomencladores () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession = true)]
    public List<listadeconvenios> VerlosConvenios(string Convenio)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();
            return f.VerlosConvenios(Convenio);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    public listadeconvenios Convenio_by_OS(long OS)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();
            return f.Convenio_by_OS(OS);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    public List<Facturacion_RangosPrac> VerRangos()
    {
        if (Session["Usuario"] != null)
        {
            Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();
            return f.VerRangos();
        }
        else return null;
    } 

    [WebMethod(EnableSession = true)]
    public List<Facturacion_RangoConv> VerRangosporConvenio(string ConvenioId, string RangoId, string Nomenclador)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();
            int _convenio,_rango;
            if (!int.TryParse(ConvenioId, out _convenio)) _convenio = 0;
            if (!int.TryParse(RangoId, out _rango)) _rango = 0;
            return f.VerRangosporConvenio(_convenio, _rango, Nomenclador);
        }
        else return null;
    }

     [WebMethod(EnableSession = true)]
    public int Insert_Rango(Facturacion_RangosPrac f)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.FacturacionBLL obj = new Hospital.FacturacionBLL();
            try
            {
                return obj.Fact_Rangos_Practicas_INSERT(f);
            }
            catch {
                throw new Exception("No se Inserto el rango");
            }
        }
        else return -1;
    }

     [WebMethod(EnableSession = true)]
    public void Delete_Rango(int Id)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.FacturacionBLL obj = new Hospital.FacturacionBLL();
            try
            {
                obj.Fact_Rangos_Practicas_Delete(Id);
            }
            catch {
                throw new Exception("No se elimino el rango");
            }
        }
    }

     [WebMethod(EnableSession = true)]
     public void Delete_RangoValoresConv(int IdRango, long ConvenioId,string Nomencladores)
     {
         if (Session["Usuario"] != null)
         {
             Hospital.FacturacionBLL obj = new Hospital.FacturacionBLL();
             try
             {
                 obj.Fact_Rango_Valores_Conv_DELETE(IdRango, ConvenioId, Nomencladores);
             }
             catch
             {
                 throw new Exception("No se elimino el registro");
             }
         }
     }
    
     [WebMethod(EnableSession = true)]
     public void InsertRangoValores(Facturacion_RangoConv f, string Nomenclador)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.FacturacionBLL obj = new Hospital.FacturacionBLL();
            try
            {
                obj.Fact_Rango_Valores_Conv_INSERT(f, Nomenclador);
            }
            catch {
                throw new Exception("No se inserto el valor");
            }
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }
    

   
    [WebMethod(EnableSession = true)]
    public int QuitarConvenios(long ConvenioNro)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();
            return f.QuitarConvenio(ConvenioNro);
        }
        return 0;
    }

    [WebMethod(EnableSession = true)]
    public void GuardarConvenios(long ConvenioNro, string Convenios, string Contacto, string FechaInicio, string FechaFin, string Detalles)
    {
        if (Session["Usuario"] != null)
        {
            DateTime fechaInicio = Convert.ToDateTime(FechaInicio);
            DateTime fechaFin = Convert.ToDateTime(FechaFin);
            Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();
            f.GuardarConvenios(ConvenioNro, Convenios, Contacto, fechaInicio, fechaFin, Detalles, (Int32)((usuarios)(Session["Usuario"])).id);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public void GuardarConveniosSN(long ConvenioNro, string Convenios, string Contacto, string FechaInicio, string FechaFin, string Detalles,
        string RazonSocial, string Direccion_Fact, string CUIT_Fact)
    {
        if (Session["Usuario"] != null)
        {
            DateTime fechaInicio = Convert.ToDateTime(FechaInicio);
            DateTime fechaFin = Convert.ToDateTime(FechaFin);
            Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();
            f.GuardarConveniosSN(ConvenioNro, Convenios, Contacto, fechaInicio, fechaFin, Detalles, (Int32)((usuarios)(Session["Usuario"])).id,RazonSocial,Direccion_Fact,CUIT_Fact);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public List<listaconveniosseccionales> CargarSeccionalesconConvenios(int ConvenioId)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();
            return f.CargarSeccionalesconConvenios(ConvenioId);
        }
        else
            return null;

    }


    [WebMethod(EnableSession = true)]
    public void GuardarRelacionSeccional(long ConvenioNro, long Seccional, bool Activo)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();
            if (!Activo)
            {
                listadeconvenios l = f.ExisteRelacionSeccional_Convenio(Seccional);
                if (l != null)
                {
                    throw new Exception("Existe Una Relacion Con el Convenio " + l.convenios);
                }
                else f.GuardarRelacionSeccional(ConvenioNro, Seccional);
            }
            else {
                f.GuardarRelacionSeccional(ConvenioNro, Seccional);
            }
        }

    }

    [WebMethod(EnableSession = true)]
    public List<listaconveniosprofesionales> CargarProfesionalesconConvenios(int ConvenioId)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();
            return f.CargarProfesionalesconConvenios(ConvenioId);
        }
        else
            return null;

    }



    [WebMethod(EnableSession = true)]
    public List<listaconveniosinstituciones> CargarInstitucionesconConvenios(int ConvenioId)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();
            return f.CargarInstitucionesconConvenios(ConvenioId);
        }
        else
            return null;

    }

    [WebMethod(EnableSession = true)]
    public listadeconvenios ExisteRelacionOS_Convenio(long OS)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();
            return f.ExisteRelacionOS_Convenio(OS);
        }
        else
            return null;

    }

    [WebMethod(EnableSession = true)]
    public listadeconvenios ExisteRelacionSeccional_Convenio(long Seccional)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();
            return f.ExisteRelacionSeccional_Convenio(Seccional);
        }
        else
            return null;

    }


    [WebMethod(EnableSession = true)]
    public void GuardarRelacionInstituciones(long ConvenioNro, long Seccional, bool Activo)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();
            if (!Activo)
            {
                listadeconvenios l = f.ExisteRelacionOS_Convenio(Seccional);
                if (l != null)
                {
                    throw new Exception("Existe Una Relacion Con el Convenio " + l.convenios);
                }
                else f.GuardarRelacionInstitucion(ConvenioNro, Seccional);
            }
            else f.GuardarRelacionInstitucion(ConvenioNro, Seccional);
        }

    }

    [WebMethod(EnableSession = true)]
    public void GuardarRelacionMedicos(long ConvenioNro, long Medico, bool Activo)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();
            if (!Activo)
            {
                listadeconvenios l = f.ExisteRelacionMed_Convenio(Medico);
                if (l != null)
                {
                    throw new Exception("Existe Una Relacion Con el Convenio " + l.convenios);
                }
                else f.GuardarRelacionMedico(ConvenioNro, Medico);
            }
            else f.GuardarRelacionMedico(ConvenioNro, Medico);
        }

    }


    [WebMethod(EnableSession = true)]
    public void Sugerencia_Eliminar(long Codigo)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();
            f.Sugerencia_Eliminar(Codigo, (Int32)((usuarios)Session["Usuario"]).id);
        }

    }


    [WebMethod(EnableSession = true)]
    public void Sugerencia_Guardar(long Codigo, string Descripcion)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();
            f.Sugerencia_Guardar(Codigo, Descripcion);
        }

    }


    [WebMethod(EnableSession = true)]
    public List<listasugerencias> Sugerencia_Listar()
    {
        if (Session["Usuario"] != null)
        {
            Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();
            return f.Sugerencia_Listar();
        }
        else
        {
            return null;
        }


    }




    [WebMethod(EnableSession = true)]
    public List<listasugerencias> Carencias_Listar()
    {
        if (Session["Usuario"] != null)
        {
            Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();
            return f.Carencias_Listar();
        }
        else
        {
            return null;
        }


    }




    [WebMethod(EnableSession = true)]
    public List<listasugerencias> Complejidad_Listar()
    {
        if (Session["Usuario"] != null)
        {
            Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();
            return f.Complejidad_Listar();
        }
        else
        {
            return null;
        }

    }


    [WebMethod(EnableSession = true)]
    public void GuardarFacturacionPracticas(List<listasugerencias> objPracticas, 
             long codigo, 
             string descripcion, 
             long sugerenciasId,
             bool sugerenciasEstado, 
             int complejidadId,
             long carenciaid,
             int topemensual,
             int topeanual,
             bool valorglobal,
             string vnn,
             string vguar,
             string vg,
             string vhono,
             bool ck_sefacturo,
             bool ck_cobrahono
        )
    {
        if (Session["Usuario"] != null)
        {

             decimal dvnn = Convert.ToDecimal(vnn.Replace(".",","));
             decimal dvguar = Convert.ToDecimal(vguar.Replace(".", ","));
             decimal dvg = Convert.ToDecimal(vg.Replace(".", ","));
             decimal dvhono = Convert.ToDecimal(vhono.Replace(".", ","));

            Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();
            f.GuardarFacturacionPracticas(objPracticas, codigo, descripcion, sugerenciasId, sugerenciasEstado, complejidadId, carenciaid, topemensual, topeanual, valorglobal, dvnn, dvguar, dvg, dvhono, ck_sefacturo, ck_cobrahono);
        }
    }

    
    
    [WebMethod(EnableSession = true)]
    public void GuardarValorPracticas(long ConvenioId, int PracticaId, int EspecialidadId, int NomencladorId,
        string vbono, string vaa, string vaci, string vnn, string vg, string vhono)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();
            decimal VBono, VAa, VAci, VNn, VG, VHono;
            if (!decimal.TryParse(vbono.Replace(".", ","), out VBono)) throw new Exception("Valor bono no válido");
            if (!decimal.TryParse(vaa.Replace(".", ","), out VAa)) throw new Exception("Valor a cargo afiliado no válido");
            if (!decimal.TryParse(vaci.Replace(".", ","), out VAci)) throw new Exception("Valor a cargo institución no válido");
            if (!decimal.TryParse(vnn.Replace(".", ","), out VNn)) throw new Exception("Valor nn no válido");
            if (!decimal.TryParse(vg.Replace(".", ","), out VG)) throw new Exception("Valor gasto no válido");
            if (!decimal.TryParse(vhono.Replace(".", ","), out VHono)) throw new Exception("Valor honorario no válido");
            f.Fact_GuardarValorPracticas(ConvenioId,NomencladorId ,PracticaId, EspecialidadId, VBono, VAa, VAci, VNn, VG, VHono, ((usuarios)Session["Usuario"]).id);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");

    }

    [WebMethod(EnableSession = true)]
    public void GuardarValorHonorario(long ConvenioId, int MedicoId, int EspecialidadId, string Vhono, int Codigo)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();

            Vhono = Vhono.Trim(); if (Vhono.Length == 0) Vhono = "0.00";
            decimal vhono = Convert.ToDecimal(Vhono.Replace(".", ","));
            f.GuardarValorHonorario(ConvenioId, MedicoId, EspecialidadId, vhono,Codigo);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public List<FactValorPracticasEspecialidad> Fact_EspecialidadPracticaConvenios(string ConvenioId, string PracticaId, int NomencladorId)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();
            int _PracticaId;
            long _ConvenioId;
            if (!int.TryParse(PracticaId, out _PracticaId)) _PracticaId = 0;
            if (!long.TryParse(ConvenioId, out _ConvenioId)) throw new Exception("Convenio no válido.");
            return f.Facturacion_Practicas_Especialidad_Convenios_Lista(_ConvenioId, _PracticaId, NomencladorId);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public List<FactValorHonoMedicos> Fact_HonoMedicosConvenios(long ConvenioId, string MedicoId)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();
            int _MedicoId;
            if (!string.IsNullOrEmpty(MedicoId)) _MedicoId = int.Parse(MedicoId);
            else _MedicoId = 0;
            return f.Facturacion_MedicosHono_Convenios_Lista(ConvenioId, _MedicoId);
        }
        else
        {
            return null;
        }

    }

    [WebMethod(EnableSession = true)]
    public void QuitarValorPracticasConvenios(long ConvenioId, int PracticaId, int EspecialidadId, int NomencladorId)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();
            f.Fact_QuitarValorPracticas(ConvenioId, PracticaId, EspecialidadId, NomencladorId);
        }
        else throw new Exception("Inicie Sesion Nuevamente.");
    }

    
    [WebMethod(EnableSession = true)]
    public void QuitarHonoMedicosConvenios(long ConvenioId, int MedicoId, int EspecialidadId, long Codigo)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();
            f.Fact_QuitarHonoMedicos(ConvenioId, MedicoId, EspecialidadId,Codigo);
        }        
    }

    [WebMethod(EnableSession = true)]
    public void QuitarValorModulosConvenios(int NomencladorId,long ConvenioId, int ModuloId)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();
            f.Fact_QuitarValorModulos(NomencladorId,ConvenioId, ModuloId);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }
    

    [WebMethod(EnableSession = true)]
    public void ListaModulosConveniosTotal()
    {
        if (Session["Usuario"] != null)
        {
            Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();
            f.ListaModulosConveniosTotal(1,0,0);
        }        
    }

    [WebMethod(EnableSession = true)]
    public List<FactValorModulosConvenio> ListaModulosbyEnc(int EncabezadoId)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();
            return f.ListaModulosbyEnc(EncabezadoId);
        }
        else return null;
    }

    
    
    
    [WebMethod(EnableSession = true)]
    public List<FactModulosDetalles> ListadodeModulosTotal()
    {
        if (Session["Usuario"] != null)
        {
            Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();
            return f.ListadoModulos(0, null);
        }
        return null;
    }
    
    
    [WebMethod(EnableSession = true)]
    public List<FactValorModulosConvenio> Fact_ListadoModulosConvenios(int NomencladorId,long ConvenioId, string Codigo)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();
            int _Codigo;
            if (!int.TryParse(Codigo, out _Codigo)) _Codigo = 0;
            return f.ListaModulosConveniosTotal(NomencladorId,ConvenioId, _Codigo);
        }
        else throw new Exception("Inicie Sesión Nuevamante.");
    }

    //Guarda la valorizacion de un modulo
    [WebMethod(EnableSession = true)]
    public void GuardarValorModulosConvenios(FactValorModulosConvenio modulo)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();
            modulo.UsuarioId = ((usuarios)Session["Usuario"]).id;
            f.GuardarFacturacionModulos(modulo);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }
}
