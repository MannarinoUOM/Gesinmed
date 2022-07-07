using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for hosppor
/// </summary>
public class hosppor
{
	public hosppor()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public int id { get; set; }
    public string descripcion { get; set; }
}

public class motivoIngreso
{
    public int id { get; set; }
    public string motivo { get; set; }
}

public class motivoEgreso
{
    public int id { get; set; }
    public string motivo { get; set; }
}