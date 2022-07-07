using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for ordenes_estudios_plantillas
/// </summary>
public class ordenes_estudios_plantillas
{
	public ordenes_estudios_plantillas()
	{
		//
		// TODO: Add constructor logic here
		//
	}
}


public class ordenes_estudio_cabecera
{
    public ordenes_estudio_cabecera() { }

    public int IdPlantilla { get; set; }
    public string Servicio { get; set; }
    public bool Estado { get; set; }
}


public class ordenes_estudio_detalle
{
    public ordenes_estudio_detalle() { }

    public int IdDetalle { get; set; }
    public int IdPlantilla { get; set; }
    public string Estudio { get; set; }
    public bool Estado { get; set; }
}