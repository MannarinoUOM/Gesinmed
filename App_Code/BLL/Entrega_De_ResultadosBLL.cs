using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;

/// <summary>
/// Descripción breve de Entrega_De_Resultados
/// </summary>
/// 
namespace Hospital
{
    public class Entrega_De_ResultadosBLL
    {
        public Entrega_De_ResultadosBLL()
        {
            //
            // TODO: Agregar aquí la lógica del constructor
            //
        }

        public List<pacientes> Paciente_DOC_Entrega_De_Resultados(Int32 DOC, string T_Doc)
        {
            List<pacientes> lista = new List<pacientes>();
            Entrega_De_ResultadosTableAdapters.H2_Afiliado_Encabezado_Entrega_De_Resultados_DOCTableAdapter adapter = new Entrega_De_ResultadosTableAdapters.H2_Afiliado_Encabezado_Entrega_De_Resultados_DOCTableAdapter();
            Entrega_De_Resultados.H2_Afiliado_Encabezado_Entrega_De_Resultados_DOCDataTable aTable = adapter.GetData(DOC, T_Doc);

            int pos = 0;
            pacientes p = new pacientes();
            foreach (Entrega_De_Resultados.H2_Afiliado_Encabezado_Entrega_De_Resultados_DOCRow row in aTable.Rows)
            {
                pos++;
                p.Nro_Busqueda = pos;
               // p.cuil_titu = row.cuil_titular;
                p.cuil = row.cuil;
                if (!row.IsFecha_BajaNull())
                    p.Fecha_Baja = row.Fecha_Baja;
                else p.Fecha_Baja = DateTime.Parse("01/01/1900");

                if (p.Fecha_Baja <= DateTime.Now && !p.Fecha_Baja.ToShortDateString().Equals("01/01/1900")) p.Vencido = true;
                else p.Vencido = false;

                p.FechaVencido = p.Fecha_Baja.ToShortDateString();

                if (!row.IsCod_ParienteNull())
                    p.cod_pariente = row.Cod_Pariente.ToString();
                else p.cod_pariente = string.Empty;

                if (!row.IsTipo_docNull()) p.TipoDoc = row.cod_tipo;
                else p.TipoDoc = string.Empty;

                if (!row.Isfecha_nacimientoNull()) p.fecha_nacimiento = row.fecha_nacimiento;

                TimeSpan ts = DateTime.Now.Date - p.fecha_nacimiento;
                p.fec = p.fecha_nacimiento.Year;

                int anios = ts.Days / 365;
                int meses = Convert.ToInt32((ts.Days - (anios * 365)) / 30.4167);
                //int Dias = Convert.ToInt32((ts.Days - (anios * 365)) - (meses * 30.4167));
                string str_anios, str_meses;

                if (anios != 1) str_anios = " Años ";
                else str_anios = " Año ";
                if (meses != 1) str_meses = " Meses ";
                else str_meses = " Mes ";

                p.Edad_Format = anios.ToString() + str_anios + meses.ToString() + str_meses;

                p.PagaBono = true;

                if (anios == 0) p.PagaBono = false; //Menor a 1 año, no paga
                if (!row.IsFV_PMINull())
                    if (row.FV_PMI >= DateTime.Now) p.PagaBono = false; //tiene PMI, no paga

                p.documento_real = row.documento_real;

                p.documento = row.documento;
                if (!row.IsSeccionalNull()) p.Seccional = row.Seccional;

                if (!row.IsLocalidadNull()) { p.localidad = row.Localidad; }

                p.Paciente = row.apellido;

                if (!row.IsNro_SeccionalNull()) p.Nro_Seccional = row.Nro_Seccional.ToString(); else p.Nro_Seccional = "999";

                if (!row.IstelefonoNull()) p.Telefono = row.telefono;
                if (!row.IsCelularNull()) p.Celular = row.Celular;
                p.Titular = "";

                if (!row.IsOSNull())
                    p.ObraSocial = row.OS;
                else p.ObraSocial = string.Empty;

                if (!row.IsOSIdNull())
                    p.OSId = row.OSId;
                else p.OSId = 0;

                if (!row.IsPMINull()) { p.PMI = row.PMI; } else { p.PMI = false; }
                if (!row.IsPINull()) { p.PI = row.PI; } else { p.PI = false; }

                if (!row.IsDiscapacidadNull())
                {
                    p.Discapacidad = Convert.ToInt32(row.Discapacidad);
                    p.PagaBono = false; //No paga discapacitado
                }
                else
                {
                    p.Discapacidad = 0;
                }

                if (!row.IsFV_PMINull()) p.FechaPMI = row.FV_PMI.ToShortDateString();
                else p.FechaPMI = string.Empty;

                p.NHC = row.cuil;
                if (!row.IsHC_UOM_CENTRALNull())
                    p.NHC_UOM = row.HC_UOM_CENTRAL;
                else p.NHC_UOM = string.Empty;

                if (!row.IsObservacionesNull()) p.Observaciones = row.Observaciones;
                else p.Observaciones = string.Empty;

                if (!row.IsfotoNull()) p.Foto = row.foto;
                if (!row.IsSoc_IdNull()) p.Soc_Id = row.Soc_Id;

                if (!row.IstitularNull()) { p.Nombretitular = row.titular;} else { p.Nombretitular = "";}

                lista.Add(p);
            }

            return lista;
        }

        public List<pacientes> Paciente_ID_Entrega_De_Resultados(long ID)
        {
            List<pacientes> lista = new List<pacientes>();
            Entrega_De_ResultadosTableAdapters.H2_Afiliado_Encabezado_Entrega_De_Resultados_IDTableAdapter adapter = new Entrega_De_ResultadosTableAdapters.H2_Afiliado_Encabezado_Entrega_De_Resultados_IDTableAdapter();
            Entrega_De_Resultados.H2_Afiliado_Encabezado_Entrega_De_Resultados_IDDataTable aTable = adapter.GetData(ID);

            int pos = 0;
            pacientes p = new pacientes();
            foreach (Entrega_De_Resultados.H2_Afiliado_Encabezado_Entrega_De_Resultados_IDRow row in aTable.Rows)
            {
                pos++;
                p.Nro_Busqueda = pos;
                //p.cuil_titu = row.cuil_titular;
                p.cuil = row.cuil;
                p.cod_pariente = row.Cod_Pariente.ToString();

                if (!row.IsFecha_BajaNull())
                    p.Fecha_Baja = row.Fecha_Baja;
                else p.Fecha_Baja = Convert.ToDateTime("01/01/1900");

                if (p.Fecha_Baja <= DateTime.Now && !p.Fecha_Baja.ToShortDateString().Equals("01/01/1900")) p.Vencido = true;
                else p.Vencido = false;

                p.FechaVencido = p.Fecha_Baja.ToShortDateString();

                if (!row.IsLocalidadNull()) { p.localidad = row.Localidad; }

                if (!row.Isfecha_nacimientoNull()) p.fecha_nacimiento = row.fecha_nacimiento;
                if (!row.IsSeccionalNull()) p.Seccional = row.Seccional;
                if (!row.IsNro_SeccionalNull()) p.Nro_Seccional = row.Nro_Seccional.ToString(); else p.Nro_Seccional = "999";

                if (!row.IscalleNull())
                {
                    if (!row.IsnumeroNull())
                    {
                        p.calle = row.calle + " " + row.numero;
                    }
                    p.calle = row.calle;
                }

                TimeSpan ts = DateTime.Now.Date - p.fecha_nacimiento;
                p.fec = p.fecha_nacimiento.Year;

                int anios = ts.Days / 365;
                int meses = Convert.ToInt32((ts.Days - (anios * 365)) / 30.4167);
                //int Dias = Convert.ToInt32((ts.Days - (anios * 365)) - (meses * 30.4167));
                string str_anios, str_meses;

                if (anios != 1) str_anios = " Años ";
                else str_anios = " Año ";
                if (meses != 1) str_meses = " Meses ";
                else str_meses = " Mes ";

                p.Edad_Format = anios.ToString() + str_anios + meses.ToString() + str_meses;

                p.Paciente = row.apellido;
                p.documento = row.documento;

                p.documento_real = row.documento_real;
                p.TipoDoc = row.cod_tipo;

                if (!row.IstelefonoNull()) p.Telefono = row.telefono;
                if (!row.IsCelularNull()) p.Celular = row.Celular;

                p.Titular = "";
                p.NHC = row.cuil;

                p.ObraSocial = row.OS;
                p.OSId = row.OSId;

                if (!row.IsPMINull()) { p.PMI = row.PMI; } else { p.PMI = false; }
                if (!row.IsPINull()) { p.PI = row.PI; } else { p.PI = false; }

                p.PagaBono = true;

                if (anios == 0) p.PagaBono = false; //Menor a 1 año, no paga
                if (!row.IsFV_PMINull())
                    if (row.FV_PMI >= DateTime.Now) p.PagaBono = false; //tiene PMI, no paga

                if (!row.IsDiscapacidadNull())
                {
                    p.Discapacidad = Convert.ToInt32(row.Discapacidad);
                    p.PagaBono = false; //No paga discapacitado
                }
                else
                {
                    p.Discapacidad = 0;
                }

                if (!row.IsHC_UOM_CENTRALNull())
                    p.NHC_UOM = row.HC_UOM_CENTRAL;
                else p.NHC_UOM = string.Empty;

                if (!row.IsObservacionesNull()) p.Observaciones = row.Observaciones;
                else p.Observaciones = string.Empty;

                if (!row.IssexoNull()) p.sexo = row.sexo;
                else p.sexo = string.Empty;

                if (!row.IsfotoNull()) p.Foto = row.foto;
                if (!row.IsSoc_IdNull()) p.Soc_Id = row.Soc_Id;

                if (!row.IstitularNull()) { p.Nombretitular = row.titular; } else { p.Nombretitular = ""; }

                lista.Add(p);
            }

            return lista;
        }

        public List<pacientes> Paciente_NHC_UOM_Entrega_De_Resultados(string NHC)
        {
            List<pacientes> lista = new List<pacientes>();
            Entrega_De_ResultadosTableAdapters.H2_Afiliado_Encabezado_Entrega_De_Resultados_NHC_UOM_HOSPTableAdapter adapter = new Entrega_De_ResultadosTableAdapters.H2_Afiliado_Encabezado_Entrega_De_Resultados_NHC_UOM_HOSPTableAdapter();
            Entrega_De_Resultados.H2_Afiliado_Encabezado_Entrega_De_Resultados_NHC_UOM_HOSPDataTable aTable = adapter.GetData(NHC);

            int pos = 0;
            pacientes p = new pacientes();
            foreach (Entrega_De_Resultados.H2_Afiliado_Encabezado_Entrega_De_Resultados_NHC_UOM_HOSPRow row in aTable.Rows)
            {
                pos++;
                p.Nro_Busqueda = pos;
                //p.cuil_titu = row.cuil_titular;
                p.cuil = row.cuil;

                if (!row.IsLocalidadNull()) { p.localidad = row.Localidad; }

                if (!row.Isfecha_nacimientoNull()) p.fecha_nacimiento = row.fecha_nacimiento;
                if (!row.IsSeccionalNull()) p.Seccional = row.Seccional;
                if (!row.IsNro_SeccionalNull()) p.Nro_Seccional = row.Nro_Seccional.ToString(); else p.Nro_Seccional = "999";

                if (!row.IscalleNull())
                {
                    if (!row.IsnumeroNull())
                    {
                        p.calle = row.calle + " " + row.numero;
                    }
                    p.calle = row.calle;
                }

                TimeSpan ts = DateTime.Now.Date - p.fecha_nacimiento;

                int anios = ts.Days / 365;
                int meses = Convert.ToInt32((ts.Days - (anios * 365)) / 30.4167);
                //int Dias = Convert.ToInt32((ts.Days - (anios * 365)) - (meses * 30.4167));
                string str_anios, str_meses;

                if (anios != 1) str_anios = " Años ";
                else str_anios = " Año ";
                if (meses != 1) str_meses = " Meses ";
                else str_meses = " Mes ";

                p.Edad_Format = anios.ToString() + str_anios + meses.ToString() + str_meses;

                p.Paciente = row.apellido;
                p.documento = row.documento;

                p.documento_real = row.documento_real;
                p.TipoDoc = row.cod_tipo;

                if (!row.IstelefonoNull()) p.Telefono = row.telefono;
                if (!row.IsCelularNull()) p.Celular = row.Celular;

                p.Titular = "";
                p.NHC = row.cuil;

                p.ObraSocial = row.OS;
                p.OSId = row.OSId;

                if (!row.IsFV_PMINull())
                    p.FechaPMI = row.FV_PMI.ToShortDateString();
                else p.FechaPMI = string.Empty;

                if (!row.IsPMINull()) { p.PMI = row.PMI; } else { p.PMI = false; p.FechaPMI = string.Empty; }
                if (!row.IsPINull()) { p.PI = row.PI; } else { p.PI = false; }


                p.PagaBono = true;

                if (anios == 0) p.PagaBono = false; //Menor a 1 año, no paga
                if (!row.IsFV_PMINull())
                    if (row.FV_PMI >= DateTime.Now) p.PagaBono = false; //tiene PMI, no paga

                if (!row.IsDiscapacidadNull())
                {
                    p.Discapacidad = Convert.ToInt32(row.Discapacidad);
                    p.PagaBono = false; //No paga discapacitado
                }
                else
                {
                    p.Discapacidad = 0;
                }

                if (!row.IsHC_UOM_CENTRALNull())
                    p.NHC_UOM = row.HC_UOM_CENTRAL;
                else p.NHC_UOM = string.Empty;

                if (!row.IsObservacionesNull())
                    p.Observaciones = row.Observaciones;
                else p.Observaciones = string.Empty;

                if (!row.IsFecha_BajaNull())
                {
                    p.FechaVencido = row.Fecha_Baja.ToShortDateString();
                    if (DateTime.Parse(p.FechaVencido) <= DateTime.Now) p.Vencido = true;
                    else p.Vencido = false;
                }
                else p.Vencido = false;

                if (!row.IsfotoNEWNull()) { p.Foto = row.fotoNEW; } else { p.Foto = "../img/silueta.jpg"; }
                if (!row.IsSoc_IdNull()) p.Soc_Id = row.Soc_Id;
                if (!row.IstitularNull()) { p.Nombretitular = row.titular; } else { p.Nombretitular = ""; }

                lista.Add(p);
            }

            return lista;
        }


        public List<estudios> Traer_Estudios_Todos(long id, int tipo)
        {
            Entrega_De_ResultadosTableAdapters.H2_Entrega_Resultados_Traer_TodosTableAdapter adapter = new Entrega_De_ResultadosTableAdapters.H2_Entrega_Resultados_Traer_TodosTableAdapter();
            Entrega_De_Resultados.H2_Entrega_Resultados_Traer_TodosDataTable aTable = adapter.GetData(id,tipo);

            List<estudios> lista = new List<estudios>();
            foreach (Entrega_De_Resultados.H2_Entrega_Resultados_Traer_TodosRow row in aTable.Rows)
            {
                estudios e = new estudios();

                e.estudioId = row.EstudioId;
                e.especialidadId = row.especialidadId;
                if (!row.IsfechaIngresoNull()) e.fechaIngreso = row.fechaIngreso.ToShortDateString(); else e.fechaIngreso = "";
                if (!row.IsfechaEntregaNull()) e.fechaEntrega = row.fechaEntrega.ToShortDateString(); else e.fechaEntrega = "";
                if (!row.IsfechaDevolucionNull()) e.fechaDevolucion = row.fechaDevolucion.ToShortDateString(); else e.fechaDevolucion = "";
                e.estudio = row.estudio;
                e.afiliado = row.nombreAfiliado;
                if (!row.IsobservacionNull()) e.observacion = row.observacion; else e.observacion = "";

                lista.Add(e);
            }
            return lista;
        }


        public int Entrega_Resultados_Eliminar(long id)
        {
            Entrega_De_ResultadosTableAdapters.QueriesTableAdapter adaper = new Entrega_De_ResultadosTableAdapters.QueriesTableAdapter();
            return Convert.ToInt32(adaper.H2_Entrega_Resultados_Eliminar(id));
        }

        public long Entrega_Resultados_Guardar_Editar(estudios entrega)
        {
            Entrega_De_ResultadosTableAdapters.QueriesTableAdapter adapter = new Entrega_De_ResultadosTableAdapters.QueriesTableAdapter();
            return Convert.ToInt32(adapter.H2_Entrega_Resultados_Guardar_Editar(entrega.estudioId,entrega.especialidadId,entrega.usuario,entrega.pacienteId,Convert.ToDateTime(entrega.fechaIngreso),Convert.ToDateTime(entrega.fechaEntrega),entrega.observacion,Convert.ToDateTime(entrega.fechaDevolucion)));
        }
    }
}