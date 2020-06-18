export const obraSocialOptions = [
  "Swiss Medical",
  "Asociart ART",
  "Suteba",
  "PAMI",
  "Paramedic",
];

export const columnsPacientes = [
  "Nombre",
  "Apellido",
  "DNI",
  "Teléfono",
  "Dirección",
  "Correo Electrónico",
  "Obra Social",
];

export const formPacientes = [
  { name: "nombre", label: "Nombre" },
  { name: "apellido", label: "Apellido" },
  { name: "dni", label: "N° de Documento" },
  { name: "telefono", label: "Teléfono" },
  { name: "direccion", label: "Dirección" },
  { name: "email", label: "Correo Electrónico" },
  { name: "obraSocial", label: "Obra Social", select: true },
];

export const columnsPersonalMedico = [
  "Nombre",
  "Apellido",
  "Dirección",
  "Teléfono",
  "Correo Electrónico",
  "Matrícula",
  "DNI",
];

export const formPersonalMedico = [
  { name: "nombre", label: "Nombre" },
  { name: "apellido", label: "Apellido" },
  { name: "direccion", label: "Dirección" },
  { name: "telefono", label: "Teléfono" },
  { name: "email", label: "Correo Electrónico" },
  { name: "matricula", label: "Matrícula" },
  { name: "dni", label: "N° de Documento" },
];

export const columnsInstituciones = ["Nombre", "CUIT", "Dirección", "Teléfono"];

export const formInstituciones = [
  { name: "nombre", label: "Nombre" },
  { name: "cuit", label: "CUIT" },
  { name: "direccion", label: "Dirección" },
  { name: "telefono", label: "Teléfono" },
  { name: "logo", label: "Logo" },
];

export const columnsObraSocial = ["Nombre"];

export const formObraSocial = [{ name: "nombre", label: "Nombre" }];

export const columnsEspecialidades = ["Nombre"];

export const formEspecialidades = [{ name: "nombre", label: "Nombre" }];
