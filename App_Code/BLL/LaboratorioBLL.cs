using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for LaboratorioBLL
/// </summary>
/// 
namespace Hospital
{
    public class LaboratorioBLL
    {
        public LaboratorioBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }


        public practicaLista Lista_Practicas_Todas()
        {
            LaboratorioDALTableAdapters.H2_Laboratorio_PracticasTableAdapter adapter = new LaboratorioDALTableAdapters.H2_Laboratorio_PracticasTableAdapter();
            LaboratorioDAL.H2_Laboratorio_PracticasDataTable aTable = adapter.GetData(null, null);

            practicaLista Lista = new practicaLista();

            foreach (LaboratorioDAL.H2_Laboratorio_PracticasRow row in aTable.Rows)
            {
                practicas p = new practicas();
                if (!row.IsCodNull()) p.Codigo = Convert.ToInt32(row.Cod);
                if (!row.IsDescCodNull()) p.Practica = row.DescCod;
                p.Id = Convert.ToInt32(row.Cod);
                Lista.Add(p);
            }

            return Lista;
        }

        public practicaLista Lista_SubPracticas(int CodigoPractica)
        {
            LaboratorioDALTableAdapters.H2_Laboratorio_SubPracticasTableAdapter adapter = new LaboratorioDALTableAdapters.H2_Laboratorio_SubPracticasTableAdapter();
            LaboratorioDAL.H2_Laboratorio_SubPracticasDataTable aTable = adapter.GetData(CodigoPractica);

            practicaLista Lista = new practicaLista();

            foreach (LaboratorioDAL.H2_Laboratorio_SubPracticasRow row in aTable.Rows)
            {
                practicas p = new practicas();
                if (!row.IsSubCodNull()) p.Codigo = Convert.ToInt32(row.SubCod);
                if (!row.IsDescSubCodNull()) p.Practica = row.DescSubCod;
                if (!row.IsSubCodNull()) p.Id = Convert.ToInt32(row.SubCod);
                Lista.Add(p);
            }

            return Lista;
        }




        public List<pacientes> Cargar_Paciente_Bono(long Bono)
        {
            List<pacientes> lista = new List<pacientes>();
            LaboratorioDALTableAdapters.H2_Afiliado_Encabezado_NroBonoTableAdapter adapter = new LaboratorioDALTableAdapters.H2_Afiliado_Encabezado_NroBonoTableAdapter();
            LaboratorioDAL.H2_Afiliado_Encabezado_NroBonoDataTable aTable = adapter.GetData(Bono);

            int pos = 0;
            pacientes p = new pacientes();
            foreach (LaboratorioDAL.H2_Afiliado_Encabezado_NroBonoRow row in aTable.Rows)
            {
                pos++;
                p.Nro_Busqueda = pos;
                p.cuil_titu = row.cuil_titu;
                p.cuil = row.cuil;

                p.documento = row.documento;
                if (!row.Isfecha_nacimientoNull()) p.fecha_nacimiento = row.fecha_nacimiento;
                if (!row.IsSeccionalNull()) p.Seccional = row.Seccional;

                if (!row.IsLocalidadNull()) { p.localidad = row.Localidad; }

                p.Paciente = row.apellido;

                if (!row.IsNro_SeccionalNull()) p.Nro_Seccional = row.Nro_Seccional.ToString(); else p.Nro_Seccional = "999";

                if (!row.IstelefonoNull()) p.Telefono = row.telefono;
                p.Titular = "";

                p.ObraSocial = row.OS;
                p.OSId = row.OSId;

                p.NHC = row.cuil;
                lista.Add(p);
            }

            return lista;
        }



        public string GuardarLaboratorio(List<laboratoriopracticas> Practicas, int MedicoId, string TipoOrden, string FechaPrescripcion, string FUM, string Diagnostico1, string Diagnostico2, string FechaAEntregar, Int32 Usuario, string ObservacionesGral, long NroBono)
        {

            if (FUM == "") FUM = "01/01/1900";

            LaboratorioDALTableAdapters.QueriesTableAdapter adapter = new LaboratorioDALTableAdapters.QueriesTableAdapter();
            object id = adapter.H2_Laboratorio_Guardar_Cabecera(TipoOrden, Convert.ToDateTime(FechaAEntregar), MedicoId, MedicoId, Convert.ToDateTime(FechaPrescripcion), Convert.ToDateTime(FUM), Diagnostico1, Diagnostico2, ObservacionesGral, Convert.ToDateTime(FechaAEntregar), Usuario, NroBono);
            if (id != null)
            {
                Hospital.BonosBLL B = new BonosBLL();
                //B.bono_UsarBono_PorId(NroBono, Usuario);
                int i = 0;
                foreach (laboratoriopracticas p in Practicas)
                {
                    i ++;
                    if (p.Estado != 0)
                    {
                        adapter.H2_Laboratorio_Guardar_Items(Convert.ToInt64(id), i, p.PracticaId.ToString(), p.SubPracticaCodigo.ToString(), p.Comentario, "", Usuario.ToString());
                    }
                }
            }

            return id.ToString();
        }

        public string Right(string param, int length)
        {

            int value = param.Length - length;
            string result = param.Substring(value, length);
            return result;
        }

        public string GuardarLaboratorioInternacion(List<laboratoriopracticas> Practicas, int MedicoId, string TipoOrden, string FechaPrescripcion, string FUM, string Diagnostico1, string Diagnostico2, string FechaAEntregar, Int32 Usuario, string ObservacionesGral, string Servicio, string Sala, string Cama, long Documento, string Bono)
        {

            if (FUM == "") FUM = "01/01/1900";
            FechaAEntregar = DateTime.Now.ToShortDateString();
            FechaPrescripcion = DateTime.Now.ToShortDateString();


            LaboratorioDALTableAdapters.QueriesTableAdapter adapter = new LaboratorioDALTableAdapters.QueriesTableAdapter();
            object id = adapter.H2_Laboratorio_Guardar_Cabecera_Internacion(TipoOrden, Convert.ToDateTime(FechaAEntregar), MedicoId, MedicoId, Convert.ToDateTime(FechaPrescripcion), Convert.ToDateTime(FUM), Diagnostico1, Diagnostico2, ObservacionesGral, Convert.ToDateTime(FechaAEntregar), Usuario, Sala, Servicio, Cama, Documento, Bono);
            if (id != null)
            {
                Hospital.BonosBLL B = new BonosBLL();
                //B.bono_UsarBono_PorId(NroBono, Usuario);
                int i = 0;
                foreach (laboratoriopracticas p in Practicas)
                {


                    if (p.PracticaId.Trim().Length < 3)
                    {
                        p.PracticaId = Right(("000" + p.PracticaId),3);
                    }

                    i++;
                    if (p.Estado != 0)
                    {
                        adapter.H2_Laboratorio_Guardar_Items(Convert.ToInt64(id), i, p.PracticaId.ToString(), p.SubPracticaCodigo.ToString(), p.Comentario, "", Usuario.ToString());
                    }
                }
            }

            return id.ToString();
        }


        public bool Practica_Existe(int Codigo)
        {
            PracticasDALTableAdapters.QueriesTableAdapter adapter = new PracticasDALTableAdapters.QueriesTableAdapter();
            object R = adapter.H2_Practica_Existe(Codigo);
            if (R != null) return true;
            return false;
        }


        public void Practica_Nueva(string Practica, int Codigo, decimal FE, decimal FG, string Usuario)
        {
            if (!Practica_Existe(Codigo))
            {
                PracticasDALTableAdapters.QueriesTableAdapter adapter = new PracticasDALTableAdapters.QueriesTableAdapter();
                adapter.H2_Practica_Nueva(Codigo, Practica);
                adapter.H2_Practica_Guardar_Precio(Codigo, FE, Usuario, FG);

            }
            else
            {
                throw new Exception("Ya existe una práctica con el Codigo " + Codigo.ToString());
            }
        }









        public List<laboratorioBuscar> BuscarProtocolo(long Protocolo, string TipoOrden, long CodPaciente, string Apellido, string FInicio, string FFin)
        {
            if (FInicio == "") FInicio = "1/1/1900";
            if (FFin == "" ) FFin = "1/1/1900";


            List<laboratorioBuscar> lista = new List<laboratorioBuscar>();
            LaboratorioDALTableAdapters.H2_Laboratorio_BuscarProtocoloTableAdapter adapter = new LaboratorioDALTableAdapters.H2_Laboratorio_BuscarProtocoloTableAdapter();
            LaboratorioDAL.H2_Laboratorio_BuscarProtocoloDataTable aTable = adapter.GetData(Protocolo, TipoOrden, CodPaciente, Apellido, Convert.ToDateTime(FInicio), Convert.ToDateTime(FFin));

            
            foreach (LaboratorioDAL.H2_Laboratorio_BuscarProtocoloRow row in aTable.Rows)
            {
                laboratorioBuscar p = new laboratorioBuscar();
                p.documento = row.CodPaciente.ToString();
                if (!row.IsapellidoNull()) p.apellido = row.apellido;
                if (!row.IsTipoOrdenNull()) p.TOrden = row.TipoOrden;
                if (!row.IscuilNull()) p.cuil = row.cuil.ToString();
                if (!row.IsFechaIngresoNull()) p.Fecha = row.FechaIngreso.ToShortDateString();
                p.NroProtocolo = row.Protocolo;

                lista.Add(p);
            }

            return lista;
        }


        public LaboratorioPreparacion PreparacionLabo(long Codigo)
        {
            LaboratorioDALTableAdapters.H2_Laboratorio_PreparacionLaboratorioTableAdapter adapter = new LaboratorioDALTableAdapters.H2_Laboratorio_PreparacionLaboratorioTableAdapter();
            LaboratorioDAL.H2_Laboratorio_PreparacionLaboratorioDataTable aTable = adapter.GetData(Codigo);
            LaboratorioPreparacion l = new LaboratorioPreparacion();
            if (aTable.Count > 0)
            {
                if(!aTable[0].IsIDPracticaNull()) l.Nombre = aTable[0].IDPractica;
                if (!aTable[0].IsCodPracticaNull()) l.Codigo = aTable[0].CodPractica;
                l.Preparacion = aTable[0].detalles;
            }
            return l;
        }               


    }
}