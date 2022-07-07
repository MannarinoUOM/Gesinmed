using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for AltaMedca
/// </summary>
public class AltaMedica
{
	public AltaMedica()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public long idAlta { get; set; }
    public long idInternacion { get; set; }
    public long idPaciente { get; set; }
    public int idUsuario { get; set; }
    public int motivoEgreso { get; set; }
    public int autopsia { get; set; }
    public int operado { get; set; }
    public string fechaDeAtencion { get; set; }
    public string fechaDeModificacion { get; set; }
    public string fecha { get; set; }
    public string diasOperatorio { get; set; }
    public string cirugiaRealizada { get; set; }
    public string princpal { get; set; }
    public string conmitentes { get; set; }
    public string complicaciones { get; set; }
    public string observaciones { get; set; }
    public int medicoId { get; set; }

}