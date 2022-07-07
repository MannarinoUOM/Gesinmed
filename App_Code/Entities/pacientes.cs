using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for pacientesClass1
/// </summary>
public class pacientes
{
	public pacientes()
	{
		//
		// TODO: Add constructor logic here
		//
	}
    public int Nro_Busqueda { get; set; }
    public string Paciente { get; set; }
    public string Titular { get; set; }
    public string Telefono { get; set; }
    public string Celular { get; set; }
    //public int Documento { get; set; }
    public long NHC { get; set; }

    public long cuil_titu { get; set; }
    public string cod_pariente { get; set; }
    public long cuil { get; set; }
    
    public long documento { get; set; }
    public long documento_real { get; set; }
    public string TipoDoc { get; set; }

    public string sexo  { get; set; }
    public int estado_civil { get; set; }
    public string estado_civil_descripcion { get; set; }
    public DateTime fecha_nacimiento { get; set; }
    public string nacionalidad { get; set; }
    public string calle { get; set; }
    public string numero { get; set; }
    public string piso { get; set; }
    public string dpto { get; set; }
    public string localidad { get; set; }
    public string cod_pos { get; set; }
    public string provincia { get; set; }
    public string tipo_domi { get; set; }
    public string tipo_titular { get; set; }
    public DateTime Fecha_Atualizacion { get; set; }
    public DateTime Fecha_Baja { get; set; }
    public string Seccional { get; set; }
    public string Nro_Seccional { get; set; }
    public int Titular_ID { get; set; }
    public string ObraSocial { get; set; }
    public string NroBenef { get; set; }
    public int OSId { get; set; }
    public int Discapacidad { get; set; }
    public string Edad_Format { get; set; }
    public bool PMI { get; set; }
    public bool PI { get; set; }

    public bool Vencido { get; set; }
    public string FechaVencido { get; set; }
    public string FechaPMI { get; set; }

    public string NHC_UOM { get; set; }
    public string Observaciones { get; set; }
    //fede
    public bool PagaBono { get; set; }

    //Ger
    public string Foto { get; set; }
    public string Soc_Id { get; set; }

    ////////////////////////MANUEL
    public string Fecha_Ultima_Diabetes { get; set; }
    public int semaforo { get; set; }
    public int fec { get; set; }

    public string servicio { get; set; }
    public string sala { get; set; }
    public string cama { get; set; }
    public string carnet { get; set; }
    public string Nombretitular { get; set; }
    public bool Alto_Riesgo { get; set; }
    ////////////////////////MANUEL
    public long CUIT { get; set; }
    public string deuda { get; set; }

}


public class Posiciones{
public Posiciones(){}
public string Documento { get; set; }
public string Estado { get; set; }
public string Descripcion { get; set; }


    //public Guid Id { get; set; }
    //public string Nombre { get; set; }
    //public string Apellidos { get; set; }
    //public string FechaNacimiento { get; set; }

}


public class DATA
{
    public DATA() { }
    public string NroDocumento { get; set; }
    public string Prestador { get; set; }
    public string TextoMedicoSolic { get; set; }


    public string Material { get; set; }
    public string Cantidad { get; set; }
    public string UnidadMedida { get; set; }
    public string PrecioNeto { get; set; }
    public string FechaTurno { get; set; }
    public string DNI { get; set; }
    public string Solicitante { get; set; }
    public string CentroCosto { get; set; }

}