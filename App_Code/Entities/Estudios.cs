using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Estudios
/// </summary>
public class Estudios
{
	public Estudios()
	{
		//
		// TODO: Add constructor logic here
		//
	}
    
    public int id {get;set;}
    public string nombre { get; set; }
    public string fecha { get; set; }
    public Int16 normal { get; set; }
    public Int16 patologico { get; set; }
    public Int16 retinopatiaDiabetica { get;set;}
}