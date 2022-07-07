using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descripción breve de DepositoBLL
/// </summary>
namespace Hospital
{
    public class DepositoBLL
    {
        public DepositoBLL()
        {
        }

        public int Insert_Deposito(Medicamento_Deposito d)
        {
            DepositoDALTableAdapters.QueriesTableAdapter adapter = new DepositoDALTableAdapters.QueriesTableAdapter();
            object id = adapter.H2_FARMACIA_DEPOSITO_INSERT(d.Id, d.Deposito, d.Estado);
            if (id.ToString() != null)
                return int.Parse(id.ToString());
            else return -1;
        }

        public List<Medicamento_Deposito> List_Medicamento_Deposito()
        {
            List<Medicamento_Deposito> lista = new List<Medicamento_Deposito>();
            DepositoDALTableAdapters.H2_DEPOSITOS_LISTTableAdapter adapter = new DepositoDALTableAdapters.H2_DEPOSITOS_LISTTableAdapter();
            DepositoDAL.H2_DEPOSITOS_LISTDataTable aTable = adapter.GetData();
            foreach (DepositoDAL.H2_DEPOSITOS_LISTRow row in aTable.Rows)
            {
                lista.Add(CreateFromRowDeposito(row));
            }
            return lista;
        }

        private Medicamento_Deposito CreateFromRowDeposito(DepositoDAL.H2_DEPOSITOS_LISTRow row)
        {
            Medicamento_Deposito d = new Medicamento_Deposito();
            if (!row.IsdepositoNull())
                d.Deposito = row.deposito;
            d.Id = row.id;
            if (!row.IsEstadoNull())
                d.Estado = row.Estado;
            else d.Estado = true;
            return d;
        }

    }
}