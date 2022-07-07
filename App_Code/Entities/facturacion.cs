using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for facturacion
/// </summary>
public class listadeconvenios
{
    public listadeconvenios()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public long id {get;set;}
    public string convenios { get; set; }
    public string contacto { get; set; }
    public string fechainicial { get; set; }
    public string fechafinal { get; set; }
    public string detalles { get; set; }

    public string razonsocial { get; set; }
    public string direccion_fact { get; set; }
    public string cuit_fact { get; set; }
}

public class listaconveniosseccionales
{
    public string clase { get; set; }
    public long ConvenioId { get; set; }
    public string Seccional { get; set; }
    public int SeccionalId { get; set; }
    public string claseTodas { get; set; }
}

public class listaconveniosinstituciones
{
    public string clase { get; set; }
    public long ConvenioId { get; set; }
    public string Institucion { get; set; }
    public int InstitucionId { get; set; }
    public string claseTodas { get; set; }
}

public class listaconveniosprofesionales
{
    public string clase { get; set; }
    public long ConvenioId { get; set; }
    public string Medico { get; set; }
    public long MedicoId { get; set; }
    public string claseTodas { get; set; }
}

public class listasugerencias
{
    public long Codigo { get; set; }
    public string Descripcion { get; set; }
    public int Estado { get; set; }
}

public class listarEspecialidadPracticarelacion
{
    public long practica { get; set; }
    public long especialidad { get; set; }
    public string especialidadNombre { get; set; }
}

public class preciosPracticas
{
    public long Codigo { get; set; }
    public string valornomenclador { get; set; }
    public string valorguardia { get; set; }
    public string valorgastos { get; set; }
    public string valorhonorarios { get; set; }
    public bool SFOS { get; set; }
    public bool cobraHono { get; set; }
}


public class FactPracticasDetalles
{
    public long Codigo { get; set; }
    public string descripcion { get; set; }
    public string sugerenciasId { get; set; }
    public string complejidadId { get; set; }
    public string carenciaId { get; set; }
    public string topeAnual { get; set; }
    public string topeMensual { get; set; }
    public bool noafectavaloracionglobal { get; set; }
    public string valornomenclador { get; set; }
    public string valorguardia { get; set; }
    public string valorgastos { get; set; }
    public string valorhonorarios { get; set; }
    public bool SFOS { get; set; }
    public bool cobraHono { get; set; }
    public string IsActive { get; set; }
}


public class FactModulosDetalles
{
    public FactModulosDetalles() { }

    public long Codigo {get; set;}
    public string Descripcion {get; set;}
    public decimal ValorNN {get; set;}
    public decimal ValorGastos { get; set; }
    public decimal ValorGuardia { get; set; }
    public decimal ValorHonorario { get; set; }
    public bool SeFacturoOS { get; set; }
    public bool CobraHonorario { get; set; }
    public long UsuarioId { get; set; }
}

public class FactValorPracticas
{
    public long convenioid { get; set; }
    public string convenio { get; set; }

    public int especialidadid { get; set; }
    public string especialidad { get; set; }

    public int practicaid { get; set; }
    public string practica { get; set; }

    public string ValorBono { get; set; }
    public string ValorACA { get; set; }
    public string ValorACI { get; set; }

    public string ValorNN { get; set; }
    public string ValorGastos { get; set; }
    public string ValorHonorario { get; set; }

}


public class FactValorPracticasEspecialidad
{
    public long convenioid { get; set; }
    public string convenio { get; set; }
    public long nomencladorid { get; set; }

    public long practicaid { get; set; }
    public string practica { get; set; }

    public int especialidadid { get; set; }
    public string especialidad { get; set; }

    public string ValorBono { get; set; }
    public string ValorACA { get; set; }
    public string ValorACI { get; set; }

    public string ValorNN { get; set; }
    public string ValorGastos { get; set; }
    public string ValorHonorario { get; set; }


}

public class FactValorHonoMedicos
{
    public long convenioid { get; set; }
    public string convenio { get; set; }

    public long medicoId { get; set; }
    public string medico { get; set; }

    public int especialidadid { get; set; }
    public string especialidad { get; set; }

    public string ValorHonorario { get; set; }
    public long practicaid { get; set; }
    public string practica { get; set; }
}


public class Facturacion_ParteMedicos_Cab
{
    public Facturacion_ParteMedicos_Cab()
    { }

    public long NroParte { get; set; }
    public string Fecha { get; set; }
    public long MedicoId { get; set; }
    public int CentroId { get; set; }
    public bool Internacion { get; set; }
    public bool Ambulatorio { get; set; }
    public bool Baja { get; set; }
    public long UsuarioId { get; set; }
}

public class Facturacion_Parte_Cab {
    public Facturacion_Parte_Cab()
    { }

    public long NroParte { get; set; }
    public string Fecha { get; set; }
    public long NHC { get; set; }
    public int InstitucionId { get; set; }
    public int CentroId { get; set; }
    public long NroInternacion { get; set; }
    public bool Internacion { get; set; }
    public bool Ambulatorio { get; set; }
    public long UsuarioId { get; set; }
    public string NroOrdenCarpeta { get; set; }
    public string Observaciones { get; set; }
    public string Nomenclador { get; set; }
}

public class Facturacion_Parte_Det {
    public Facturacion_Parte_Det()
    { }

    public long NroParte { get; set; }
    public bool Ambulatorio { get; set; }
    public bool Internacion { get; set; }
    public bool Practica { get; set; }
    public bool Modulo { get; set; }
    public string FechaPractica { get; set; }
    public string FechaRendicion { get; set; }
    public int ServicioId { get; set; }
    public int EspecialidadId { get; set; }
    public int MedicoId { get; set; }
    public int Cantidad { get; set; }
    public decimal Porcentaje { get; set; }
    public int PracticaId { get; set; }
    public string Prac_Nombre { get; set; }
    public decimal Precio { get; set; }
    public decimal Total { get; set; }
    public decimal PrecioHonorario { get; set; }
    public bool Facturarlo { get; set; }
    public bool Honorarios { get; set; }
    public bool APE { get; set; }
    public string HoraPractica { get; set; }
    public int Detalle { get; set; }
    public long GeneralId { get; set; }
    public long NroOrden { get; set; }
    public string SubPracticaId { get; set; } //Para Laboratorio
}

public class FacturacionTotales {
    public decimal Gasto { get; set; }
    public decimal Honorario { get; set; }
    public decimal Medicamentos { get; set; }
    public decimal Total { get; set; }

    public FacturacionTotales()
    {
        Total = Gasto + Honorario + Medicamentos;
    }
}

public class FacturacionPuesto
{
    public string NroPuesto { get; set; }
    public long CUIT { get; set; }
    public string RazonSocial { get; set; }
    public string Direccion { get; set; }
    public bool Activo { get; set; }
    public string FechaInicioActividad { get; set; }

    public FacturacionPuesto()
    {
    
    }
}

public class FacturacionFactura_Cab
{ 
    public string NroFactura { get; set; }
    public string NroPuesto { get; set; }
    public long CUIT { get; set; }
    public decimal Gasto { get; set; } //Total de Gasto
    public decimal Honorario { get; set; } //Total de Honorario
    public decimal Medicamento { get; set; } //Total de Medicamentos
    public long ObraSocial { get; set; }
    public string Observaciones { get; set; }
    public string Fecha { get; set; }
    public long UsuarioId { get; set; }
    public string NHC { get; set; }
    public bool Anulada { get; set; }
    public string Factura_A { get; set; } //Mutual o Paciente
    public string Factura_Tipo { get; set;} //Ambulatorio,Internacion u Otros. (Otros son adelantos)
    public int MesFacturado { get; set; } // Mes y anio facturado pertenecen al periodo facturado
    public int AnioFacturado { get; set; } //
    public string Descripcion { get; set; } //Nom de pac o Mutual
    public FacturacionFactura_Cab() { }
}

public class FacturacionFactura_Det
{
    public string NroFactura { get; set; }
    public string NroPuesto { get; set; }
    public long NroParte { get; set; }

    public FacturacionFactura_Det() { }
}

public class Facturacion_Medico_Cab
{
    public Facturacion_Medico_Cab()
    { }

    public long NroParte { get; set; }
    public string Fecha { get; set; }
    public int MedicoId { get; set; }
    public int CentroId { get; set; }
    public bool Internacion { get; set; }
    public bool Ambulatorio { get; set; }
    public long UsuarioId { get; set; }
}

public class Facturacion_Medicos_Det
{
    public Facturacion_Medicos_Det()
    { }

     public long NroParte { get; set; }
     public decimal Precio { get; set; }
     public string FechaPractica { get; set; }
     public string FechaRendicion { get; set; }
     public bool Ambulatorio { get; set; }
     public bool Internacion { get; set; }
     public bool Practica { get; set; }
     public bool Modulo { get; set; }
     public int ServicioId { get; set; }
     public int EspecialidadId { get; set; }
     public int Cantidad { get; set; }
     public decimal Porcentaje { get; set; }
     public int PracticaId { get; set; }
     public string PracNombre { get; set; }
	 public bool Facturarlo { get; set; }
}


public class Facturacion_Honorarios_Med {
    public Facturacion_Honorarios_Med() { }

    public long NroParte { get; set; }
    public int PracticaId { get; set; }
    public int MedicoId { get; set; }
    public decimal Honorario { get; set; }
    public decimal Porcentaje { get; set; }
    public string Tipo { get; set; }
    public string Medico { get; set; }
    public int Detalle { get; set; }
}


public class Facturacion_GenerarHono_List
{
    public Facturacion_GenerarHono_List() { }

    public long NroParte { get; set; }
    public long NHC { get; set; }
    public string ObraSocial { get; set; }
    public string Fecha { get; set; }
    public string Paciente { get; set; }
    public string FechaImpreso { get; set; }
    public string NroOrdenInt { get; set; }
}


public class Facturacion_Buscar_Partes {
    public Facturacion_Buscar_Partes() { }

    public long NroParte { get; set; }
    public long NHC { get; set; }
    public string Fecha { get; set; }
    public string Paciente { get; set; }
    public string Seccional { get; set; }
}


public class FactValorModulosConvenio
{
    public FactValorModulosConvenio() { }

    public long convenioid { get; set; }
    public int nomencladorid { get; set; }
    public string convenio { get; set; }
    public long moduloid { get; set; }
    public string modulo { get; set; }
    public decimal ValorBono { get; set; }
    public decimal ValorACA { get; set; }
    public decimal ValorACI { get; set; }
    public decimal ValorNN { get; set; }
    public decimal ValorGastos { get; set; }
    public decimal ValorHonorario { get; set; }
    public long UsuarioId { get; set; }
}


public class Facturacion_Medicamentos_Cab {

    public Facturacion_Medicamentos_Cab() { }

    public long NroParte { get; set; }
    public string FechaParte { get; set; }
    public string FechaRendicion { get; set; }
    public long NHC { get; set; }
}

public class Facturacion_Medicamentos_Det {

    public Facturacion_Medicamentos_Det() { }

    public long NroParte { get; set; }
    public long DetalleId { get; set; }
    public bool Ambulatorio { get; set; }
    public bool Internacion { get; set; }
    public string Medicamento { get; set; }
    public string Monodroga { get; set; }
    public string Medicamento_Nombre { get; set; }
    public string Monodroga_Nombre { get; set; }
    public int Cantidad { get; set; }
    public int Porcentaje { get; set; }
    public decimal Precio { get; set; }
    public string FechaPractica { get; set; }
    public bool Facturarlo { get; set; }
    public bool Estadisticas { get; set; }
    public bool APE { get; set; }
}

public class Facturacion_Descartables_Det {

    public Facturacion_Descartables_Det() { }

    public long NroParte { get; set; }
    public int InsumoId { get; set; }
    public string Descripcion { get; set; }
    public int Cantidad { get; set; }
    public decimal Precio { get; set; }
    public string FechaPractica { get; set; }
    public bool Facturarlo { get; set; }
    public bool Estadisticas { get; set; }
    public bool APE { get; set; }
    public int Porcentaje { get; set; }
    public bool Internacion { get; set; }
    public bool Ambulatorio { get; set; }
}

public class Facturacion_SeleccionDatos {
    public Facturacion_SeleccionDatos() { }

    public string Select {get;set;}
    public long NroParte {get;set;}
    public string FechaPractica {get;set;}
    public string FechaParte {get;set;}
    public string FechaRendicion {get;set;}
    public long NHC {get;set;}
    public string Afiliado {get;set;}
    public int Cantidad {get;set;}
    public long Codigo {get;set;}
    public string Practica {get;set;}
    public string RV { get; set; }

    public string Seccional { get; set; }
    public string Especialidad { get; set; }
    public string Medico { get; set; }
    public decimal Total { get; set; }
}

public class Facturacion_ListRendicionInternacionSN {
    public Facturacion_ListRendicionInternacionSN() { }

    public long NroParte { get; set; }
    public long NroInternacion { get; set; }
    public string FechaPractica { get; set; }
    public long NHC { get; set; }
    public string Afiliado { get; set; }
    public long Codigo { get; set; }
    public string Practica { get; set; }
    public string ObraSocial { get; set; }
    public string NroBeneficiario { get; set; }
    public decimal Gasto { get; set; }
}

public class Facturacion_SelectDatos_Table {
    public Facturacion_SelectDatos_Table() { }

    public long NroParte { get; set; }
    public long Codigo { get; set; }
    public decimal PrecioRevalorizado { get; set; }
    public bool Revalorizado { get; set; }
    public int Procesado { get; set; }
}

public class Facturacion_PreFacturacion
{
    public Facturacion_PreFacturacion() { }
    public string FechaPractica {get;set;}
    public string FechaRendicion {get;set;}
    public int Cantidad {get;set;}
    public long PracticaId {get;set;}
    public string Practica {get;set;}
    public long NroParte { get; set; }
    public string Tipo { get; set; }
}

public class Facturacion_Rendiciones
{
    public Facturacion_Rendiciones() { }

    public long NroRendicion {get;set;}
    public string FechaFacturacion {get;set;}
    public string Año {get;set;}
    public string Mes {get;set;}
    public string Seccional {get;set;}
}

public class Facturacion_PracticasFaltantes
{
    public Facturacion_PracticasFaltantes() { }

    public long NroParte {get;set;}
    public string Fecha {get;set;}
    public long NHC {get;set;}
    public string Afiliado {get;set;}
    public long Codigo {get;set;}
    public string Practica {get;set;}
}

public class Facturacion_Presupuesto_Cab
{
    public Facturacion_Presupuesto_Cab() { }

    public long Presupuesto_Id { get; set; }
    public string Fecha { get; set; }
    public long ServicioId { get; set; }
    public string Paciente { get; set; }
    public string Seccional { get; set; }
    public long SeccionalId { get; set; }
    public long InstitucionId { get; set; }
    public long EspecialidadId { get; set; }
    public long MedicoId { get; set; }
    public string Diagnostico { get; set; }
    public string Incluye { get; set; }
    public string NoIncluye { get; set; }
    public bool Baja { get; set; }
    public long UsuarioId { get; set; }
}

public class Facturacion_Presupuesto_Det
{
    public Facturacion_Presupuesto_Det() {}
     
    public long Presupuesto_Id { get; set; }
    public long PracticaId { get; set; }
    public string FechaPractica { get; set; }
    public string FechaRendicion { get; set; }
    public string Tipo { get; set; }
    public bool Modulo { get; set; }
    public bool Practica { get; set; }
    public bool Facturar { get; set; }
    public int Cantidad { get; set; }
    public string PracticaDesc { get; set; }
    public decimal Precio { get; set; }
    public decimal Total { get; set; }
}

public class Facturacion_ModulosEnc
{
    public Facturacion_ModulosEnc() { }

    public long EncabezadoId { get; set; }
    public string Descripcion { get; set; }
}

public class Facturacion_RangosPrac
{
    public Facturacion_RangosPrac() { }

    public int RangoId { get; set; }
    public long PracticaDesde { get; set; }
    public long PracticaHasta { get; set; }
}

public class Facturacion_ListNomenclaSN
{
    public Facturacion_ListNomenclaSN() { }

    public string Fecha { get; set; }
}

public class Facturacion_ListRendicionAmbulatorioSN
{
    public Facturacion_ListRendicionAmbulatorioSN() { }

    public int RendicionId { get; set; }
    public string Fecha { get; set; }
    public string Paciente { get; set; }
    public string Profesional { get; set; }
    public int Codigo { get; set; }
    public int Cantidad { get; set; }
    public string Prestacion { get; set; }
    public decimal HonoOS { get; set; }
    public decimal GastoOS { get; set; }
    public decimal GastoTotal { get; set; }
    public string NroOrden { get; set; }
    public int Clase { get; set; }
}

public class Facturacion_RangoConv
{
    public Facturacion_RangoConv() { }

    public int RangoId { get; set; }
    public long ConvenioId { get; set; }
    public string ConvenioDesc { get; set; }
    public string RangoDesc { get; set; }
    public string Valor { get; set; }
    public string ValorHonorario { get; set; }
}

public class Facturacion_EmiteFactura
{
    public Facturacion_EmiteFactura() { }

    public long IdFactura { get; set; }
    public long OS { get; set; }
    public long UsuarioId { get; set; }
    public decimal Importe { get; set; }
    public string Observacion { get; set; }
    public bool Baja { get; set; }
    public string Fecha { get; set; }
}

public class Facturacion_Nomenclador
{
    public int FACT_NOMENCLA_ID { get; set; }
    public int FACT_CONVENIO_ID { get; set; }
    public string FACT_CONVENIO { get; set; }
    public string FACT_NOMENCLA_DESDE { get; set; }
    public string FACT_NOMENCLA_HASTA { get; set; }
    public string FACT_NOMENCLA_DESC { get; set; }
    public bool FACT_NOMENCLA_BAJA { get; set; }
    public long FACT_USUARIO_ID { get; set; }

    public Facturacion_Nomenclador() { }

    public Facturacion_Nomenclador(int _FACT_NOMENCLA_ID, int _FACT_CONVENIO_ID, string _FACT_CONVENIO, string _FACT_NOMENCLA_DESDE, string _FACT_NOMENCLA_HASTA, string _FACT_NOMENCLA_DESC,
        bool _FACT_NOMENCLA_BAJA) 
    {
        FACT_NOMENCLA_ID = _FACT_NOMENCLA_ID;
        FACT_CONVENIO_ID = _FACT_CONVENIO_ID;
        FACT_CONVENIO = _FACT_CONVENIO;
        FACT_NOMENCLA_DESDE = _FACT_NOMENCLA_DESDE;
        FACT_NOMENCLA_HASTA = _FACT_NOMENCLA_HASTA;
        FACT_NOMENCLA_DESC = _FACT_NOMENCLA_DESC;
        FACT_NOMENCLA_BAJA = _FACT_NOMENCLA_BAJA;
    }
}