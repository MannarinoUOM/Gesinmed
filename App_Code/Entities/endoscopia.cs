using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descripción breve de endoscopia
/// </summary>
public class Endoscopia_ProEndoscoDibujo
{
    public long Id { get; set; }
    public long Cirugia_Id { get; set; }
    public bool Fibra_Optica { get; set; }
    public string Informe_Endoscopico { get; set; }
    public bool Ins_Rigido { get; set; }
    public bool ck_Biopsia { get; set; }    

    public string Resumen_de_Historia_Clinica { get; set; }

    public bool cbo_BAAR_1 { get; set; }
    public bool cbo_Citologia_1 { get; set; }
    public bool cbo_Micologia_1 { get; set; }
    public bool cbo_Bacteriologia_1 { get; set; }
    public bool cbo_Biopsia_1 { get; set; }
    public bool cbo_Citologia_2 { get; set; }
    public bool cbo_Bacteriologia_2 { get; set; }
    public bool cbo_BAAR_3 { get; set; }
    public bool cbo_Citologia_3 { get; set; }
    public bool cbo_Micologia_3 { get; set; }
    public bool cbo_Bacteriologia_3 { get; set; }
    public bool cbo_Biopsia_3 { get; set; }

    

}


public class Endoscopia_ProEndoscoFCC
{
    public long Id { get; set; }
    public long Cirugia_Id { get; set; }

    public bool Biopsia { get; set; }
    public bool Cepillado { get; set; }
    
    public string Insepeccion { get; set; }
    public string Fibrocolonoscopia { get; set; }
    public string Impresion_Diagnostica { get; set; }

    public string Notas { get; set; }
    public int Resultado1 { get; set; }
    public int Resultado2 { get; set; }
    public int Resultado3 { get; set; }
    public int Resultado4 { get; set; }

    public string Video { get; set; }
    
}



public class Endoscopia_ProEndoscoFeda
{
    public long Id { get; set; }
    public long Cirugia_Id { get; set; }

    public bool Biopsia { get; set; }
    public bool Cepillado { get; set; }

    public string Esofago { get; set; }
    public string Estomago { get; set; }
    public string Duodeno { get; set; }
    public string Impresion_Diagnostica { get; set; }

    public string Notas { get; set; }
    public int Resultado1 { get; set; }
    public int Resultado2 { get; set; }
    public int Resultado3 { get; set; }
    public int Resultado4 { get; set; }

    public string Video { get; set; }

}