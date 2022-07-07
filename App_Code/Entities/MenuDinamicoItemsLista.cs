using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for MenuDinamicoPermisosLista
/// </summary>
public class MenuDinamicoLista
{
	public MenuDinamicoLista()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public int id { get; set; }
    public int Cod { get; set; }
    public string Principal { get; set; }
    public string Nombre { get; set; }
    public string SubMenu { get; set; }
    public string activo { get; set; }
    public string LinkPaginas { get; set; }
}