using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for turnera
/// </summary>
public class turnera
{
	public turnera()
	{
		//
		// TODO: Add constructor logic here
		//
	}
    
}

public class turneraAC
{
    public string paciente { get; set; }
    public string consultorio { get; set; }
    public string medico { get; set; }
    public string cod_llamado { get; set; }
}

public class turnera_administracion
{
    public long id { get; set; }
    public string turnera { get; set; }
    public string consultorios { get; set; }
}

public class turnera_bonos
{
    public long id { get; set; }
    public string paciente { get; set; }
    public string box { get; set; }
}