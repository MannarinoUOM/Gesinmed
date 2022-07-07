using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for DiagnosticoYclinica
/// </summary>
public class DiagnosticoYclinica
{
	public DiagnosticoYclinica()
	{
		//
		// TODO: Add constructor logic here
		//
	}
    public long Diag_Cli_Resultados_Id { get; set; }
    public long Diabetes_Gral_Id { get; set; }
    public int Diag_Cli_Items_Id { get; set; }
  public  string nombre { get; set; }
  public bool? Diag_Cli_Items_Resultado { get; set; }
}