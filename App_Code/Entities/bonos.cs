using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for bonos
/// </summary>
public class bonos_encabezado
{
    public bonos_encabezado()
	{
		//
		// TODO: Add constructor logic here
		//
	}
        
    public long cuil { get; set;    }
    public long documento { get; set; }
    public long documento_real { get; set; }
    public string apellido { get; set;}
    public string seccional { get; set; }
    public string telefono { get; set; }
    public string fechabaja { get; set; }
    public int nro_seccional { get; set; }
    public string fecha { get; set; }
    public string hora { get; set; }
    public string medico { get; set; }
    public string especialidad { get; set; }
    public string comentario_turno { get; set; }
    public int motivo_cancelacion { get; set; }
    public bool esconfirmado { get; set; }
    public bool pasoporventanilla { get; set; }
    public DateTime fecha_nacimiento { get; set; }
    public int medicoid { get; set; }
    public int especialidadid { get; set; }
    public int OSId { get; set; }
    public string ObraSocial { get; set; }
    public int Discapacidad { get; set; }
    public string fechaBono { get; set; }
    public int idBono { get; set; }
            
}

public class impresion_bono
{
    public long documento { get; set; }
    public long documento_real { get; set; }
    public string cuil { get; set; }
    public string apellido { get; set; }
    public string fecha_nacimiento { get; set; }
    public string Fecha { get; set; }
    public string Seccional { get; set; }
    public string Medico { get; set; }
    public string Especialidad { get; set; }
    public string Autorizantes { get; set; }
    public long Bono_Id { get; set; }
    public bool ReservaTurnoAhora { get; set; }
    public int BonoporUsuario { get; set; }
    public string Centro { get; set; }
    public int Nro { get; set; }
    public string Nombre_Usuario { get; set; }
    public string OS { get; set; }
    public int Tipo { get; set; }
    public int Discapacidad { get; set; }
    public decimal Valor { get; set; }
    public bool Cancelado { get; set; }
    public string Razon_Social { get; set; }
    public string PatologiaDesc { get; set; }
    public string Foto { get; set; }
    public string Motivo { get; set; }
    public string Autoriza { get; set; }
    public decimal deuda { get; set; }
}
public class bono_cajavale_conceptos
{
    public long id { get; set; }
    public string descripcion { get; set; }

    public bono_cajavale_conceptos() { }
}

public class bono_cajavale
{
    public long bonoid {get; set;}
    public string fecha {get;set;}
	public int concepto {get;set;}
    public decimal importe {get;set;}
    public string observaciones {get;set;}
    public long usuarioid {get;set;}
	public bool baja {get;set;}
    public long bonoid_rel { get; set; }

    public bono_cajavale() { }
}


public class rendicion_bono
{    
    public string cuil { get; set; }
    public string apellido { get; set; }    
    public string Fecha { get; set; }
    public string Autorizantes { get; set; }
    public int Bono_Id { get; set; }
    public int Nro { get; set; }
    public string Nombre_Usuario { get; set; }
    public string Importe { get; set; }
}

public class bono_libre
{
    public string Bono_id { get; set; }
    public string Medico { get; set; }
    public string Especialidad { get; set; }
    public string Fecha { get; set; }
    public string Estado { get; set; }
}

public class bono_terminal
{
    public bono_terminal() { }

    public string Ip { get; set; }
    public string Descripcion { get; set; }
}

public class bono_estado
{
    public string Bono_id { get; set; }
    public string Medico { get; set; }
    public string Especialidad { get; set; }
    public string Fecha { get; set; }
    public bool ReservaTurnoAhora { get; set; }
    public int Nro { get; set; }
    public bool EstaCancelado { get; set; }
    public string FFin { get; set; }
    public int documento { get; set; }
    public string ConfirmadoBono { get; set; }
    public bool PasoporVentanilla { get; set; }
}

public class bono_estado_usado
{
    public string fecha { get; set; }
    public bool usado { get; set; }
    public long id { get; set; }
}

public class bono_practicas_por_usuarios
{
    public string NHC { get; set; }
    public string Paciente { get; set; }
    public string Fecha { get; set; }
    public string Documento { get; set; }
    public string Practica { get; set; }    
}

public class IMG_Bono_Practica
{
    public long Practica_Codigo { get; set; }
    public string Practica_Nombre { get; set; }
    public string Valor { get; set; }
    public string Valor_Afiliado { get; set; }
    public string Valor_Monotributista { get; set; }
}

public class IMG_Bono_Info
{
    public string Paciente { get; set; }
    public int Especialidad { get; set; }
    public int Medico { get; set; }
    public bool usado { get; set; }
    public bool cancelado { get; set; }
    public string fecha_usado { get; set; }    
}

public class mov_Bono
{
    public string hc { get; set; }
    public string fechaMov { get; set; }
    public string usuario { get; set; }
    public string sector { get; set; }
    public decimal importe { get; set; }
    public long bono { get; set; }
    public string medico { get; set; }
    public string especialidad { get; set; }
    public string tipo { get; set; }
}

public class mov_Bono_CC
{
    public decimal mayores { get; set; }
    public string deudasAl {get;set;}
    public int seccional {get;set;}
    public string seccNombre { get; set; }
    public string afiliado {get;set;}
    public string  doc {get;set;}
    public string nhc { get; set; }
    public decimal deuda { get; set; }
}

public class saldo
{
    public long movId { get; set; }
    public long afiliadoId { get; set; }
    public long Nhc { get; set; }
    public string fechaMovimiento { get; set; }
    public int usuario { get; set; }
    public int sector { get; set; }
    public decimal importe { get; set; }
    public string numeroBono { get; set; }
    public string numeroRecibo { get; set; }
    public string hora { get; set; }
    public string observacion { get; set; }
    public string Especialidad { get; set; }
    public int bonoId { get; set; }
    public string fechaBono { get; set; }
    public int baja { get; set; }
    public string fechasTurnos { get; set; }
    public int Entregado { get; set; }
}