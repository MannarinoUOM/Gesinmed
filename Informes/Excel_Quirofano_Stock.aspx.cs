using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using System.Text;

public partial class Informes_Excel_Quirofano_Stock : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Response.ContentType = "application/x-msexcel;";

        string Titulo = "";
        if (Request.QueryString["LISTADO"] == "1") {
            Titulo = "InsumoQuirofano_Totales";
        }
            else
        {
            Titulo = "InsumoQuirofano_Detalle";
        }

        Response.AddHeader("Content-Disposition", "attachment; filename=" + Titulo + ".xls");
        Response.ContentEncoding = Encoding.UTF8;
        string Tabla = "";

        String CB_Anterior = "";
        String Insumo_Anterior = "";
        int pos = 0;
        string color = "#D3D3D3";
        int Ingreso = 0;
        int Egreso = 0;
        int Total = 0;
                               

        if (Request.QueryString["LISTADO"] == "1"){
            QuirofanoDALTableAdapters.H2_QUIROFANO_EXTRA_LISTADO_STOCKTOTALTableAdapter adapter = new QuirofanoDALTableAdapters.H2_QUIROFANO_EXTRA_LISTADO_STOCKTOTALTableAdapter();
            QuirofanoDAL.H2_QUIROFANO_EXTRA_LISTADO_STOCKTOTALDataTable aTable = adapter.GetData();

            Tabla = "<table><tr><td>Insumo</td><td>Ingreso</td><td>Egreso</td><td>Total</td></tr>";
            foreach (QuirofanoDAL.H2_QUIROFANO_EXTRA_LISTADO_STOCKTOTALRow row in aTable) {
                if (pos == 0) { color = "#D3D3D3"; pos = 1; } else { color = "white"; pos = 0; }

                Tabla = Tabla + "<tr style='background-color:" + color + ";'><td>" + row.INSUMO + "</td><td>" + row.INGRESO + "</td><td>" + row.EGRESO + "</td><td>" + row.TOTAL + "</td></tr>";
            }
            Tabla = Tabla + "</table>";            
        }

        if (Request.QueryString["MOV"] == "1")
        {
            QuirofanoDALTableAdapters.H2_QUIROFANO_EXTRA_LISTADO_STOCKMOVIMIENTOTableAdapter adapter = new QuirofanoDALTableAdapters.H2_QUIROFANO_EXTRA_LISTADO_STOCKMOVIMIENTOTableAdapter();
            QuirofanoDAL.H2_QUIROFANO_EXTRA_LISTADO_STOCKMOVIMIENTODataTable aTable = adapter.GetData();
            //E.QE_NOMBRE, E.QEMED_MEDIDA, M.QES_CODIGOBARRA, MOV.QEMOV_DESCRIPCION, QES_FECHA_VENCIMIENTO, QES_MOTIVOID, QES_OBSERVACION, QES_ORTOPEDIAID, QES_UOM, ORT.QEO_DESCRPCION AS ORTOPEDIA, M.QES_FECHAMOVIMIENTO, '' AS PACIENTE
            Tabla = "<table><tr><td>Cód Barra</td><td>Insumo</td><td>Movimiento</td><td>F. Vencimiento</td><td>Observación</td><td>Ortopedia</td><td>F. Movimiento</td><td>Paciente</td><td>Ingreso</td><td>Egreso</td><td>Total</td></tr>";
            
            foreach (QuirofanoDAL.H2_QUIROFANO_EXTRA_LISTADO_STOCKMOVIMIENTORow row in aTable)
            {                
                string Insumo; if (!row.IsQE_NOMBRENull()) Insumo = row.QE_NOMBRE; else Insumo = "";
                string Medida; if (!row.IsQEMED_MEDIDANull()) Medida = row.QEMED_MEDIDA; else Medida = "";
                string Tipo; if (!row.IsQETIPO_TIPONull()) Tipo = row.QETIPO_TIPO; else Tipo = "";
                string CB; if (!row.IsQES_CODIGOBARRANull()) CB = row.QES_CODIGOBARRA.ToString(); else CB = "";
                if (CB_Anterior == "") { CB_Anterior = CB; }
                if (Insumo_Anterior == "") { Insumo_Anterior = Insumo + " " + Tipo + " " + Medida; }                 
                string Motivo; if (!row.IsQEMOV_DESCRIPCIONNull()) Motivo = row.QEMOV_DESCRIPCION; else Motivo = "";
                string FECHA_VENCIMIENTO; if (!row.IsQES_FECHA_VENCIMIENTONull()) FECHA_VENCIMIENTO = row.QES_FECHA_VENCIMIENTO.ToShortDateString(); else FECHA_VENCIMIENTO = "";
                string Observacion; if (!row.IsQES_OBSERVACIONNull()) Observacion = row.QES_OBSERVACION; else Observacion = "";
                string ORTOPEDIA; if (!row.IsORTOPEDIANull()) ORTOPEDIA = row.ORTOPEDIA; else ORTOPEDIA = "";
                string FECHA_MOVIMIENTO; if (!row.IsQES_FECHAMOVIMIENTONull()) FECHA_MOVIMIENTO = row.QES_FECHAMOVIMIENTO.ToShortDateString(); else FECHA_MOVIMIENTO = "";
                string PACIENTE; if (!row.IsPACIENTENull()) PACIENTE = row.PACIENTE; else PACIENTE = "";
                string Eg = "";
                string Ing = "";
                
                                
                if (CB_Anterior != CB)
                {
                    if (pos == 0) { pos = 1; } else { pos = 0; }
                    if (pos == 0) { color = "#D3D3D3"; } else { color = "white"; }
                }


                if (Insumo_Anterior != Insumo + " " + Tipo + " " + Medida)
                {
                    Tabla = Tabla + "<tr style='background-color:#000000; color:white;'><td></td><td>" + Insumo_Anterior + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td>" + Ingreso.ToString() + "</td><td>" + Egreso.ToString() + "</td><td>" + (Ingreso - Egreso).ToString()  + "</td></tr>";
                    Tabla = Tabla + "<tr style='background-color:#CCFFFF; color:white;'><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
                    Ingreso = 0;
                    Egreso = 0;
                }

                if (row.QES_MOTIVOID < 800)
                {
                    Eg = "0";
                    Ing = "1";
                    Ingreso = Ingreso + 1;
                }
                else
                {
                    Ing = "0";
                    Eg = "1";
                    Egreso = Egreso + 1;
                }

                Tabla = Tabla + "<tr style='background-color:" + color + ";'><td>" + CB + "</td><td>" + Insumo + " " + Tipo + " " + Medida + "</td><td>" + Motivo + "</td><td>" + FECHA_VENCIMIENTO + "</td><td>" + Observacion + "</td><td>" + ORTOPEDIA + "</td><td>" + FECHA_MOVIMIENTO + "</td><td>" + PACIENTE + "</td><td>" + Ing + "</td><td>" + Eg + "</td><td></td></tr>";




                Insumo_Anterior = Insumo + " " + Tipo + " " + Medida;
                CB_Anterior = CB;
            }
            Tabla = Tabla + "</table>";
        }

        lbl_div.Text = Tabla;
        //Response.End();
    }
}