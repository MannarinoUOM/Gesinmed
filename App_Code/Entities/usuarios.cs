using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Usuarios
/// </summary>
public class usuarios
{
	public usuarios()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public long id { get; set; }
    public string nombre  { get; set; }
    public string usuario { get; set; }
    public bool activo { get; set; }
    public DateTime vencimiento { get; set; }
    public string seccional { get; set; }
    public int seccionalnumero { get; set; }
    public string permisos { get; set; }
    public string permisosB { get; set; }
    public string tipo { get; set; }
    public string ip { get; set; }
    public string interno { get; set; }
    public string Box_Turno_Bono { get; set; }
    public string dni { get; set; }
    public string password { get; set; }
    public string email { get; set; }
    public string perfil { get; set; }
}

public class perfiles
{
    public long id { get; set; }
    public string perfil { get; set; }
    public string permisos { get; set; }
}

public class usuario_edicion
{ 
    public long id { get; set; }
    public string nombre  { get; set; }
    public string usuario { get; set; }
    public bool activo { get; set; }
    public string vencimiento { get; set; }
    public string seccional { get; set; }
    public string tipo { get; set; }
    public int nroperfil { get; set; }
    public string interno { get; set; }
}

public class permisos
{
    public string permiso { get; set; }
    public string permisos_extras { get; set; }
}