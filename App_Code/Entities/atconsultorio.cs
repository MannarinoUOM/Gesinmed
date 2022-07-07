using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for atconsultorio
/// </summary>
public class atconsultorio
{
    public atconsultorio()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public string Fecha { get; set; }
    public string Hora { get; set; }
    public string Medico { get; set; }
    public string Especialidad { get; set; }
    public string Consultorio { get; set; }
    public string Usado { get; set; }
    public string Documento { get; set; }
    public long TurnoId { get; set; }
    public int EspecialidadId { get; set; }
    public string Estado { get; set; }
}

public class listapacientes
{
    public string Fecha { get; set; }
    public string NHC { get; set; }
    public long documento { get; set; }
    public string Paciente { get; set; }
    public string Seccional { get; set; }
    public string LLamadoI { get; set; }
    public string LLamadoF { get; set; }
    public string Estado { get; set; }
    public string HoraRecep { get; set; }
    public long Turno_Id { get; set; }
    public int Estado_IMG { get; set; }
    public bool Alto_Riesgo { get; set; }
    public int TeleConsulta { get; set; }
}

public class certificadosmedicosImpresion
{
    public string NHC { get; set; }
    public int Id { get; set; }
    public string Indicaciones { get; set; }
    public string Fecha { get; set; }
    public string Medico { get; set; }
    public string Paciente { get; set; }
    public string Seccional { get; set; }

}

public class altacomplejidad
{
    public altacomplejidad() { }

    public long id { get; set; }
    public long nhc { get; set; }
    public long medicoid { get; set; }
    public string Fecha { get; set; }
    public string Practica_Estudios { get; set; }
    public string Resumen_HC { get; set; }
    public string Relacion_Algoritmo { get; set; }
    public string Resultados { get; set; }
    public long UsuarioId { get; set; }
    public int intGuar { get; set; } 
}

public class ordenesdeestudios
{
    public int protocolo { get; set; }
    public string NHC { get; set; }
    public string fechainicio { get; set; }
    public string fechaentrega { get; set; }
    public string medicoid { get; set; }
    public string diagnosticoid { get; set; }
    public string DiagnosticoName { get; set; }
    public string autorizanteid { get; set; }
    public string periodosolicitdo { get; set; }
    public string eliminado { get; set; }
    public string patologiaid { get; set; }
    public int servicioId { get; set; }
}


public class ordenesdeestudiospracticas
{
    public long Id { get; set; }
    public string Nombre { get; set; }
    public string eliminado { get; set; }
    public string protocolo { get; set; }
    public string fecha { get; set; }
    public string Observacion { get; set; }
    public string Estado { get; set; }
}

public class ordenesdeestudiosneonatologia
{
    public string Protocolo { get; set; }
    public string NHC { get; set; }
    public string MedicoId { get; set; }
    public string fecha_nac { get; set; }
    public string peso { get; set; }
    public string talla { get; set; }
    public string percefalico { get; set; }
}

public class ordenesdeestudiosbuscar
{
    public long protocolo { get; set; }
    public string NHC { get; set; }
    public string fechaingreso { get; set; }
    public string documento { get; set; }
    public string paciente { get; set; }
    public string medicoid { get; set; }
    public string medico { get; set; }
    public string HC_UOM { get; set; }
    public string medicoNombre { get; set; }
}

public class ordentraslado
{
    public long protocolo { get; set; }
    public long NHC { get; set; }
    public string Fecha_Atencion { get; set; }
    public int Medico_Id { get; set; }
    public string Comun { get; set; }
    public string Utim { get; set; }
    public string Neonatal { get; set; }
    public string Diagnostico { get; set; }
    public string Observaciones { get; set; }
    public string Desde_Traslado { get; set; }
    public string Localidad_Traslado { get; set; }
    public string Calles_Traslado { get; set; }
    public string Hasta_Traslado { get; set; }
    public string Localidad_Traslado_Hasta { get; set; }
    public string Horario_Destino { get; set; }
    public bool Con_Regreso { get; set; }
    public bool De_Ambula { get; set; }
    public string Empresa { get; set; }
    public string Operador_Sol { get; set; }
    public string Fecha_Sol { get; set; }
    public string Hora_Sol { get; set; }
    public string Operador_Recep { get; set; }
    public string Fecha_Recep { get; set; }
    public string Hora_Recep { get; set; }
    public string Calles_Destino { get; set; }
}

public class monodrogas
{
    public int id { get; set; }
    public int numero { get; set; }
    public string nombre { get; set; }
    public bool activo { get; set; }

}

public class insumos_medidas
{
    public int id { get; set; }
    public string medida { get; set; }
}

public class insumos_presentacion
{
    public int id { get; set; }
    public string presentacion { get; set; }
}


public class recetasmonodrogas
{
    public int monodrogascodigo { get; set; }
    public string monodrogasnombre { get; set; }
    public string adicional { get; set; }
    public string dosis_diaria { get; set; }
    public string dosis { get; set; }
    public string observacion { get; set; }
    public int unidad_medida_id { get; set; }
    public string unidad_medida { get; set; }
    public int presentacion_id { get; set; }
    public string presentacion { get; set; }
    public string Estado { get; set; }
    public long detalleid { get; set; }
}

public class recetas_cab
{
    public long protocolo { get; set; }
    public long NHC { get; set; }
    public string fechainicio { get; set; }
    public string fechaentrega { get; set; }
    public int medicoid { get; set; }
    public string diagnoticoid { get; set; }
    public string diagnoticodesc { get; set; }
    public int autorizanteid { get; set; }
    public int patologia { get; set; }
    public string periodo { get; set; }
}

public class recetas_busqueda
{
    public long protocolo { get; set; }
    public string NHC { get; set; }
    public string fechainicio { get; set; }
    public string fechaentrega { get; set; }
    public string apellido { get; set; }
    public string medico { get; set; }
    public long medicoId { get; set; }
}

public class cargar_diabetes
{
    public long Protocolo { get; set; }
    public int Tipo { get; set; }
    public bool Obesidad { get; set; }
    public bool Dislipidemia { get; set; }
    public bool HC { get; set; }
    public string otros { get; set; }
    public int Retinopatia { get; set; }
    public int Neuropatia { get; set; }
    public int ivp { get; set; }
    public int CI { get; set; }
    public int Nefropatia { get; set; }
    public int Pie { get; set; }
    public int hta { get; set; }
    public int tabaco { get; set; }
    public long NHC { get; set; }
    public int Medico_Diabetes_Id { get; set; }
    public string MotivoModificacion { get; set; }
    public string HbgA1C { get; set; }
    public string HDL { get; set; }
    public string TG { get; set; }
    public string FRUCTOSAMINA { get; set; }
    public string URICEMIA { get; set; }
    public string CLEARENCEC { get; set; }
    public string UREA { get; set; }
    public string TGO { get; set; }
    public string BT { get; set; }
    public string BD { get; set; }
    public string COLTOTAL { get; set; }
    public string LDL { get; set; }
    public string MICROALBUMINURIA { get; set; }
    public string CREA { get; set; }
    public string GLUCEMIA { get; set; }
    public string PROTEINURIA { get; set; }
    public string CPK { get; set; }
    public string TGP { get; set; }
    public string BI { get; set; }
    public string OJO_D { get; set; }
    public string OJO_I { get; set; }
    public string OTROS_LABORATORIO { get; set; }
    public string fechaanalisis { get; set; }
    public string EVOLUCION { get; set; }
    public string Peso { get; set; }
    public string Talla { get; set; }
    public string Metformina { get; set; }
    public string Glibenciamida { get; set; }
    public string Glicazida { get; set; }
    public string Glimepirida { get; set; }
    public string Glipizida { get; set; }
    public string Rosiglitazona { get; set; }
    public string Atorvastatina { get; set; }
    public string Sinvastantina { get; set; }
    public string Ezetimibe { get; set; }
    public string Fenofibrato { get; set; }
    public string NPH { get; set; }
    public string Rapida { get; set; }
    public string RapidaAnalogo { get; set; }
    public string Lispro { get; set; }
    public string Ultralenta { get; set; }
    public string Mix25 { get; set; }
    public string Mix30 { get; set; }
    public string OTROS_MEDICAMENTOS { get; set; }
}

public class carga_general
{ 
public long protocolo { get; set; }
public string patologia { get; set; }
public string fecha { get; set; }
public string diagnostico_cod { get; set; }
public string observaciones { get; set; }
public long NHC { get; set; }
public string modificacion { get; set; }
public string medico { get; set; }
public string especialidad { get; set; }
public string diagnostico_desc { get; set; }
}

public class servicios_hospitalario
{
    public int id { get; set; }
    public string servicio { get; set; }
}

public class orden_internacion
{
    public long id { get; set; }
    public string servicioid { get; set; }
    public string diagnostico { get; set; }
    public string ordenindicada { get; set; }
    public string fechainternacion { get; set; }
    public string piso { get; set; }
    public string cama { get; set; }
    public string indicaciones { get; set; }
    public int medicoid { get; set; }
    public long NHC { get; set; }
}

public class Consulta_Diabetes : pacientes
{
    public int id_consulta { get; set; }
    public string nombre_paciente { get; set; }
    public string nombre_medico { get; set; }
    public string fecha_consulta { get; set; }
    public string fecha_modificacion { get; set; }
    public string Asiste_Taller { get; set; }
    public string Taller_Fecha { get; set; }
    public string fecha_alta_protocolo { get; set; }
    public string profesional { get; set; }

    public string tipo { get; set; }
    public string antiguedad { get; set; }
    public string antecendentes { get; set; }
    public string peso { get; set; }
    public string talla { get; set; }
    public string IMC { get; set; }
    public string CC { get; set; }
    public int hipoglucemias { get; set; }
    public string grado { get; set; }
    public string frecuencia { get; set; }
    public int retinopatia { get; set; }
    public int nefropatia { get; set; }
    public int neuropatia { get; set; }
    public int macrovascular { get; set; }
    public string metforminaDosis { get; set; }
    public string metforminaDosisMgXdia { get; set; }
    public string metforminaAntiguedad { get; set; }
    public string glibenclamidaDosis { get; set; }
    public string glibenclamidaMgXdia { get; set; }
    public string glibenclamidaAntiguedad { get; set; }
    public string glicazidaDosis { get; set; }
    public string glicazidaMgXdia { get; set; }
    public string glicazidaAntiguedad { get; set; }
    public string insulinaNPHdosis { get; set; }
    public string insulinaNPHmgXdia { get; set; }
    public string insulinaNPHantiguedad { get; set; }
    public string insulinaCorrienteDosis { get; set; }
    public string insulinaCorrienteMgXdia { get; set; }
    public string insulinaCorrienteAntiguedad { get; set; }
    public string otraNom { get; set; }
    public string otraDosis { get; set; }
    public string otraMgXdia { get; set; }
    public string otraAntiguedad { get; set; }
    public string HBA1Cultimo { get; set; }
    public string HBA1CultimoFecha { get; set; }
    public string HBA1Canterior { get; set; }
    public string HBA1CanteriorFecha { get; set; }
    public string glucemiaAyunoUltimo { get; set; }
    public string glucemiaAyunoUltimoFecha { get; set; }
    public string glucemiaAyunoAnterior { get; set; }
    public string glucemiaAyunonteriorFecha { get; set; }
    public string fondoOjo { get; set; }
    public string funcionrenal { get; set; }
    public string creatinina { get; set; }
    public string urea { get; set; }
    public string cdeCreatinina { get; set; }
    public string microalbuminuria { get; set; }
    public string pies { get; set; }
    public long idPaciente { get; set; }
    public long idMedco { get; set; }
    ///////////////////// nuevas


    public string Altura { get; set; }
    public int HTA { get; set; }
    public int EnfermedadCoronaria { get; set; }
    public int Tabaquismo { get; set; }
    public int Obesidad { get; set; }
    public int Dislipidemia { get; set; }
    public int Acv { get; set; }
    public string GlimeripideDosis { get; set; }
    public string GlimeripideMgxdia { get; set; }
    public string GlimeripideAntiguedad { get; set; }
    public string SitagliptinaDosis { get; set; }
    public string SitagliptinaMgxdia { get; set; }
    public string SitagliptinaAntiguedad { get; set; }
    public string VildagliptinaDosis { get; set; }
    public string VildagliptinaMgxdia { get; set; }
    public string VildagliptinaAntiguedad { get; set; }
    public string SaxaGliptinaDosis { get; set; }
    public string SaxaGliptinaMgxdia { get; set; }
    public string SaxaGliptinaAntiguedad { get; set; }
    public string LinagliptinaDosis { get; set; }
    public string LinagliptinaMgxdia { get; set; }
    public string LinagliptinaAntiguedad { get; set; }
    public string InsulinaAsparticaDosis { get; set; }
    public string InsulinaAsparticaMgxdia { get; set; }
    public string InsulinaAsparticaAntiguedad { get; set; }
    public string InsulinaLisproDpsis { get; set; }
    public string InsulinaLisproMgxdia { get; set; }
    public string InsulinaLisproAntiguedad { get; set; }
    public string InsulinaGlucolisinaDosis { get; set; }
    public string InsulinaGlucolisinaMgxdia { get; set; }
    public string InsulinaGlucolisinaAntiguedad { get; set; }
    public string InsulinaAsparticaBifàsicaDosis { get; set; }
    public string InsulinaAsparticaBifàsicaMgxdia { get; set; }
    public string InsulinaAsparticaBifàsicaAntiguedad { get; set; }
    public string InsulinaLispro7525Dosis { get; set; }
    public string InsulinaLispro7525mgxdia { get; set; }
    public string InsulinaLispro7525Antiguedad { get; set; }
    public string InsulinaLispro5050Dosis { get; set; }
    public string InsulinaLispro5050Mgxdia { get; set; }
    public string InsulinaLispro5050Antiguedad { get; set; }
    public string InsulinaGlarginaDosis { get; set; }
    public string InsulinaGlarginaMgxdia { get; set; }
    public string InsulinaGlarginaAntiguedad { get; set; }
    public string InsulinaDetermirDosis { get; set; }
    public string InsulinaDetermirMgxdia { get; set; }
    public string InsulinaDetermirAntiguedad { get; set; }
    public string InsulinaDegludecDosis { get; set; }
    public string InsulinaDegludecMgxdia { get; set; }
    public string InsulinaDegludecAntiguedad { get; set; }
    public string TirasReactivaDosis { get; set; }
    public string TirasReactivaMgxdia { get; set; }
    public string TirasReactivasAntiguedad { get; set; }
    public string OtroTipo2 { get; set; }
    public string OtroTipoDosis2 { get; set; }
    public string OtroTipoMgxdía2 { get; set; }
    public string OtroTipoAntiguedad2 { get; set; }
    public string OtroTipo3 { get; set; }
    public string OtroTipoDosis3 { get; set; }
    public string OtroTipoMgxdía3 { get; set; }
    public string OtroTipoAntiguedad3 { get; set; }
    public string OtroTipo4 { get; set; }
    public string OtroTipoDosis4 { get; set; }
    public string OtroTipoMgxdía4 { get; set; }
    public string OtroTipoAntiguedad4 { get; set; }
    public string OtroTipo5 { get; set; }
    public string OtroTipoDosis5 { get; set; }
    public string OtroTipoMgxdía5 { get; set; }
    public string OtroTipoAntiguedad5 { get; set; }

    public string GlibenclamidaP { get; set; }
    public string MetformiaP { get; set; }
    public string GlicazidaP { get; set; }
    public string InsulinaNPHDosisP { get; set; }
    public string InsulinaCorrienteP { get; set; }
    public string GlimeripideP { get; set; }
    public string SitagliptinaP { get; set; }
    public string VildagliptinaP { get; set; }
    public string SaxaGliptinaP { get; set; }
    public string LinagliptinaP { get; set; }
    public string InsulinaAsparticaP { get; set; }
    public string InsulinaLisproP { get; set; }
    public string InsulinaGlucolisinaP { get; set; }
    public string InsulinaAsparticaBifàsicaP { get; set; }
    public string InsulinaLispro7525P { get; set; }
    public string InsulinaLispro5050P { get; set; }
    public string InsulinaGlarginaP { get; set; }
    public string InsulinaDetermirP { get; set; }
    public string InsulinaDegludecP { get; set; }
    public string TirasReactivaP { get; set; }
    public string OtroTipoP { get; set; }
    public string OtroTipo2P { get; set; }
    public string OtroTipo3P { get; set; }
    public string OtroTipo4P { get; set; }
    public string OtroTipo5P { get; set; }
    public string fechaFondoOjo { get; set; }

}

public class ResultadosLaboDiabetes
{
    public string resultado { get; set; }
    public string fecha { get; set; }
    public string UnidadMedida { get; set; }
}


public class RecetasDiabeticas
{
    public long idReceta { get; set; }
    public string idConsulta { get; set; }
    //public string farmaco { get; set; }
    public string dosis { get; set; }
    public string cantidad { get; set; }
    public string observaciones { get; set; }
    public long medicoId { get; set; }
    public int vigencia { get; set; }
    public string fechaReceta { get; set; }
    public string fechaModificacion { get; set; }
    //public string paciente { get; set; }
    public personas paciente { get; set; }
    public List<Farmaco> listaFarmacos { get; set; }
    public Farmaco farmaco { get; set; }
    public string medico { get; set; }
}

public class Farmaco
{
    public string nombre { get; set; }
    public int id { get; set; }
    public string presentacion { get; set; }
    public string dosis { get; set; }
    public string mg { get; set; }
    public string antiguedad { get; set; }
    public long idConsulta { get; set; }
    public string cantidad { get; set; }
    public string observaciones { get; set; }
    public string vigencia { get; set; }
}

public class PresentacionesDiabetes
{
    public int id { get; set; }
    public string presentacion { get; set; }
    public string seCorresponde { get; set; }
}

//=======================MANUEL===============================================================


//====================================================CIRUGIA===============================================================
public class AtConsultorioCirugia_Cirujano {
    public string ICD10_Det_Id { get; set; }
    public string ICD10_Det_Descripcion { get; set; }
    public string Procedimiento { get; set; }
    public int CirujanoId { get; set; }
    public long CirujanoExternoId { get; set; }
    public string Telefono { get; set; }
    public long TurnoId { get; set; }
    public int InternacionId { get; set; }
    public int Internacion { get; set; }
    public int Hemoterapia { get; set; }
    public int AP { get; set; }
    public int Monitoreo { get; set; }
    public int Radiologia { get; set; }
    public int MatCirugia { get; set; }
    public string txt_MatCirugia { get; set; }
    public int TorreLap { get; set; }
    public int Antitetanica { get; set; }
    public int Ortopedia { get; set; }
    public string txt_Ortopedia { get; set; }
    public int Estudios_Pre { get; set; }
    public int Externo { get; set; }
    public string PrestadorExternoName { get; set; }
    public int FechaOptativa { get; set; }
    public string txt_observaciones { get; set; }
    public int UsuarioId { get; set; }
    public long PacienteId { get; set; }
    public string Fecha { get; set; }
    public string CirujanoNombre { get; set; }
    public int Etapa { get; set; }
    public int Microscopio { get; set; }
    public string Hemoterapia_Valor { get; set; }
    public int Anestesia { get; set; }
}

public class AtConsultorioCirugia_CirujanoExterno
{
    public int MedicoId { get; set; }
    public string MedicoNombre { get; set; }
    public string MN { get; set; }
    public string MP { get; set; }    
}


public class AtConsultorioCirugia_Etapa
{
    public string Telefono { get; set; }
    public long CirugiaProgramadaID{ get; set; }
    public int Orden { get; set; }
    public string Etapa { get; set; }
    public int EtapaId { get; set; }
    public string FechaInicio { get; set; }
    public string Fecha { get; set; }
    public string Usuario { get; set; }
    public string Observacion { get; set; }
    public int Estado { get; set; }
    public string apellido { get; set; }
    public bool Anulado { get; set; }
    public string Anulado_Fecha { get; set; }
    public string Seccional { get; set; }
    public string documento_real { get; set; }
    public string HC_UOM_CENTRAL { get; set; }
    public string FechaAviso1 { get; set; }
    public string Fechaaviso2 { get; set; }
    public string Fecha_Limite { get; set; }
    public int ResultadoEtapa { get; set; }
}


public class AtConsultorioCirugia_EtapaInfo {
    public long CirugiaProgramadaID { get; set; }
    public int EtapadId { get; set; }
    public int Orden { get; set; }
    public string Descripcion { get; set; }
    public int Estado { get; set; }
    public int Activo{ get; set; }
    public string Fecha { get; set; }
    public string Observacion { get; set; }
}


public class Cirugia_Vaucher
{
    public long CirugiaProgramadaID { get; set; }
    public int servicio { get; set; }
    public string fechaInternacion { get; set; }
    public string horaIntenracion { get; set; }
    public string indicaciones { get; set; }
    public int servicioId { get; set; }
    public string horaIntenacion { get; set; }
}


//====================================================CIRUGIA===============================================================