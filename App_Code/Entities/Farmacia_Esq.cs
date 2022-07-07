using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Farmacia_Esquina
/// </summary>
public class Farmacia_Esq
{
	public Farmacia_Esq()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public long EXP_ID { get; set; }
    public long EXP_REMITO { get; set; }
    public string EXP_NOMBRE { get; set; }
    public int EXP_DIAG_ID { get; set; }
    public int EXP_NRO_DOC { get; set; }
    public string EXP_VENC_FECHA_DESDE { get; set; }
    public string EXP_VENC_FECHA_HASTA { get; set; }
    public long NRO_PEDIDO { get; set; }
    public string SeccionalesIds { get; set; }
    public string PatologiasIds { get; set; }

    public long PDT_ID { get; set; }
    public long PDT_PED_ID { get; set; }
    public long PDT_INS_ID { get; set; }
    public int CANT_PEDIDA { get; set; }
    public decimal DESCUENTO { get; set; }
    public string OBS { get; set; }
    public decimal PRE_UNI { get; set; }
    public int CANT_ENTR { get; set; }
    public int DEP_ID { get; set; }
    public string ENT_FEC_ENT { get; set; }
    public string Insumo { get; set; }
    public string Deposito { get; set; }
    public decimal PreUni { get; set; }
    public decimal PreUltCompra { get; set; }
    public string Usuario { get; set; }
    public long EntDet_Id { get; set; }
    public int ENT_SALDO { get; set; }
    public long PEE_PED_ID { get; set; }
    public long USU_MED { get; set; }
    public string EXP_PATOLOGIAS { get; set; }
    public string EXP_SECCIONAL { get; set; }
}