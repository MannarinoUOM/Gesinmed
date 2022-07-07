using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for internacion
/// </summary>
public class internacion
{
	public internacion()
	{
		//
		// TODO: Add constructor logic here
		//
	}
}

public class int_ingreso
{
    public long id { get; set; }
    public long AfiliadoId { get; set; }
    public DateTime fecha { get; set; }
    public string dia { get; set; }
    public string hora { get; set; }
    public int servicioId { get; set; }
    public int salaId { get; set; }
    public int CamaId { get; set; }
    public string telefono { get; set; }
    public string direccion_acompa { get; set; }
    public string diagnostico { get; set; }
    public int hospitalizadopor { get; set; }
    public int motivoingreso { get; set; }
    public string observaciones { get; set; }
    public int especialidad { get; set; }
    public int medico { get; set; }
    public long NHC { get; set; }
    public string servicio { get; set; }
    public string sala { get; set; }
    public string cama { get; set; }
}

public class int_egreso
{
    public string diagnosticoicd10 { get; set; }
    public string diagnosticoicd10_desc { get; set; }
    
    public string detalleicd10 { get; set; }
    public string detalleicd10_desc { get; set; }

    public string detalleicd10_3 { get; set; }
    public string detalleicd10_3desc { get; set; }

    public int motivoegreso  { get; set; }
    public string observacionegreso  { get; set; }
    public string operado { get; set; }
    public string fechaoperado { get; set; }
    public int egresoespecialidad { get; set; }
    public int egresomedico { get; set; }
    public bool egresocancelado { get; set; }
    public DateTime fechaegreso { get; set; }
    public long NHC { get; set; }
    public long AfiliadoId { get; set; }
    public string Paciente { get; set; }
    public int Edad { get; set; }
    public long DNI { get; set; }
    public string Seccional { get; set; }
    public string Telefono { get; set; }
    public DateTime fecha { get; set; }
    public string dia { get; set; }
    public string hora { get; set; }
    public string servicio { get; set; }
    public string sala { get; set; }
    public string cama { get; set; }
    public string bclas { get; set; }
    public string EgresoUsuario { get; set; }
    public DateTime fechaIngreso { get; set; }//manuel
    public string diaIngreso { get; set; }//manuel
    public string horaIngreso { get; set; }//manuel
    public string foto { get; set; }
    public int debeControl { get; set; }
    public int idEntrega {get; set;}
}

public class DiagnosticoICD10Detalle
{
    public string Codigo { get; set; }
    public string Descripcion { get; set; }
}

public class intresumen
{
    public string cama { get; set; }
    public string sala { get; set; }
    public string servicio { get; set; }
    public string fechaingreso { get; set; }
    public string fechaegreso { get; set; }
}

public class buscarinternacion
{
    public int Id { get; set; }
    public string Fecha { get; set; }
    public string Servicio { get; set; }
    public string Sala { get; set; }
    public string Cama { get; set; }
    public string Paciente { get; set; }
    public string NHC { get; set; }
    public int CamaId { get; set; }    

}

public class estado_aislado
{
    public string Estado { get; set; }
    public string Clase { get; set; }
    public string Usuario { get; set; }
    public string Fecha { get; set; }
    public string Motivo { get; set; }
}

public class CamaToPrint
{
    public int CamaId { get; set; }
    public string CamaDescripcion { get; set; }
    public string Fecha { get; set; }
    public string Diagnostico { get; set; }
    public string NroHC { get; set; }
    public string NombreYApellido { get; set; }
    public string SeccionalDescripcion { get; set; }
    public string EspecialidadDescripcion { get; set; }
    public string Estado { get; set; }
    public string OS { get; set; }
    public string Hora { get; set; }
    public string Dias { get; set; }
    public string Edad { get; set; }
    public string Sexo { get; set; }

    public CamaToPrint(int CamaId, string CamaDescripcion)
    {
        this.CamaId = CamaId;
        this.CamaDescripcion = CamaDescripcion;
    }
}

public class CensoToPrint
{
    public List<ServicioToPrint> Servicios { get; set; }

    public CensoToPrint()
    {
        Servicios = new List<ServicioToPrint>();
    }
}

public class ServicioToPrint
{
    public int ServicioId { get; set; }
    public string ServicioDescripcion { get; set; }
    public List<SalaToPrint> Salas { get; set; }

    public ServicioToPrint(int ServicioId, string ServicioDescripcion)
    {
        Salas = new List<SalaToPrint>();
        this.ServicioId = ServicioId;
        this.ServicioDescripcion = ServicioDescripcion;
    }
}

public class SalaToPrint
{
    public int SalaId { get; set; }
    public string SalaDescripcion { get; set; }
    public List<CamaToPrint> Camas { get; set; }

    public SalaToPrint(int SalaId, string SalaDescripcion)
    {
        Camas = new List<CamaToPrint>();
        this.SalaId = SalaId;
        this.SalaDescripcion = SalaDescripcion;
    }


    public int TotalDeCamas
    {
        get { return Camas.Count; }
    }

    public int Ocupadas
    {
        get
        {
            int count = 0;
            foreach (CamaToPrint c in Camas)
            {
                if (c.Estado != "Libre")
                    count++;
            }
            return count;
        }
    }

    public int Libres
    {
        get
        {
            int count = 0;
            foreach (var c in Camas)
            {
                if (c.Estado == "Libre")
                    count++;
            }
            return count;
        }
    }

    public double OcupadasPorcentaje
    {
        get
        {
            if (Ocupadas + Libres == 0)
                return 0;
            return Ocupadas * 100 / (Ocupadas + Libres);
        }
    }

    public double LibresPorcentaje
    {
        get
        {
            if (Ocupadas + Libres == 0)
                return 0;
            return Libres * 100 / (Ocupadas + Libres);
        }
    }

    public int DiasInternado { get; set; }

}

public class at_internaciones_cultivo
{
    public string Cultivo_Codigo { get; set; }
    public string Cultivo_Descripcion { get; set; }

    public at_internaciones_cultivo(string _Cultivo_Codigo, string _Cultivo_Descripcion)
    {
        Cultivo_Codigo = _Cultivo_Codigo;
        Cultivo_Descripcion = _Cultivo_Descripcion;
    }
}

public class at_internaciones_germen
{
    public string Germen_Codigo { get; set; }
    public string Germen_Descripcion { get; set; }

    public at_internaciones_germen(string _Germen_Codigo, string _Germen_Descripcion)
    {
        Germen_Codigo = _Germen_Codigo;
        Germen_Descripcion = _Germen_Descripcion;
    }
}

public class at_internaciones_isq
{
    public string ISQ_Codigo { get; set; }
    public string ISQ_Descripcion { get; set; }

    public at_internaciones_isq(string _ISQ_Codigo, string _ISQ_Descripcion)
    {
        ISQ_Codigo = _ISQ_Codigo;
        ISQ_Descripcion = _ISQ_Descripcion;
    }
}

public class at_internaciones_buscar
{
    public string Sala { get; set; }
    public string Cama { get; set; }
    public long NHC { get; set; }
    public string Afiliado { get; set; }
    public string FIngreso { get; set; }
    public string Diagnostico { get; set; }
    public int SalaId { get; set; }
    public int CamaId { get; set; }
    public int ServicioId { get; set; }
    public long internacion { get; set; }
    public string NHC_UOM { get; set; }
    public string Seccional { get; set; }
    public string Servicio { get; set; }
}

public class at_internados_infrahosp : at_internaciones_buscar
{
    public string Germen { get; set; }
    public string Cultivo { get; set; }
    public string ISQ { get; set; }
    public bool Infeccion { get; set; }
    public bool Estado { get; set; }
    public string Antibiotico { get; set; }
    public int Dias { get; set; }
    public string FEgreso { get; set; }
}


public class evolucion
{
    public string fecha { get; set; }
    public string hh { get; set; }
    public string ff { get; set; }
    public int medicoid { get; set; }
    public string medico { get; set; }
    public string evoluciones { get; set; }
    public long internacionid { get; set; }
    public long NHC { get; set; }
    public int camaid { get; set; }
    public string cama { get; set; }
    public int salaid { get; set; }
    public string sala { get; set; }
    public long EId { get; set; }
    public int especialidadId { get; set; }
    public string especialidad { get; set; }
    public bool Editable { get; set; }
    public evolucionEspecialista evoEspecialista { get; set; }
}

public class BusquedaInternadosId
{
    public string fecha { get; set; }
    public string medico { get; set; }
    public int medicoid { get; set; }
    public int dni { get; set; }
    public long NHC { get; set; }
    public int camaid { get; set; }
    public string cama { get; set; }
    public int salaid { get; set; }
    public string sala { get; set; }
    public string paciente { get; set; }
    public long servicioid { get; set; }
    public string servicio { get; set; }
    public string foto { get; set; }
}

public class EpicrisisDatosCargado
{
    public string NHC { get; set; }
    public string internacionId { get; set; }
    public string ingreso_DX { get; set; }
    public string ingreso_Detalle { get; set; }
    public string ingreso_Ant1 { get; set; }
    public string ingreso_Ant2 { get; set; }
    public string ingreso_Ant3 { get; set; }
    public string ingreso_Ant4 { get; set; }
    public string ingreso_Ant5 { get; set; }
    public string ingreso_Ant6 { get; set; }
    public string ingreso_Ant7 { get; set; }
    public string ingreso_Ant8 { get; set; }
    public string ingreso_Ant9 { get; set; }
    public string ingreso_Ant10 { get; set; }
    public string ingreso_motivo { get; set; }
    public string ingreso_ant_personales { get; set; }
    public string ingreso_int_actual { get; set; }
    public string laboratorio { get; set; }
    public string imagen { get; set; }
    public string otros { get; set; }
    public string diagnostico { get; set; }
    public int motivo_alta { get; set; }
    public string egreso_indicacion { get; set; }
    public string fecha_concurrir { get; set; }
    public string egreso_compilacion { get; set; }
    public string egreso_dx { get; set; }
    public string egreso_detalle { get; set; }
    public string egreso_detalle3 { get; set; }
    public int MedicoId { get; set; }
    public int EspecialidadId { get; set; }
    public string fecha_ingreso { get; set; }
    public string fecha_egreso { get; set; }

    public string egreso_dx_desc { get; set; }
    public string egreso_detalle_desc { get; set; }
    public string egreso_detalle3_desc { get; set; }
}

public class IQB_HC_INGRESO
{
    public long HC_IQB_ID { get; set; }
    public long HC_IQB_NHC { get; set; }
    public long HC_IQB_INT_ID { get; set; }
    public string HC_IQB_FECHA_ING { get; set; }
    public long HC_IQB_MED_ID { get; set; }
    public long HC_IQB_ESP_ID { get; set; }
    public int HC_IQB_TRASLADO { get; set; }
    public int HC_IQB_PROCEDENCIA { get; set; }
    public string HC_IQB_MOT_ING { get; set; }
    public string HC_IQB_ANT_PAT { get; set; }
    public string HC_IQB_PROC_EFEC { get; set; }
    public string HC_IQB_PARAM_BASICOS { get; set; }
    public string HC_IQB_RESPIRATORIO { get; set; }
    public string HC_IQB_CARDIO { get; set; }
    public string HC_IQB_EXAMENES_PRES { get; set; }
    public long HC_IQB_USU_ID { get; set; }
    public string HC_IQB_FEC_SIS { get; set; }

    public IQB_HC_INGRESO() { }

    public IQB_HC_INGRESO(long _HC_IQB_ID, long _HC_IQB_NHC, long _HC_IQB_INT_ID, string _HC_IQB_FECHA_ING, long _HC_IQB_MED_ID,
        long _HC_IQB_ESP_ID, int _HC_IQB_TRASLADO, int _HC_IQB_PROCEDENCIA, string _HC_IQB_MOT_ING, string _HC_IQB_ANT_PAT, string _HC_IQB_PROC_EFEC, string _HC_IQB_PARAM_BASICOS,
        string _HC_IQB_RESPIRATORIO, string _HC_IQB_CARDIO, string _HC_IQB_EXAMENES_PRES)
    {
        HC_IQB_ID = _HC_IQB_ID;
        HC_IQB_NHC = _HC_IQB_NHC;
        HC_IQB_INT_ID = _HC_IQB_INT_ID;
        HC_IQB_FECHA_ING = _HC_IQB_FECHA_ING;
        HC_IQB_MED_ID = _HC_IQB_MED_ID;
        HC_IQB_ESP_ID = _HC_IQB_ESP_ID;
        HC_IQB_TRASLADO = _HC_IQB_TRASLADO;
        HC_IQB_PROCEDENCIA = _HC_IQB_PROCEDENCIA;
        HC_IQB_MOT_ING = _HC_IQB_MOT_ING;
        HC_IQB_ANT_PAT = _HC_IQB_ANT_PAT;
        HC_IQB_PROC_EFEC = _HC_IQB_PROC_EFEC;
        HC_IQB_PARAM_BASICOS = _HC_IQB_PARAM_BASICOS;
        HC_IQB_RESPIRATORIO = _HC_IQB_RESPIRATORIO;
        HC_IQB_CARDIO = _HC_IQB_CARDIO;
        HC_IQB_EXAMENES_PRES = _HC_IQB_EXAMENES_PRES;
    }
}

public class Acompa_Internacion
{
    public Acompa_Internacion()
    { 
    
    }

    public long NroInternacion { get; set; }
    public string Nombre { get; set; }
    public string TipoDoc { get; set; }
    public int DNI { get; set; }
    public string Parentezco { get; set; }
    public string Calle { get; set; }
    public string Numero { get; set; }
    public string Piso { get; set; }
    public string CP { get; set; }
    public string Localidad { get; set; }
    public string Provincia { get; set; }
    public string Telefono { get; set; }
    public string Observaciones { get; set; }
}

public class Interconsulta
{
    public Interconsulta()
    {

    }
    public long IdInterconsulta { get; set; }
    public long NroInternacion { get; set; }
    public long NHC { get; set; }
    public long MedicoSol { get; set; }
    public long MedicoInter { get; set; }
    public long EspecialidadInter { get; set; }
    public string Fecha { get; set; }
    public string FechaCierre { get; set; }
    public string Motivo { get; set; }
    public int Estado { get; set; }
    public string Observacion { get; set; }
    public string Indicacion { get; set; }
}

public class InterconsultaList : Interconsulta
{
    public InterconsultaList()
    { }

    public string MedicoSolDesc { get; set; }
    public string MedicoInterDesc { get; set; }
    public string EspecialidadInterDesc { get; set; }
    public string RowClass { get; set; }
    public string HC_UOM { get; set; }
    public string Afiliado { get; set; }
    public string Servicio { get; set; }
    public string Cama { get; set; }
    public string MedicoExterno { get; set; }
}

public class HojaEnfermeria
{
    public HojaEnfermeria() { }

    public long IdDetalle { get; set; }
    public long IdIM { get; set; }
    public long IdInsumo { get; set; }
    public int Frecuencia { get; set; }
    public bool EnHoras { get; set; }
    public string Indicacion { get; set; }
}

public class HojaEnfermeriaCab
{
    public HojaEnfermeriaCab() { }

    public long IdHoja {get;set;}
    public long NHC {get;set;}
    public long IdSala {get;set;}
    public long IdCama {get;set;}
    public long IdServicio {get;set;}
    public string Fecha {get;set;}
    public long IdInternacion {get;set;}
    public long UsuarioId { get; set; }
    public long MedicoId { get; set; }
}

public class HojaEnfermeriaDet:HojaEnfermeria
{
    public HojaEnfermeriaDet() { }

     public long IdHoja {get;set;}
     public long IdInsumo {get;set;}
     public string Indicacion {get;set;}
     public bool EnHoras {get;set;}
     public int Frecuencia {get;set;}
     public string Observaciones {get;set;}
     public int Enfermera {get;set;}
     public bool Realizado {get;set;}

}

public class HojaEnfermeriaList
{
    public HojaEnfermeriaList() { }

    public long IdHoja { get; set; }
    public long NHC { get; set; }
    public string Paciente { get; set; }
    public string Medico { get; set; }
    public string Servicio { get; set; }
    public string Fecha { get; set; }
}
 
public class HojaEnfermeriaCabList : HojaEnfermeriaCab
{
    public HojaEnfermeriaCabList() { }

    public string Paciente {get;set;}
    public string Cama {get;set;}
    public string Sala {get;set;}
    public string Servicio {get;set;}
    public string Medico {get;set;}
    public string Seccional {get;set;}
}


//=======================MANUEL===============================================================
//public class encabezadoNutricion
//{
//    public encabezadoNutricion() { }
//    public string telefono { get; set; }
//    public string localidad { get; set; }
//    public string NHC_UOM { get; set; }
//    public long documento_real { get; set; }
//    public string apellido { get; set; }
//    public int edad { get; set; }
//    public string seccional { get; set; }
//    public string servicio { get; set; }
//    public string cama { get; set; }
//    public string medico { get; set; }
//    public string documento { get; set; }
//}

//public class indicacionesNutricion
//{
//    public indicacionesNutricion() { }

//    public string REM_NOMBRE { get; set; }
//    public string indicacion { get; set; }
//    public string codAlmuerzo { get; set; }
//    public string descAlmuerzo { get; set; }
//    public string codCena { get; set; }
//    public string descCena { get; set; }
//}

//public class pedidoNutricion
//{
//    public pedidoNutricion() { }

//    public long idPedido { get; set; }
//    public string tipificacion { get; set; }
//    public string dieta { get; set; }
//    public int cantidad { get; set; }
//    public string fecha { get; set; }
//    public string codAlmuerzo { get; set; }
//    public string desAlmuerzo { get; set; }
//    public string codCena { get; set; }
//    public string desCena { get; set; }
//}


public class AtInternacionHojaQuirirgico
{
    public int PRQ_ID { get; set; }
    public string PRQ_FECHA { get; set; }
    public string PRQ_SOC_ID { get; set; }
    public string PRQ_DIAG_ID { get; set; }
    public string PRQ_ESP_ID { get; set; }
    public string PRQ_MEDICO_ID { get; set; }
    public string PRQ_CIRU_ID { get; set; }
    public string PRQ_ESQUEMA_OPE { get; set; }
    public string PRQ_SESION { get; set; }
    public string PRQ_USUARIO { get; set; }
    public string PRQ_CAMA_ID { get; set; }
    public string PRQ_GUA_ID { get; set; }
    public string CAMA_DESCRIPCION { get; set; }
    public string PRACTICA_DESCRIPCION { get; set; }
    public string SALA_DESCRIPCION { get; set; }
    public int ES_ESPECIALISTA { get; set; }
}

public class Pase_Guardia_UTI
{
    public Pase_Guardia_UTI() { }

    public long Pase_Guardia_UTI_Id { get; set; }
    public long PacienteId { get; set; }
    public string Fecha { get; set; }
    public string Cama { get; set; }
    public string DiagnosticoPresuntivo { get; set; }
    public string Antecedentes { get; set; }
    public int DiasUTI { get; set; }
    public string DatosQuirurgicos { get; set; }
    public string DatosAP { get; set; }
    public bool VentilacionMecanica { get; set; }
    public bool Traqueostomia { get; set; }
    public string ModoVentilatorio { get; set; }
    public int DiasVentilacion { get; set; }
    public string RX { get; set; }
    public string ECG { get; set; }
    public int Alimentacion { get; set; }
    public string OtrasImagenes { get; set; }
    public string Gases { get; set; }
    public string Laboratorio_DatosPositivos { get; set; }
    public bool Infectologia { get; set; }
    public string Cultivos_Germen { get; set; }
    public string DiasATB { get; set; }
    public string Pendientes_Interconsultas { get; set; }
    public string Pendientes_Estudios { get; set; }
    public string Novedades_del_dia { get; set; }
    public bool Estado { get; set; }
    public long UsuarioId { get; set; }
    public long InternacionId { get; set; }
    public long UsuarioId_Visto { get; set; }
    public string FechaSistema_Visto { get; set; }
    public string UsuarioNombre_Visto { get; set; }
    public string Observaciones { get; set; }
    public int DiasAlimentacion { get; set; }
}

public class Pase_Guardia_UTI_Lista
{
    public Pase_Guardia_UTI_Lista() { }

    public long EvolucionId { get; set; }
    public string Fecha { get; set; }
    public long InternacionId { get; set; }
    public string Evolucion { get; set; }
    public string Servicio { get; set; }
    public string Sala { get; set; }
    public string Cama { get; set; }
    public string PacienteNombre { get; set; }
    public string NHC { get; set; }
}

public class PaseCama
{
    public long PaseCama_Id { get; set; }
    public string PaseCama_Desc { get; set; }
    public string PaseCama_Fecha { get; set; }
    public long PaseCama_UsuarioId { get; set; }
    public bool PaseCama_Baja { get; set; }
    public long PaseCama_InternacionId { get; set; }

    public PaseCama() { }

    public PaseCama(long _PaseCama_Id, string _PaseCama_Desc, string _PaseCama_Fecha,long _PaseCama_InternacionId, long _PaseCama_UsuarioId = 0, bool _PaseCama_Baja = false) 
    {
        PaseCama_Id = _PaseCama_Id;
        PaseCama_Desc = _PaseCama_Desc;
        PaseCama_Fecha = _PaseCama_Fecha;
        PaseCama_InternacionId = _PaseCama_InternacionId;
        PaseCama_UsuarioId = _PaseCama_UsuarioId;
        PaseCama_Baja = _PaseCama_Baja;
    }
}


public class Alcaloide
{
    public string hc { get; set; }
    public string afiliado { get; set; }
    public string medico { get; set; }
    public string fechaPedido { get; set; }
    public long alcaloideId { get; set; }
    public string alcaloide { get; set; }
    public string cantidad { get; set; }
    public string fechaEntrega { get; set; }
    public int tipo { get; set; }
    public int editar { get; set; }
    public long CabId { get; set; }
}

public class Consentimiento
{
    public long id { get; set; }
    public string tipo { get; set; }
    public string fecha { get; set; }
    public string usuario { get; set; }
    public string ruta { get; set; }
}

public class intIngresoListar
{
    public long id { get; set; }
    public string fecha { get; set; }
    public string apellido { get; set; }
    public string documento { get; set; }
    public string cama { get; set; }
    public string sala { get; set; }
    public string hc { get; set; }
}

public class controlRemoto
{
    public long id { get; set; }
    public long afiliadoId {get; set;}
    public string ruta { get; set; }
    public string archivo { get; set; }
    public string fecha { get; set; }
    public int usuario { get; set; }
    public string tipo { get; set; }
    public string apellido { get; set; }
}

public class permisoVisita
{
    public long id { get; set; }
    public long afiliadoId { get; set; }
    public long idInternacion { get; set; }
    public string permiso { get; set; }
    public int usuario { get; set; }
    public int estado { get; set; }
    public string fecha { get; set; }
    public int usuarioEstado { get; set; }
    public string fechaEstado { get; set; }
    public string sala { get; set; }
    public string cama { get; set; }
    public string afiliado { get; set; }
    public string hc { get; set; }
    public string usuarioName { get; set; }
    public int visitas { get; set; }
    public int permanente { get; set; }
}

public class evolucionEspecialista
{
    public long id { get; set; }
    public long idInternacion { get; set; }
    public long afiliadoId { get; set; }
    public int practicaId { get; set; }
    public string evolucion { get; set; }
    public int usuario { get; set; }
    public string usuarioName { get; set; }
    public string fecha { get; set; }
    public string especialidad { get; set; }
    public int edita { get; set; }
    public string afiliadoName { get; set; }
    public string practicaName { get; set; }
}

public class practicaEspecialista
{
    public int id { get; set; }
    public string practica { get; set; }
    public decimal valor { get; set; }
    public bool activa { get; set; }
}

public class controlRemotoListar
{
    public long id { get; set; }
    public long camaId { get; set; }
    public string Servicio { get; set; }
    public string Sala { get; set; }
    public string Cama { get; set; }
    public string Afiliado { get; set; }
    public string FechaEntrega { get; set; }
    public string observacion { get; set; }
    public List<controlesRemotos> controles { get; set; }
    public int idControl { get; set; }
    public long afiliadoId { get; set; }
    public long servicioId { get; set; }
}

public class controlesRemotos
{
    public long id { get; set; }
    public string marca { get; set; }
    public string modelo { get; set; }
    public bool activo { get; set; }
    public int stock { get; set; }
    public int disponibles { get; set; }
    public int distribuidos { get; set; }
    public string observacion { get; set; }
}