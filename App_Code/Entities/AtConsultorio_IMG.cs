using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descripción breve de AtConsultorio_IMG
/// </summary>
public class AtConsultorioIMG_CAB
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
    public string alias { get; set; }
}

    public class AtConsultorioIMG_item
    {
        public long protocolo { get; set; }

        public string txt_1_cant { get; set; }
        public string txt_2_cant { get; set; }
        public string txt_3_cant { get; set; }
        public string txt_4_cant { get; set; }
        public string txt_5_cant { get; set; }
        public string txt_6_cant { get; set; }
        public string txt_7_cant { get; set; }
        public string txt_8_cant { get; set; }
        public string txt_9_cant { get; set; }
        public string txt_10_cant { get; set; }

        public string txt_otros_desc_1 { get; set; }
        public string txt_otros_desc_2 { get; set; }

        public string txt_otros_1 { get; set; }
        public string txt_otros_2 { get; set; }

        public string txt_cant_placas { get; set; }
        public string cbo_realizalopedido { get; set; }
        public string txt_fundamentar { get; set; }

    }

    public class AtConsultorioIMG_subconsulta
    {
        public long ATIMG_Turno_Id { get; set; }
        public string ATIMG_Fecha_Carga { get; set; }
        public string ATIMG_Comentario { get; set; }
        public string ATIMG_Alias { get; set; }
        public int ATIMG_Tipo { get; set; }
        public string ATIMG_Voz { get; set; }
    }

    public class Chequeo_gral_carga_Lista_Practicas
    {
        public long Turno_Id { get; set; }
        public long Practica_Id { get; set; }
        public string Detalle { get; set; }
    }