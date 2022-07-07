using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for quirofano
/// </summary>
public class Quirofano
{
    public int id { get; set; }
    public string nhc { get; set; }
    public string fecha { get; set; }
    public string hora { get; set; }
    public int diagnostico_id { get; set; }
    public bool urgencia { get; set; }
    public int sala_id { get; set; }
    public int cama_id { get; set; }
    public int cirugia_tipo_id { get; set; }
    public int cirujano_especialidad_id { get; set; }
    public int cirujano_id { get; set; }
    public int ayudante_id { get; set; }
    public int ayudante2_id { get; set; }
    public int ayudante3_id { get; set; }    
    public bool efectuada { get; set; }
    public int anestesista_id { get; set; }
    public int anestesia_tipo_id { get; set; }
    public string hemo { get; set; }
    public bool cbo_hemo { get; set; }
    public bool cbo_anpa { get; set; }
    public bool cbo_rayos { get; set; }
    public bool cbo_monitoreo { get; set; }
    public int medico_solicitante { get; set; }
    public string observaciones { get; set; }
    public int motivo_susp_id { get; set; }
    public bool baja { get; set; }
    public int quien_dio_baja_id { get; set; }
    public DateTime fecha_baja { get; set; }
    public int usuario_id { get; set; }

    public int Instrumentalista_Id { get; set; }
    public int Circulante_id { get; set; }
    public int Monitoreo_id { get; set; }
    public long usuario_id_modificacion { get; set; }
    public string usuario_modificacion { get; set; }
    public string motivo_modificacion { get; set; }
    public string OtrosInsumos { get; set; }

    public string externo_medico { get; set; }
    public string externo_medico_matricula { get; set; }

    public string hora_ingreso_UCPA_pre { get; set; }
    public string hora_ingreso_UCPA_post { get; set; }

    public string hora_inicio { get; set; }
    public string hora_fin { get; set; }
    
    public string peso { get; set; }
    public string cirugias_ck { get; set; }
    public string diagnosticos_ck { get; set; }
    public bool cb_polisomnografia { get; set; }
        
}

public class Quirofano_Diagnostico
{
    public int id { get; set; }
    public string diagnostico { get; set; }
    public bool estado { get; set; }
}

public class Quirofano_Cirugia
{
    public int id { get; set; }
    public string cirugia { get; set; }
    public bool estado { get; set; }
}

[Serializable]
public class Anestesia
{
    public int id { get; set; }
    public string tipo { get; set; }

}

public class Cirugia_Tipo
{
    public int id { get; set; }
    public string tipo { get; set; }
}

public class Quirofano_Listado
{
    public string Id { get; set; }
    public string Hora { get; set; }
    public string Fecha { get; set; }
    public string Sala { get; set; }
    public string Cama { get; set; }
    public string Paciente { get; set; }
    public string HC { get; set; }
    public string Diagnostico { get; set; }
    public string Cirugia { get; set; }
    public string Cirujano { get; set; }
    public string Ayudante { get; set; }
    public string Anestesia { get; set; }
    public string Anestesista { get; set; }
    public string Seccional { get; set; }
    public bool Urgencia { get; set; }
    public string Hemo { get; set; }
    public bool AP { get; set; }
    public bool Monitoreo { get; set; }
    public bool Rayos { get; set; }
    public string Observaciones { get; set; }
    public string MotivoSusp { get; set; }
    public string Especialidad { get; set; }
    public string AL { get; set; }
    public string AM { get; set; }
    public string AN { get; set; }
    public string Motivo_Descripcion { get; set; }
    public string Hora_Fin { get; set; }
    
}

public class MotivoSusp
{
    public int id { get; set; }
    public string motivo { get; set; }
}


[Serializable]
public class Insumo_Pre
{
    public Insumo_Pre()
    {

    }

    private long _id;
    public long Id
    {
        get { return _id; }
        set { _id = value; }
    }

    private int _insumo_Id;
    public int Insumo_Id
    {
        get { return _insumo_Id; }
        set { _insumo_Id = value; }
    }

    private int _cantidad;
    public int Cantidad
    {
        get { return _cantidad; }
        set { _cantidad = value; }
    }

    private string _observacion;
    public string Observacion
    {
        get { return _observacion; }
        set { _observacion = value; }
    }

    private int _monodroga;
    public int Monodroga
    {
        get { return _monodroga; }
        set { _monodroga = value; }
    }

    private int _tipo;
    public int Tipo
    {
        get { return _tipo; }
        set { _tipo = value; }
    }  
}






[Serializable]
public class Insumo
{
    public Insumo()
    {

    }

    private long _id;
    public long Id
    {
        get { return _id; }
        set { _id = value; }
    }

    private int _seccional;
    public int Seccional
    {
        get { return _seccional; }
        set { _seccional = value; }
    }

    private string _descripcion;
    public string Descripcion
    {
        get { return _descripcion; }
        set { _descripcion = value; }
    }

    private string _descripcion_resumida;
    public string DescripcionResumida
    {
        get { return _descripcion_resumida; }
        set { _descripcion_resumida = value; }
    }
    private string presentacion;

    public string Presentacion
    {
        get { return presentacion; }
        set { presentacion = value; }
    }

    private string gramaje;
    public string Gramaje
    {
        get { return gramaje; }
        set { gramaje = value; }
    }

    private string _medida;

    public string Medida
    {
        get { return _medida; }
        set { _medida = value; }
    }

    public string FullDescription
    {
        get { return Descripcion + " - " + presentacion + " - " + Gramaje + " " + Medida; }
    }

    private int _cantidad;
    public int Cantidad
    {
        get { return _cantidad; }
        set { _cantidad = value; }
    }

    private int _monodroga;
    public int Monodroga
    {
        get { return _monodroga; }
        set { _monodroga = value; }
    }

    private int _plantilla;
    public int Plantilla
    {
        get { return _plantilla; }
        set { _plantilla = value; }
    }

    private string _observacion;
    public string Observacion
    {
        get { return _observacion; }
        set { _observacion = value; }
    }

    private int _rubro;
    public int Rubro
    {
        get { return _rubro; }
        set { _rubro = value; }
    }
    
}

public class Quirofano_PreAnes_Enc
{
    public int Id { get; set; }
    public string Paciente { get; set; }
    public int CamaId { get; set; }
    public string Cama { get; set; }
    public bool Urgencia { get; set; }
    public string Fecha { get; set; }
    public string NHC { get; set; }
    public int DiagnosticoId { get; set; }
    public string Diagnostico { get; set; }
    public string Anestesista { get; set; }
    public int AnestesistaId { get; set; }
    public string Anestesia { get; set; }
    public int AnestesiaId { get; set; }
    public string Observaciones { get; set; }

    public string Cirujano { get; set; }
    public string Monitoreo { get; set; }
    public string Cirugia { get; set; }

    public string Paciente_Id { get; set; }

}

public class PreQuirurgico
{
    public int id { get; set; }
    public string paciente { get; set; }
    public string cama { get; set; }
    public bool urgencia { get; set; }
    public string fecha { get; set; }
    public string nhc { get; set; }
    public string diagnostico { get; set; }
    public string cirujano { get; set; }
    public string anestesista { get; set; }
    public string anestesia { get; set; }
    public string observacion_encabezado { get; set; }
    public string enfermero { get; set; }

    //Signos Vitales
    public string PRE_HORA_INGRESO { get; set; }
    public bool PRE_AYUNO { get; set; }
    public string PRE_OBS_1 { get; set; }
    public string PRE_HS_UCPA_INGRESO_Q { get; set; }
    public bool PRE_ING_VENOCLISIS { get; set; }
    public int PRE_ANTITETANICA_DOSIS { get; set; }
    public bool PRE_BANIO_PRE_QX { get; set; }
    public bool PRE_PROFILAXIS_ATB { get; set; }
    public string PRE_OBS_2 { get; set; }
    public bool PRE_PROTESIS_DENTARIA { get; set; }
    public string PRE_OBS_3 { get; set; }
    public string PRE_RIESGO_Q_FECHA { get; set; }
    public int PRE_TIPO { get; set; }
    public string PRE_CONTROL_SIGNOS_VITALES_TA { get; set; }
    public string PRE_CONTROL_SIGNOS_VITALES_FC { get; set; }
    public string PRE_CONTROL_SIGNOS_VITALES_FR { get; set; }
    public string PRE_CONTROL_SIGNOS_VITALES_TEMP { get; set; }
    public string PRE_CONTROL_SIGNOS_VITALES_SPO2 { get; set; }
    public string PRE_OBS_4 { get; set; }
    public string PRE_LABORATORIO_FECHA { get; set; }
    public string PRE_LABORATORIO_HTO { get; set; }
    public string PRE_LABORATORIO_HB { get; set; }
    public string PRE_LABORATORIO_PLAQUETAS { get; set; }
    public string PRE_LABORATORIO_KPTT { get; set; }
    public string PRE_LABORATORIO_QUICK { get; set; }
    public string PRE_LABORATORIO_GLUCEMIA { get; set; }
    //public string PRE_TIPO { get; set; }
    public bool PRE_ANTECEDENTES_HTA { get; set; }
    public bool PRE_ANTECEDENTES_DBT { get; set; }
    public bool PRE_ANTECEDENTES_ENF_RESPIRATORIAS { get; set; }
    public bool PRE_ANTECEDENTES_ENF_CARDIACAS { get; set; }
    public string PRE_OBS_5 { get; set; }
    public string PRE_OBS_6 { get; set; }
    public long QUI_CIR_ID { get; set; }
    public long PRE_USUARIO_ID { get; set; }
    public string PRE_FECHA_IMPRESION { get; set; }
    public string Peso { get; set; }

    public string PRE_UNIDAD_SANGRE { get; set; }
    public string PRE_PEDIDO_SANGRE { get; set; }
    public string PRE_GRUPO { get; set; }
    public string PRE_FACTOR { get; set; }
    public bool pedido_sangre_turno { get; set; }
    public bool PRE_MONITOREO { get; set; }
}

[Serializable]
public class Quirofano_ControlSignosVitales
{
    public int Cirugia_Id { get; set; }
    public int Id { get; set; }
    public string TA { get; set; }
    public string FC { get; set; }
    public string FR { get; set; }
    public string Temperatura { get; set; }
    public string Hora { get; set; }

}

public class Quirofano_RecPosAnestesia
{
    public int Cirugia_Id { get; set; }
    public string S_Fisiologica { get; set; }
    public string Dextrosa { get; set; }
    public string RingerLactato { get; set; }
    public string ExpansorPlasmatico { get; set; }
    public string ExpansorPlasmatico2 { get; set; }
    public string Sat02 { get; set; }
    public string Hs { get; set; }
    public string Hs2 { get; set; }
    public string Hs3 { get; set; }
    public string Hs4 { get; set; }
    public string Hs5 { get; set; }
    public string Hematocrito { get; set; }
    public string HB { get; set; }
    public string KPTT { get; set; }
    public string Quick { get; set; }
    public string Hs6 { get; set; }
    public string PH { get; set; }
    public string PCo2 { get; set; }
    public string Po2 { get; set; }
    public string EB { get; set; }
    public string HCO3 { get; set; }
    public string Na { get; set; }
    public string Sat { get; set; }
    public string Cl { get; set; }
    public string POTASIO { get; set; }
    public bool Canula { get; set; }
    public bool Mascara { get; set; }
    public string HoraEgreso { get; set; }
    public string Aspiracion { get; set; }
    public string Observacion { get; set; }
    public string SangradoIntra { get; set; }
    public string Diuresis { get; set; }
    public string Fluidos { get; set; }

}


public class Quirofano_Protocolos
{

    public int Id { get; set; }
    public int Cirugia_Id { get; set; }
    public string Descripcion_Esquema { get; set; }
    public string Descripcion_Macro { get; set; }
    public bool Biopsia { get; set; }
    public string Biopsia_Detalle { get; set; }
    public string Diagnostico_PostOperatorio_Id { get; set; }
    public int usuario_id { get; set; }
    public string usuario { get; set; }
    public string observaciones { get; set; } 
}

[Serializable]
public class Resolucion28
{
    public int id { get; set; }
    public string nhc { get; set; }
    public int operacion { get; set; }


    private int _circulante_confirma;
    private int _paciente_puede_responder;
    private int _control_de_equipamento_anestesia;
    private int _oximetro_de_pulso_colocado_y_funcionando;
    private int _verificacion_de_existencia_de_alergia_conocidas;
    private int _chequeo_de_via_aerea;
    private int _verificacion_de_profilaxis_antibioticos;
    private int _equipos_quirurgicos_conoce_comorbilidades;
    private int _demarcacion_de_sitios;
    private int _chequeo_de_disponibilidad_de_estudio_complementario;
    private int _verificacion_de_riesgos_hemorragia;
    private int _confirmacion_esterilidad;
    private int _cirujano_e_instrumentadora_verificaron_materiales;
    private int _chequeo_del_correcto_funcionamiento_de_todos;

    private int _que_todos_los_miembros_del_equipo_q_presentes;
    private int _que_todos_los_miembros_del_equipo_s_h_presentados;
    private int _cirujano_circulante_anestesista_corfirman_verbalmente;
    private int _chequeo_de_control_de_decubitos_y_f;

    private int _el_cirujano_revisa_en_voz;
    private int _anestesista_revisa_en_voz;

    private int _el_nombre_del_procedimiento_realizado;
    private int _el_recuento_de_instrumental;
    private int _rotulado_de_muestras;
    private int _si_se_detectaron_problemas;
    private int _cirujano_anestesista_y_circulante_revisaran;
    private int _transpaso_escrito_de_medicamentos;
    private int _control_de_normotermia;

    private int _parte_quirurgicos_c;
    private int _parte_anestesicos_c;



    public int A1 { get { return _circulante_confirma; } set { if ((value >= 1) && (value <= 3)) { _circulante_confirma = value; } else _circulante_confirma = 0; } }
    public int A2 { get { return _paciente_puede_responder; } set { if ((value >= 1) && (value <= 3)) { _paciente_puede_responder = value; } else _paciente_puede_responder = 0; } }
    public int A3 { get { return _control_de_equipamento_anestesia; } set { if ((value >= 1) && (value <= 3)) { _control_de_equipamento_anestesia = value; } else _control_de_equipamento_anestesia = 0; } }
    public int A4 { get { return _oximetro_de_pulso_colocado_y_funcionando; } set { if ((value >= 1) && (value <= 3)) { _oximetro_de_pulso_colocado_y_funcionando = value; } else _oximetro_de_pulso_colocado_y_funcionando = 0; } }
    public int A5 { get { return _verificacion_de_existencia_de_alergia_conocidas; } set { if ((value >= 1) && (value <= 3)) { _verificacion_de_existencia_de_alergia_conocidas = value; } else _verificacion_de_existencia_de_alergia_conocidas = 0; } }
    public int A6 { get { return _chequeo_de_via_aerea; } set { if ((value >= 1) && (value <= 3)) { _chequeo_de_via_aerea = value; } else _chequeo_de_via_aerea = 0; } }
    public int A7 { get { return _verificacion_de_profilaxis_antibioticos; } set { if ((value >= 1) && (value <= 3)) { _verificacion_de_profilaxis_antibioticos = value; } else _verificacion_de_profilaxis_antibioticos = 0; } }
    public int A8 { get { return _equipos_quirurgicos_conoce_comorbilidades; } set { if ((value >= 1) && (value <= 3)) { _equipos_quirurgicos_conoce_comorbilidades = value; } else _equipos_quirurgicos_conoce_comorbilidades = 0; } }
    public int A9 { get { return _demarcacion_de_sitios; } set { if ((value >= 1) && (value <= 3)) { _demarcacion_de_sitios = value; } else _demarcacion_de_sitios = 0; } }
    public int A10 { get { return _chequeo_de_disponibilidad_de_estudio_complementario; } set { if ((value >= 1) && (value <= 3)) { _chequeo_de_disponibilidad_de_estudio_complementario = value; } else _chequeo_de_disponibilidad_de_estudio_complementario = 0; } }
    public int A11 { get { return _verificacion_de_riesgos_hemorragia; } set { if ((value >= 1) && (value <= 3)) { _verificacion_de_riesgos_hemorragia = value; } else _verificacion_de_riesgos_hemorragia = 0; } }
    public int A12 { get { return _confirmacion_esterilidad; } set { if ((value >= 1) && (value <= 3)) { _confirmacion_esterilidad = value; } else _confirmacion_esterilidad = 0; } }
    public int A13 { get { return _cirujano_e_instrumentadora_verificaron_materiales; } set { if ((value >= 1) && (value <= 3)) { _cirujano_e_instrumentadora_verificaron_materiales = value; } else _cirujano_e_instrumentadora_verificaron_materiales = 0; } }
    public int A14 { get { return _chequeo_del_correcto_funcionamiento_de_todos; } set { if ((value >= 1) && (value <= 3)) { _chequeo_del_correcto_funcionamiento_de_todos = value; } else _chequeo_del_correcto_funcionamiento_de_todos = 0; } }

    public int B1 { get { return _que_todos_los_miembros_del_equipo_q_presentes; } set { if ((value >= 1) && (value <= 3)) { _que_todos_los_miembros_del_equipo_q_presentes = value; } else _que_todos_los_miembros_del_equipo_q_presentes = 0; } }
    public int B2 { get { return _que_todos_los_miembros_del_equipo_s_h_presentados; } set { if ((value >= 1) && (value <= 3)) { _que_todos_los_miembros_del_equipo_s_h_presentados = value; } else _que_todos_los_miembros_del_equipo_s_h_presentados = 0; } }
    public int B3 { get { return _cirujano_circulante_anestesista_corfirman_verbalmente; } set { if ((value >= 1) && (value <= 3)) { _cirujano_circulante_anestesista_corfirman_verbalmente = value; } else _cirujano_circulante_anestesista_corfirman_verbalmente = 0; } }
    public int B4 { get { return _chequeo_de_control_de_decubitos_y_f; } set { if ((value >= 1) && (value <= 3)) { _chequeo_de_control_de_decubitos_y_f = value; } else _chequeo_de_control_de_decubitos_y_f = 0; } }
    public int B5 { get { return _el_cirujano_revisa_en_voz; } set { if ((value >= 1) && (value <= 3)) { _el_cirujano_revisa_en_voz = value; } else _el_cirujano_revisa_en_voz = 0; } }
    public int B6 { get { return _anestesista_revisa_en_voz; } set { if ((value >= 1) && (value <= 3)) { _anestesista_revisa_en_voz = value; } else _anestesista_revisa_en_voz = 0; } }

    public int C1 { get { return _el_nombre_del_procedimiento_realizado; } set { if ((value >= 1) && (value <= 3)) { _el_nombre_del_procedimiento_realizado = value; } else _el_nombre_del_procedimiento_realizado = 0; } }
    public int C2 { get { return _el_recuento_de_instrumental; } set { if ((value >= 1) && (value <= 3)) { _el_recuento_de_instrumental = value; } else _el_recuento_de_instrumental = 0; } }
    public int C3 { get { return _rotulado_de_muestras; } set { if ((value >= 1) && (value <= 3)) { _rotulado_de_muestras = value; } else _rotulado_de_muestras = 0; } }
    public int C4 { get { return _si_se_detectaron_problemas; } set { if ((value >= 1) && (value <= 3)) { _si_se_detectaron_problemas = value; } else _si_se_detectaron_problemas = 0; } }
    public int C5 { get { return _cirujano_anestesista_y_circulante_revisaran; } set { if ((value >= 1) && (value <= 3)) { _cirujano_anestesista_y_circulante_revisaran = value; } else _cirujano_anestesista_y_circulante_revisaran = 0; } }
    public int C6 { get { return _transpaso_escrito_de_medicamentos; } set { if ((value >= 1) && (value <= 3)) { _transpaso_escrito_de_medicamentos = value; } else _transpaso_escrito_de_medicamentos = 0; } }
    public int C7 { get { return _control_de_normotermia; } set { if ((value >= 1) && (value <= 3)) { _control_de_normotermia = value; } else _control_de_normotermia = 0; } }
    public int C8 { get { return _parte_quirurgicos_c; } set { if ((value >= 1) && (value <= 3)) { _parte_quirurgicos_c = value; } else _parte_quirurgicos_c = 0; } }
    public int C9 { get { return _parte_anestesicos_c; } set { if ((value >= 1) && (value <= 3)) { _parte_anestesicos_c = value; } else _parte_anestesicos_c = 0; } }

    public string observaciones { get; set; }


}

[Serializable]
public class QuirofanoProtesis
{
    public int id { get; set; }
    public string nombre { get; set; }
    public int Nuevo { get; set; }
    public string cantidad { get; set; }
    public long usuario { get; set; }
    public long operacion_Id { get; set; }
    public int monodroga { get; set; }
    public long insumo_id { get; set; }
    public string codigobarra { get; set; }
    public string comentario { get; set; }
    public string tipo { get; set; }
    public string medida { get; set; }
    public string marca { get; set; }
    public int Estado { get; set; }
}

public class Quirofano_Protesis_Cab
{
    public int id { get; set; }
    public string servicio { get; set; }
    public string servicio_nombre { get; set; }
    public string ortopedia { get; set; }
    public bool material { get; set; }
    public long usuario { get; set; }
    public string observaciones { get; set; }
    public string diagnostico { get; set; }
}

public class DiagnosticoICD10
{
    public string Codigo { get; set; }
    public string Id { get; set; }
    public string Descripcion { get; set; }

    public DiagnosticoICD10()
    {
    }

    public DiagnosticoICD10(string Id, string Descripcion)
    {
        this.Id = Id;
        this.Descripcion = Descripcion;
    }
}

public class Sala_y_Cama
{
    public string Sala { get; set; }
    public string Cama { get; set; }
}


public class Quirofano_turnos_totales
{
    public int todos { get; set; }
    public int ocupados { get; set; }
    public int cancelados { get; set; }
    public int urgencias { get; set; }
    public int realizadas { get; set; }
}


public class Insumo_PRE_Anestesia_Listado
{
    public string Insumo { get; set; }
    public string Cantidad { get; set; }
    public string Observacion { get; set; }    
}

public class Insumo_y_Protesis_Insumo
{
    public long id { get; set; }
    public int cantidad { get; set; }
    public string descripcion { get; set; }
}


public class Protocolo_Cirugia_Info
{
    public string Hora_Inicio { get; set; }
    public string Hora_Fin { get; set; }
    public string Diagnostico { get; set; }
    public string Diagnostico_Id { get; set; }
    public string Especialidad { get; set; }
    public string Cirujano { get; set; }
    public string Ayudante1 { get; set; }    
    public string Ayudante2 { get; set; }
    public string Ayudante3 { get; set; }
    public string Monitoreo { get; set; }
    public string Anestesista { get; set; }
    public string Instrument { get; set; }
    public string nhc { get; set; }
    public string Fecha { get; set; }
    public string Cirugia { get; set; }
    public string ck_Monitoreo { get; set; }
}


public class Qurifano_Insumo
{
    public Qurifano_Insumo()
    {

    }

    private int _insumo_Id;
    public int Insumo_Id
    {
        get { return _insumo_Id; }
        set { _insumo_Id = value; }
    }

    private int _cantidad;
    public int Cantidad
    {
        get { return _cantidad; }
        set { _cantidad = value; }
    }

}


public class Parte_Anestesia
{
    public string Especialidad { get; set; }
    public string Hora_Ingreso { get; set; }
    public string Hora_Fin { get; set; }
    public string Edad { get; set; }
    public string Peso { get; set; }
    public string Premeditacion { get; set; }
    public int Induccion { get; set; }
    public string Sangre { get; set; }
    public string Plasma { get; set; }
    public string Suero { get; set; }
    public string Otro { get; set; }
    public string HALLAZGOS_FISICOS_ANORMALES { get; set; }
    public string AGENTES_ANESTESICOS { get; set; }
    public string METODOS_ANESTESICOS { get; set; }
    public string RECUPERACION { get; set; }
    public string OBSERVACIONES { get; set; }
    public string SEXO { get; set; }
}





public class Post_csv
{
    public long id { get; set; }    
    public string txt_TA { get; set; }
    public string txt_FC { get; set; }
    public string txt_FR { get; set; }
    public string txt_TEMP { get; set; }
    public string txt_SPO2 { get; set; }
    public string txt_hora { get; set; }
    public bool eliminado { get; set; }    
}

public class Post_Monitoreo
{
    public long id { get; set; }    
    public string txt_sato2 { get; set; }
    public string txt_hto { get; set; }
    public string txt_hb { get; set; }
    public string txt_ph { get; set; }
    public string txt_po2 { get; set; }
    public string txt_pco2 { get; set; }
    public string txt_quick { get; set; }
    public string txt_hco3 { get; set; }
    public string txt_na { get; set; }
    public string txt_cl { get; set; }
    public string txt_k { get; set; }
    public string txt_kptt { get; set; }
    public string txt_sat { get; set; }
    public string txt_eb { get; set; }
    public string txt_hora2 { get; set; }
    public bool eliminado { get; set; }
}


public class Post_Gral
{
    public string txt_sol_fisiologica { get; set; }
    public string txt_dextrosa { get; set; }
    public string txt_ringer_lactato { get; set; }
    public string txt_expansor_plasmatico { get; set; }
    public string txt_observaciones { get; set; }
    public string txt_hora_fin { get; set; }
    public string txt_hora_ingreso { get; set; }
    public long cirugia_id { get; set; }
    public bool eliminado { get; set; }
    public bool sondas_nasogastrica { get; set; }
    public bool sondas_vesical { get; set; }
    public int cant_sondas { get; set; }
    public string enfermero { get; set; }
}

public class Quirofano_Estado
{
    public int PRE { get; set; }
    public int R28_COMPLETO { get; set; }
    public int R28_ALGO { get; set; }
    public int QX { get; set; }    
}

public class Quirofano_Permisos_Tiempo
{
    public bool Puedo { get; set; }
    public string Dias { get; set; }
}







public class INSUMO_EXTRA
{
    public long id { get; set; }
    public string codigo { get; set; }
    public string nombre { get; set; }    
    public string observacion { get; set; }
    public int stock_minimo { get; set; }
    public string motivo { get; set; }
    public string usuario { get; set; }
    public string fecha_movimiento { get; set; }
    public int ServicioID { get; set; }

    public string fecha_vencimiento { get; set; }

    public int stock_actual { get; set; }
    public int OrtopediaID { get; set; }

    public bool material_uom { get; set; }
    public int cantidad { get; set; }
        
    public long medida { get; set; }
    public long tipo { get; set; }
    public long marca { get; set; }

    public string smedida { get; set; }
    public string stipo { get; set; }
    public string smarca { get; set; }
    public string sservicio { get; set; }

    public string comentario { get; set; }
    public bool enstock { get; set; }
    public string deposito { get; set; }
    public string paciente { get; set; }
    
}


public class INSUMO_EXTRA_STOCK
{
    public long insumo_id { get; set; }
    public int stock { get; set; }
    public string fecha { get; set; }
    public long usuario_id { get; set; }
    public string ultima_fecha_guardada { get; set; }    
}


public class INSUMO_EXTRA_SERVICIO
{
    public long id { get; set; }    
    public string descripcion { get; set; }
    public string abreviatura { get; set; }   
}

public class INSUMO_EXTRA_ORTOPEDIA {
    public long id { get; set; }
    public string descripcion { get; set; }    
}


public class INSUMO_EXTRA_MOTIVO
{
    public long id { get; set; }
    public string descripcion { get; set; }
}


public class INSUMO_EXTRA_MOVIMIENTO
{
    public long insumoid { get; set; }
    public string movimiento { get; set; }
    public int motivo_id { get; set; }
    public string motivo_descripcion { get; set; }
    public string observacion { get; set; }
    public int stock_minimo { get; set; }
}



public class INSUMO_EXTRA_RUBRO
{
    public int RubroId { get; set; }
    public string Rubro { get; set; }    
}


public class INSUMO_EXTRA_TIPO
{
    public long TipoId { get; set; }
    public int RubroId { get; set; }
    public string Tipo { get; set; }
}

public class INSUMO_EXTRA_MEDIDA
{
    public long TipoId { get; set; }
    public long MedidaId { get; set; }
    public int RubroId { get; set; }
    public string Medida { get; set; }
}


public class IMPRESION_ESTADOS
{
    public Boolean R28 { get; set; }
    public Boolean Protocolo { get; set; }
    public Boolean Post { get; set; }
    public Boolean InsumoQX { get; set; }
    public Boolean Parte { get; set; }
    public Boolean Extra_v { get; set; }
    public Boolean Extra_n { get; set; }
    public Boolean Pre { get; set; }
}