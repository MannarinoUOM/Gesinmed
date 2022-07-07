using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Mail;
using System.Net;

/// <summary>
/// Summary description for MedicosBLL
/// </summary>
namespace Hospital
{
    public class MedicosBLL
    {
        public MedicosBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public int List_MedicoId_by_CodigoInt_SN(string CodigoInt)
        {
            MedicosDALTableAdapters.H2_MEDICOS_BUSCAR_POR_ID_INTERNO_SNTableAdapter adapter = new MedicosDALTableAdapters.H2_MEDICOS_BUSCAR_POR_ID_INTERNO_SNTableAdapter();
            MedicosDAL.H2_MEDICOS_BUSCAR_POR_ID_INTERNO_SNDataTable aTable = adapter.GetData(CodigoInt);
            foreach (MedicosDAL.H2_MEDICOS_BUSCAR_POR_ID_INTERNO_SNRow row in aTable.Rows)
            {
                return row.MedicoId;
            }
            return 0;
        }

        public List<medicos> Medicos_Por_Especialidad(int Especialidad)
        {
            MedicosDALTableAdapters.H2_Medicos_Lista_por_EspecialidadTableAdapter adapter = new MedicosDALTableAdapters.H2_Medicos_Lista_por_EspecialidadTableAdapter();
            MedicosDAL.H2_Medicos_Lista_por_EspecialidadDataTable aTable = adapter.GetData(Especialidad);

            List<medicos> Lista = new List<medicos>();

            foreach (MedicosDAL.H2_Medicos_Lista_por_EspecialidadRow row in aTable.Rows)
            {
                medicos m = new medicos();
                m.Medico = row.ApellidoYNombre;
                m.Id = row.Id;
                Lista.Add(m);
            }

            return Lista;
        }


        public List<medicos> Medicos_Por_Especialidad_Gastos_Extra(int Especialidad)
        {
            MedicosDALTableAdapters.H2_Medicos_Lista_por_Especialidad_Gastos_ExtraTableAdapter adapter = new MedicosDALTableAdapters.H2_Medicos_Lista_por_Especialidad_Gastos_ExtraTableAdapter();
            MedicosDAL.H2_Medicos_Lista_por_Especialidad_Gastos_ExtraDataTable aTable = adapter.GetData(Especialidad);

            List<medicos> Lista = new List<medicos>();

            foreach (MedicosDAL.H2_Medicos_Lista_por_Especialidad_Gastos_ExtraRow row in aTable.Rows)
            {
                medicos m = new medicos();
                m.Medico = row.ApellidoYNombre;
                m.Id = row.Id;
                Lista.Add(m);
            }

            return Lista;
        }


        public List<medicos> Medicos_Por_Especialidad_IMG(int Especialidad)
        {
            MedicosDALTableAdapters.H2_Medicos_Lista_por_Especialidad_IMGTableAdapter adapter = new MedicosDALTableAdapters.H2_Medicos_Lista_por_Especialidad_IMGTableAdapter();
            MedicosDAL.H2_Medicos_Lista_por_Especialidad_IMGDataTable aTable = adapter.GetData(Especialidad);

            List<medicos> Lista = new List<medicos>();

            foreach (MedicosDAL.H2_Medicos_Lista_por_Especialidad_IMGRow row in aTable.Rows)
            {
                medicos m = new medicos();
                m.Medico = row.ApellidoYNombre;
                m.Id = row.Id;
                Lista.Add(m);
            }

            return Lista;
        }

        public List<medicos> Medicos_Por_Especialidad_SoloActivos(int Especialidad)
        {
            MedicosDALTableAdapters.H2_Medicos_Lista_por_Especialidad_SoloActivosTableAdapter adapter = new MedicosDALTableAdapters.H2_Medicos_Lista_por_Especialidad_SoloActivosTableAdapter();
            MedicosDAL.H2_Medicos_Lista_por_Especialidad_SoloActivosDataTable aTable = adapter.GetData(Especialidad);

            List<medicos> Lista = new List<medicos>();

            foreach (MedicosDAL.H2_Medicos_Lista_por_Especialidad_SoloActivosRow row in aTable.Rows)
            {
                medicos m = new medicos();
                m.Medico = row.ApellidoYNombre;
                m.Id = row.Id;
                Lista.Add(m);
            }

            return Lista;
        }

        public List<medicos> Medicos_Por_Especialidad_SoloActivos(int Especialidad, string Tipo)
        {
            MedicosDALTableAdapters.H2_Medicos_Lista_por_Especialidad_SoloActivos_TipoTableAdapter adapter = new MedicosDALTableAdapters.H2_Medicos_Lista_por_Especialidad_SoloActivos_TipoTableAdapter();
            MedicosDAL.H2_Medicos_Lista_por_Especialidad_SoloActivos_TipoDataTable aTable = adapter.GetData(Especialidad, Tipo,0);

            List<medicos> Lista = new List<medicos>();

            foreach (MedicosDAL.H2_Medicos_Lista_por_Especialidad_SoloActivos_TipoRow row in aTable.Rows)
            {
                medicos m = new medicos();
                m.Medico = row.ApellidoYNombre;
                m.Id = row.Id;
                Lista.Add(m);
            }

            return Lista;
        }

        public List<medicos> Medicos_Por_Especialidad_SoloActivos(int Especialidad, string Tipo, int TLC)
        {
            MedicosDALTableAdapters.H2_Medicos_Lista_por_Especialidad_SoloActivos_TipoTableAdapter adapter = new MedicosDALTableAdapters.H2_Medicos_Lista_por_Especialidad_SoloActivos_TipoTableAdapter();
            MedicosDAL.H2_Medicos_Lista_por_Especialidad_SoloActivos_TipoDataTable aTable = adapter.GetData(Especialidad, Tipo, TLC);

            List<medicos> Lista = new List<medicos>();

            foreach (MedicosDAL.H2_Medicos_Lista_por_Especialidad_SoloActivos_TipoRow row in aTable.Rows)
            {
                medicos m = new medicos();
                m.Medico = row.ApellidoYNombre;
                m.Id = row.Id;
                Lista.Add(m);
            }

            return Lista;
        }
        

        public List<MedicoEspecialidad> MedicoEspecialidadesporMedicoId(int id)
        {
            MedicosDALTableAdapters.H2_Medicos_Especialidad_por_IDTableAdapter adapter = new MedicosDALTableAdapters.H2_Medicos_Especialidad_por_IDTableAdapter();
            MedicosDAL.H2_Medicos_Especialidad_por_IDDataTable aTable = adapter.GetData(id);
            List<MedicoEspecialidad> Lista = new List<MedicoEspecialidad>();

            foreach (MedicosDAL.H2_Medicos_Especialidad_por_IDRow row in aTable.Rows)
            {
                MedicoEspecialidad m = new MedicoEspecialidad();
                m.EspecialidadId = row.EspecialidadId;
                m.Especialidad = row.Especialidad;
                Lista.Add(m);
            }
            return Lista;

        }


        public List<MedicoEspecialidad> Especialidades_que_Atiende_el_Medico(int id)
        {
            MedicosDALTableAdapters.H2_Medicos_Especialidad_que_AtiendeTableAdapter adapter = new MedicosDALTableAdapters.H2_Medicos_Especialidad_que_AtiendeTableAdapter();
            MedicosDAL.H2_Medicos_Especialidad_que_AtiendeDataTable aTable = adapter.GetData(id);
            List<MedicoEspecialidad> Lista = new List<MedicoEspecialidad>();

            foreach (MedicosDAL.H2_Medicos_Especialidad_que_AtiendeRow row in aTable.Rows)
            {
                MedicoEspecialidad m = new MedicoEspecialidad();
                m.EspecialidadId = row.EspecialidadId;
                m.Especialidad = row.Especialidad;
                Lista.Add(m);
            }
            return Lista;

        }

        public List<MedicoEspecialidad> Especialidades_que_Atiende_el_Medico_por_Tipo(int id, string Tipo)
        {
            MedicosDALTableAdapters.H2_Medicos_Especialidad_que_Atiende_por_TipoTableAdapter adapter = new MedicosDALTableAdapters.H2_Medicos_Especialidad_que_Atiende_por_TipoTableAdapter();
            MedicosDAL.H2_Medicos_Especialidad_que_Atiende_por_TipoDataTable aTable = adapter.GetData(id,Tipo);
            List<MedicoEspecialidad> Lista = new List<MedicoEspecialidad>();

            foreach (MedicosDAL.H2_Medicos_Especialidad_que_Atiende_por_TipoRow row in aTable.Rows)
            {
                MedicoEspecialidad m = new MedicoEspecialidad();
                m.EspecialidadId = row.EspecialidadId;
                m.Especialidad = row.Especialidad;
                Lista.Add(m);
            }
            return Lista;

        }
        

        public List<medicos_Buscar> Medicos_Buscar(string Apellido, string MN, string MP, string ListaEsp)
        {
            MedicosDALTableAdapters.H2_Medicos_BuscarTableAdapter adapter = new MedicosDALTableAdapters.H2_Medicos_BuscarTableAdapter();
            MedicosDAL.H2_Medicos_BuscarDataTable aTable = adapter.GetData(Apellido, MN, MP, ListaEsp);

            List<medicos_Buscar> Lista = new List<medicos_Buscar>();

            foreach (MedicosDAL.H2_Medicos_BuscarRow row in aTable.Rows)
            {
                medicos_Buscar m = new medicos_Buscar();
                m.Medico = row.Nombre;
                m.Id = row.Id;
                if (!row.IsNroNull()) m.Nro = row.Nro;
                else m.Nro = "";
                m.Calle = row.Calle;
                if (!row.IsDeptoNull()) { m.Dpto = row.Depto; }
                else m.Dpto = "";
                if (!row.IsPisoNull()) { m.Piso = row.Piso; }
                else m.Piso = "";
                m.Localidad = row.Localidad;
                if (!row.IsProvinciaNull()) { m.Provincia = row.Provincia; }
                else m.Provincia = "";
                if (!row.IsNroDocNull()) { m.Documento = row.NroDoc; }
                else m.Documento = "";
                m.Especialidad = row.Especialidad;
                if (!row.IsFechaBajaNull())
                {
                    m.Estado = "Baja";
                }
                else
                {
                    m.Estado = "Activo";
                }
                
                Lista.Add(m);
            }

            return Lista;

        }



        public int Medicos_Guardar(List<medicos_Especialidades> objPracticas, int Id, string Apellido, DateTime FechaBaja, string MotivoBaja, string Calle, string Nro, string Piso, string Depto, string CP, int LocalidadId, string Provincia, string TipoDoc, string NroDoc, DateTime FechaNacimiento, string Sexo, string Telefono, string Mail, int CantMinSobreturno, string Observaciones, string IsActive, string Cuit, bool Retencion, bool Honorarios, bool MostrarenTurnos, int CantUrgencia,long usuario,int TLC)
        {
            string rHonorarios = null;
            string rRetencion = null;

            if (Honorarios) { rHonorarios = "A"; }
            if (Retencion) { rRetencion = "A"; }

            int Resultado = 0;
            MedicosDALTableAdapters.QueriesTableAdapter adapter = new MedicosDALTableAdapters.QueriesTableAdapter();
            try
            {
                Resultado = Convert.ToInt32(adapter.H2_Medico_Guardar(Id, Apellido, FechaBaja, MotivoBaja, Calle, Nro, Piso, Depto, CP, LocalidadId, Provincia, TipoDoc, NroDoc, FechaNacimiento, Sexo, Telefono, Mail, CantMinSobreturno, Observaciones, IsActive, Cuit, rRetencion, rHonorarios, MostrarenTurnos, CantUrgencia,usuario,TLC));
                if (Resultado > 0)
                {
                    adapter.H2_MedicoEspecialidad_Borrar(Id);
                    foreach (medicos_Especialidades esp in objPracticas)
                    {
                        adapter.H2_MedicoEspecialidad_Guardar(Resultado, esp.EspecialidadId, esp.MN, esp.MP, esp.Tipo_Guardia, esp.Tipo_Quirofano, esp.Tipo_Ambulatorio, esp.Tipo_Internacion, 0, 0, 0, esp.ESP_CHK);
                    }
                    return Resultado;
                }
                else return Resultado;
            }
            catch (Exception e) {
                throw new Exception(e.Message);
            }
                 
        }

        public List<medicos_Buscar_Info> Medicos_Buscar_Info_Todos(int Id) 
        {
            MedicosDALTableAdapters.H2_Medico_Detalles_IdTableAdapter adapter = new MedicosDALTableAdapters.H2_Medico_Detalles_IdTableAdapter();
            MedicosDAL.H2_Medico_Detalles_IdDataTable aTable = adapter.GetData(Id);

            List<medicos_Buscar_Info> list = new List<medicos_Buscar_Info>();

            foreach (MedicosDAL.H2_Medico_Detalles_IdRow row in aTable.Rows)
            {
                medicos_Buscar_Info m = new medicos_Buscar_Info();
                m.Id = row.Id;
                m.Medico = row.ApellidoYNombre;
                if (!row.IsFechaBajaNull()) { m.FechaBaja = row.FechaBaja.ToShortDateString(); }
                if (!row.IsMotivoBajaNull()) { m.MotivoBaja = row.MotivoBaja; }
                m.Calle = row.Calle;
                if (!row.IsNroNull()) { m.Nro = row.Nro; }
                if (!row.IsPisoNull()) { m.Piso = row.Piso; }
                if (!row.IsDeptoNull()) { m.Dpto = row.Depto; }
                if (!row.IsLocalidadIdNull()) { m.Localidad = row.LocalidadId.ToString(); }
                if (!row.IsProvinciaNull()) { m.Provincia = row.Provincia; }
                m.Documento = row.NroDoc;
                if (!row.IsFechaNacimientoNull()) { m.Fecha_Nacimiento = row.FechaNacimiento.ToShortDateString(); }
                if (!row.IsSexoNull()) { m.Sexo = row.Sexo; }
                if (!row.IsCuitNull()) { m.CUIT = row.Cuit; }
                if (!row.IsTelefonoNull()) { m.Telefono = row.Telefono; }
                if (!row.IsRetencionNull()) { m.AplicaRetenciones = "active"; } else { m.AplicaRetenciones = ""; }
                if (!row.IsCPNull()) { m.CodPos = row.CP; }
                if (!row.IsMailNull()) { m.EMail = row.Mail; }

                //if (!row.IsMailNull()){m.EMail = row.Mail;}
                m.Max_Sobreturno = row.CantMinSobreturno;
                if (!row.IsObservacionesNull()) { m.Observaciones = row.Observaciones; }
                if (!row.IsHonorariosNull()) { m.RindeHonorario = "active"; } else { m.RindeHonorario = ""; }
                if (!row.IsSoloenTurnosNull()) { m.MostrarenTurnos = row.SoloenTurnos == true ? "active" : ""; ; } else { m.MostrarenTurnos = ""; }
                list.Add(m);
            }

            return list;

        }

        public medicos_Buscar_Info Medicos_Buscar_Info(int Id)
        {
            MedicosDALTableAdapters.H2_Medico_Detalles_IdTableAdapter adapter = new MedicosDALTableAdapters.H2_Medico_Detalles_IdTableAdapter();
            MedicosDAL.H2_Medico_Detalles_IdDataTable aTable = adapter.GetData(Id);

            medicos_Buscar_Info m = new medicos_Buscar_Info();

            foreach (MedicosDAL.H2_Medico_Detalles_IdRow row in aTable.Rows)
            {
                m.Id = row.Id;
                m.Medico = row.ApellidoYNombre;
                if (!row.IsFechaBajaNull()) { m.FechaBaja = row.FechaBaja.ToShortDateString(); }
                if (!row.IsMotivoBajaNull()) { m.MotivoBaja = row.MotivoBaja; }
                m.Calle = row.Calle;
                if (!row.IsNroNull()) { m.Nro = row.Nro; }
                if (!row.IsPisoNull()) { m.Piso = row.Piso; }
                if (!row.IsDeptoNull()) { m.Dpto = row.Depto; }
                if (!row.IsLocalidadIdNull()) { m.Localidad = row.LocalidadId.ToString(); }
                if (!row.IsProvinciaNull()) { m.Provincia = row.Provincia; }
                m.Documento = row.NroDoc;
                if (!row.IsFechaNacimientoNull()) { m.Fecha_Nacimiento = row.FechaNacimiento.ToShortDateString(); }
                if (!row.IsSexoNull()) { m.Sexo = row.Sexo; }
                if (!row.IsCuitNull()) { m.CUIT = row.Cuit; }
                if (!row.IsTelefonoNull()) { m.Telefono = row.Telefono; }
                if (!row.IsRetencionNull()) { m.AplicaRetenciones = "active";} else {m.AplicaRetenciones="";}
                if (!row.IsCPNull()) { m.CodPos = row.CP; }                
                if (!row.IsMailNull()){m.EMail = row.Mail;}
                
                //if (!row.IsMailNull()){m.EMail = row.Mail;}
                m.Max_Sobreturno = row.CantMinSobreturno;
                if (!row.IsObservacionesNull()) { m.Observaciones = row.Observaciones; }
                if (!row.IsHonorariosNull()) { m.RindeHonorario = "active"; } else { m.RindeHonorario = ""; }
                if (!row.IsSoloenTurnosNull()) { m.MostrarenTurnos =  row.SoloenTurnos == true ? "active" : ""; ; } else { m.MostrarenTurnos = ""; }
            }

            return m;

        }

        public medicos_Buscar_Info Medicos_Buscar_Info_Con_Baja(int Id) //Busca info de los que estan dado de baja tambien.
        {
            MedicosDALTableAdapters.H2_Medico_Detalles_Id_TodosTableAdapter adapter = new MedicosDALTableAdapters.H2_Medico_Detalles_Id_TodosTableAdapter();
            MedicosDAL.H2_Medico_Detalles_Id_TodosDataTable aTable = adapter.GetData(Id);

            medicos_Buscar_Info m = new medicos_Buscar_Info();

            foreach (MedicosDAL.H2_Medico_Detalles_Id_TodosRow row in aTable.Rows)
            {
                m.Id = row.Id;
                m.Medico = row.ApellidoYNombre;
                if (!row.IsFechaBajaNull()) { m.FechaBaja = row.FechaBaja.ToShortDateString(); }
                if (!row.IsMotivoBajaNull()) { m.MotivoBaja = row.MotivoBaja; }
                m.Calle = row.Calle;
                if (!row.IsNroNull()) { m.Nro = row.Nro; }
                if (!row.IsPisoNull()) { m.Piso = row.Piso; }
                if (!row.IsDeptoNull()) { m.Dpto = row.Depto; }
                if (!row.IsLocalidadIdNull()) { m.Localidad = row.LocalidadId.ToString(); }
                if (!row.IsProvinciaNull()) { m.Provincia = row.Provincia; }
                m.Documento = row.NroDoc;
                if (!row.IsFechaNacimientoNull()) { m.Fecha_Nacimiento = row.FechaNacimiento.ToShortDateString(); }
                if (!row.IsSexoNull()) { m.Sexo = row.Sexo; }
                if (!row.IsCuitNull()) { m.CUIT = row.Cuit; }
                if (!row.IsTelefonoNull()) { m.Telefono = row.Telefono; }
                if (!row.IsRetencionNull()) { m.AplicaRetenciones = "active"; } else { m.AplicaRetenciones = ""; }
                if (!row.IsCPNull()) { m.CodPos = row.CP; }
                if (!row.IsMailNull()) { m.EMail = row.Mail; }

                if (!row.IsCantUrgenciaNull()) { m.CantUrgencia = row.CantUrgencia; }
                else m.CantUrgencia = 0;

                m.Max_Sobreturno = row.CantMinSobreturno;
                if (!row.IsObservacionesNull()) { m.Observaciones = row.Observaciones; }
                if (!row.IsHonorariosNull()) { m.RindeHonorario = "active"; } else { m.RindeHonorario = ""; }
                if (!row.IsSoloenTurnosNull()) { m.MostrarenTurnos = row.SoloenTurnos == true ? "active" : ""; ; } else { m.MostrarenTurnos = ""; }


    if(!row.IsnombreFirmaCNull()) { m.nombreFirmaC = row.nombreFirmaC; }
    if(!row.IsespecialidadNombreCNull()) { m.especialidadNombreC = row.especialidadNombreC; }
    if(!row.IsmatriculaNacionalCNull()) { m.matriculaNacionalC = row.matriculaNacionalC.ToString();} 
    if(!row.IsimagenRutaCNull()) { m.imagenRutaC = row.imagenRutaC; }

    if (!row.IsnombreFirmaANull()) { m.nombreFirmaA = row.nombreFirmaA; }
    if (!row.IsespecialidadNombreANull()) { m.especialidadNombreA = row.especialidadNombreA; }
    if (!row.IsmatriculaNacionalANull()) { m.matriculaNacionalA = row.matriculaNacionalA.ToString(); }
    if (!row.IsimagenRutaANull()) { m.imagenRutaA = row.imagenRutaA; }

    if (!row.IsnombreFirmaCCNull()) { m.nombreFirmaCC = row.nombreFirmaCC; }
    if (!row.IsespecialidadNombreCCNull()) { m.especialidadNombreCC = row.especialidadNombreCC; }
    if (!row.IsmatriculaNacionalCCNull()) { m.matriculaNacionalCC = row.matriculaNacionalCC.ToString(); }
    if (!row.IsimagenRutaCCNull()) { m.imagenRutaCC = row.imagenRutaCC; }

    if (!row.IsTeleconsultaNull()) { m.Teleconsulta = row.Teleconsulta; } else { m.Teleconsulta = 0; }

            }

            return m;

        }


        public medicos_Buscar_Nombre Medicos_Buscar_Nombre(int Id)
        {
            MedicosDALTableAdapters.H2_Medico_Detalles_IdTableAdapter adapter = new MedicosDALTableAdapters.H2_Medico_Detalles_IdTableAdapter();
            MedicosDAL.H2_Medico_Detalles_IdDataTable aTable = adapter.GetData(Id);

            medicos_Buscar_Nombre m = new medicos_Buscar_Nombre();
            if (aTable.Rows.Count > 0) 
            {
                m.Medico = aTable[0].ApellidoYNombre;                
            }

            return m;

        }



        public List<medicos_Especialidades> Medicos_Especialidades_Id(int Id)
        {
            MedicosDALTableAdapters.H2_Medico_Especialidades_IdTableAdapter adapter = new MedicosDALTableAdapters.H2_Medico_Especialidades_IdTableAdapter();
            MedicosDAL.H2_Medico_Especialidades_IdDataTable aTable = adapter.GetData(Id);

            List<medicos_Especialidades> Lista = new List<medicos_Especialidades>();

            foreach (MedicosDAL.H2_Medico_Especialidades_IdRow row in aTable.Rows)
            {
                medicos_Especialidades m = new medicos_Especialidades();
                m.Especialidad = row.Especialidades;
                m.EspecialidadId = row.Id;
                if (!row.IsNroMatNacionalNull()) { m.MN = row.NroMatNacional; } //else { m.MN = ""; }
                if (!row.IsNroMatProvincialNull()) { m.MP = row.NroMatProvincial; } //else { m.MP = ""; }
                m.Tipo_Ambulatorio = row.EsAmbulatorio;
                m.Tipo_Guardia = row.EsGuardia;
                m.Tipo_Internacion = row.EsInternacion;
                m.Tipo_Quirofano = row.EsQuirofano;
                if (!row.IsCHK_ESP_SHOWNull()) { m.CHK_ESP_SHOW = row.CHK_ESP_SHOW; }
                if (!row.IsESP_CHKNull()) { m.ESP_CHK = row.ESP_CHK; }

                Lista.Add(m);
            }

            return Lista;
        }






        public medicoslista Medicos_Encabezado(int MedicoId, int Especialidad)
        {
            MedicosDALTableAdapters.H2_Medicos_EncabezadoTableAdapter adapter = new MedicosDALTableAdapters.H2_Medicos_EncabezadoTableAdapter();
            MedicosDAL.H2_Medicos_EncabezadoDataTable aTable = adapter.GetData(MedicoId, Especialidad);

            medicoslista Lista = new medicoslista();

            foreach (MedicosDAL.H2_Medicos_EncabezadoRow row in aTable.Rows)
            {
                medicos m = new medicos();
                m.Medico = row.MedicoApellido;
                m.Id = row.MedicoId;
                m.Especialidad = row.Especialidad;
                Lista.Add(m);
            }

            return Lista;
        }


        internal bool SolicitarSoporte(string fecha, string consultorio, string hospital, string horainicio, string horafin, string usuario, string medico)
        {
            try {
                #region
                //Mail para enviar la solicitud. tener en cuenta que este mail tiene que tener seteado el smtp
                //Tambien tiene que ser coincidente con la clave del usuario del mail.
                //Los siguientes datos son los que se usan para enviar y recibir
                //el mail de solicitud de capacitacion de medico nuevo 
                #endregion
                //var fromAddress = new MailAddress("6esInMed@gmail.com", "GesInMed");
                //var fromAddress = new MailAddress("bkpavellaneda@gmail.com", "GesInMed");

                var fromAddress = new MailAddress("afiliados.quirof@gmail.com", "GesInMed");
                var toAddress = new MailAddress("soportegesinmed@gmail.com", "Sistemas");
                //var toAddress = new MailAddress("labouom@gmail.com", "Sistemas");
                //const string fromPassword = "avelino@2031";
                const string fromPassword = "quirofano3352";

                string subject = "Solicitud de capacitación médica";
                string Contenido = usuario + " solicita la capacitación para el/la dr./dra " + medico + ", el " + fecha + " entre las " + horainicio + " y " + horafin + " en el consultorio " + consultorio + " ubicado en el edificio " + hospital;
                string body = Contenido;
                var smtp = new SmtpClient
                {
                    Host = "smtp.gmail.com",
                    Port = 587,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
                };
                using (var message = new MailMessage(fromAddress, toAddress)
                {
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true
                })
                {                    
                    smtp.EnableSsl = true;
                    smtp.Send(message);                    
                    return true;
                }
            }
            catch{
                return false;
            }
        }
    }
}