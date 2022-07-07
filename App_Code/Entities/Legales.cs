using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descripción breve de Legales
/// </summary>

public class Legales_Cabecera
{
    public Legales_Cabecera () { }

    public long IdReq {get;set;}
    public string Fecha {get;set;}
    public string Afiliado_Nombre {get;set;}
    public long AfiliadoId {get;set;}
    public string NHC_UOM {get;set;}
    public bool Es_UOM {get;set;}
    public int IdReqTipo {get;set;}
    public long UsuarioId {get;set;}
    public bool Baja {get;set;}
}

public class Legales_Detalle
{
    public Legales_Detalle() { }

    public long IdDetalle {get;set;}
    public long IdReq {get;set;}
    public string PedidoPor {get;set;}
    public string NroNota {get;set;}
    public bool EsSecuestro {get;set;}
    public bool EsART { get; set; }
    public bool EsObito { get; set; }
    public string Observaciones {get;set;}
}

public class Legales_Adjuntos
{
    public Legales_Adjuntos() { }

    public long IdDetalle { get; set; }
    public long IdReq { get; set; }
    public string RutaArchivo { get; set; }
    public bool Estado { get; set; }
    public string FechaSistema { get; set; }
}

public class Legales_Buscar_Req
{
    public Legales_Buscar_Req() { }

    public long IdReq { get; set; }
    public string Fecha { get; set; }
    public string Afiliado_Nombre { get; set; }
    public string NHC_UOM { get; set; }
    public string PedidoPor { get; set; }
    public string Requerimiento { get; set; }
    public string NroNota { get; set; }
}

public class Legales_TipoRequerimiento
{
    public Legales_TipoRequerimiento() { }

    public long IdReqTipo { get; set; }
    public string Requerimiento { get; set; }
    public bool Activo { get; set; }
}

public class Legales_TipoDocumentacion
{
    public Legales_TipoDocumentacion() { }

    public int IdDocumentacion {get;set;}
    public string Documentacion {get;set;}
    public bool Activo { get; set; }
}


