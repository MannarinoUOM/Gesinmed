using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;

/// <summary>
/// Summary description for Farmacia_EsquinaBLL
/// </summary>
public class Farmacia_EsquinaBLL
{
	public Farmacia_EsquinaBLL()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public List<Farmacia_Esq> buscar(Farmacia_Esq obj)
    {
        Farmacia_EsquinaDALTableAdapters.H2_EXP_LISTAR_PEDIDOS_FARMACIA_EXTERNATableAdapter adapter = new Farmacia_EsquinaDALTableAdapters.H2_EXP_LISTAR_PEDIDOS_FARMACIA_EXTERNATableAdapter();
        Farmacia_EsquinaDAL.H2_EXP_LISTAR_PEDIDOS_FARMACIA_EXTERNADataTable tabla = new Farmacia_EsquinaDAL.H2_EXP_LISTAR_PEDIDOS_FARMACIA_EXTERNADataTable();

        tabla = adapter.GetData(obj.EXP_ID,obj.EXP_REMITO,obj.EXP_NOMBRE,obj.EXP_DIAG_ID,obj.EXP_NRO_DOC,Convert.ToDateTime(obj.EXP_VENC_FECHA_DESDE),Convert.ToDateTime(obj.EXP_VENC_FECHA_HASTA.ToString()),obj.NRO_PEDIDO,obj.SeccionalesIds,obj.PatologiasIds);

        List<Farmacia_Esq> Lista = new List<Farmacia_Esq>();
        Farmacia_Esq item = new Farmacia_Esq();
        foreach( Farmacia_EsquinaDAL.H2_EXP_LISTAR_PEDIDOS_FARMACIA_EXTERNARow row in tabla.Rows){

            item.PDT_ID = row.PDT_ID;

            if(!row.IsPEE_PED_IDNull())
            item.PDT_PED_ID = row.PDT_PED_ID;

            item.PDT_INS_ID = row.PDT_INS_ID;

            item.CANT_PEDIDA = row.CANT_PEDIDA;
            
            item.DESCUENTO = row.DESCUENTO;

            if(!row.IsOBSNull())
            item.OBS = row.OBS;

            if(!row.IsPRE_UNINull())
            item.PRE_UNI = row.PRE_UNI;

            if(!row.IsCANT_ENTRNull())
            item.CANT_ENTR = row.CANT_ENTR;

            if(!row.IsDEP_IDNull())
            item.DEP_ID = row.DEP_ID;

            if(!row.IsENT_FEC_ENTNull())
            item.ENT_FEC_ENT = row.ENT_FEC_ENT.ToShortDateString();

            item.Insumo = row.Insumo;

            if(!row.IsDepositoNull())
            item.Deposito = row.Deposito;

            if(!row.IsPreUniNull())
            item.PreUni = row.PreUni;

            if(!row.IsPreUltCompraNull())
            item.PreUltCompra = row.PreUltCompra;

            if(!row.IsUsuarioNull())
            item.Usuario = row.Usuario;

            if(!row.IsEntDet_IdNull())
            item.EntDet_Id = row.EntDet_Id;

            if(!row.IsENT_SALDONull())
            item.ENT_SALDO = row.ENT_SALDO;

            if(!row.IsPEE_PED_IDNull())
            item.PEE_PED_ID = row.PEE_PED_ID;

            if(!row.IsUSU_MEDNull())
            item.USU_MED = row.USU_MED;

            if (!row.IsEXP_NOMBRENull())
                item.EXP_NOMBRE = row.EXP_NOMBRE;

            if (!row.IsEXP_NRO_DOCNull())
                item.EXP_NRO_DOC = Convert.ToInt32(row.EXP_NRO_DOC);

            if (!row.IsEXP_PATOLOGIASNull())
                item.EXP_PATOLOGIAS = row.EXP_PATOLOGIAS;

            //if (!row.IsEXP_SECCIONALNull()())
            item.EXP_SECCIONAL = row.EXP_SECCIONAL;

            Lista.Add(item);
        }
        return Lista;
    }
}