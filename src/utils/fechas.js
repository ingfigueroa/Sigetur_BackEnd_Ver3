
function capitalizarPrimera(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
export const formatearFecha = (fecha) => {
  if (!fecha) return "";

  const fechaString = String(fecha);

  const fechaObj = new Date(
    fechaString.includes("T")
      ? fechaString
      : `${fechaString}T00:00:00`
  );

  const dia = String(fechaObj.getUTCDate()).padStart(2, "0");
  const mes = String(fechaObj.getUTCMonth() + 1).padStart(2, "0");
  const ano = fechaObj.getUTCFullYear();

  return `${dia}-${mes}-${ano}`;
};

export const formatearFechaentradd_mm_yyy_sale_yyyy_mm_dd = (fecha) => {
  
  if (!fecha) return "";

  const dia = fecha.substring(0, 2);
  const mes = fecha.substring(fecha.indexOf("-") + 1, fecha.lastIndexOf("-"));
  const anio = fecha.substring(fecha.lastIndexOf("-") + 1);

  return `${anio}-${mes}-${dia}`;
};

 
export const formatearFecha_a_MM_DD_YYYY = (fecha) => {
  if (!fecha) return "";

  // Si viene como dd/MM/yyyy
  if (typeof fecha === "string" && fecha.includes("/")) {
    const partes = fecha.split("/");

    if (partes.length !== 3) return "";

    const [dia, mes, anio] = partes;

    if (
      isNaN(dia) ||
      isNaN(mes) ||
      isNaN(anio)
    ) {
      return "";
    }

    return `${dia.padStart(2, "0")}-${mes.padStart(2, "0")}-${anio}`;
  }

  // Para Date, ISO, yyyy-MM-dd, etc.
  const fechaObj = new Date(fecha);

  if (isNaN(fechaObj.getTime())) {
    return "";
  }

  const dia = String(fechaObj.getDate()).padStart(2, "0");
  const mes = String(fechaObj.getMonth() + 1).padStart(2, "0");
  const anio = fechaObj.getFullYear();

  return `${dia}-${mes}-${anio}`;
};

export const formatearFechaLarga = (fecha, mostrarAno = false) => {
  if (!fecha) return "";
  

  const fechaObj = new Date(fecha);

  const opciones = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  if (mostrarAno) {
    opciones.year = "numeric";
  }

  const fechaLarga = fechaObj
    .toLocaleDateString("es-AR", opciones)
    .replace(",", "");

  return capitalizarPrimera(fechaLarga);
};
export const formatearFechaLargaConelAnio = (fecha, mostrarAno = true) => {
 
  //llega una fecha con formato dd-mm-yyyy

  if (!fecha) return "";

  const [dia, mes, anio] = fecha.split("-");

  const fechaObj = new Date(anio, mes - 1, dia);

  // sumar 1 día
  fechaObj.setDate(fechaObj.getDate() + 1);

  const opciones = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  if (mostrarAno) opciones.year = "numeric";

  return fechaObj
    .toLocaleDateString("es-AR", opciones)
    .replace(",", "");
};

export const formatearFechaLargaConelAnio_llegafechalarga = (
  fecha,
  mostrarAno = true
) => {
  if (!fecha) return "";

  const fechaObj = new Date(fecha);

  const opciones = {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  };

  if (mostrarAno) {
    opciones.year = "numeric";
  }

  return fechaObj
    .toLocaleDateString("es-AR", opciones)
    .replace(",", "");
};

export const formatearFechaDia_Mes_Anio_Con_Guiones = (fecha) => {
  if (!fecha) return "";

  const [dia, mes, anio] = fecha.split("/");

  return `${dia}-${mes}-${anio}`;
};


export const obtenerMes = (fechaInput = new Date()) => {
  const fecha = new Date(fechaInput); // convertir string a Date si es necesario
  const opciones = { month: "long" };
  return fecha.toLocaleDateString("es-AR", opciones).toUpperCase();
};

 export function ajustarHoraArgentina(fechaUTC) {
    return new Date(
      new Date(fechaUTC).getTime() + 3 * 60 * 60 * 1000
    ).toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

// Días de la semana en mayúsculas
export const diasSemana = [
  "LUNES",
  "MARTES",
  "MIÉRCOLES",
  "JUEVES",
  "VIERNES",
  "SÁBADO",
  "DOMINGO",
];

// Meses en mayúsculas
export const meses = [
  "ENERO",
  "FEBRERO",
  "MARZO",
  "ABRIL",
  "MAYO",
  "JUNIO",
  "JULIO",
  "AGOSTO",
  "SEPTIEMBRE",
  "OCTUBRE",
  "NOVIEMBRE",
  "DICIEMBRE",
];

// Obtener día de la semana de una fecha (ej: "MARTES")
export function getDiaSemana(fecha) {
  const indice = new Date(fecha).getDay(); // 0=Domingo, 1=Lunes...
  return diasSemana[(indice + 6) % 7]; // ajusto para que Lunes sea primero
}

// Obtener mes en mayúsculas (ej: "AGOSTO")
export function getMes(fecha) {
  const indice = new Date(fecha).getMonth(); // 0=Enero
  return meses[indice];
}

  export function handleFechaChange(fecha) {
    if (!fecha) return null;

    const fechaISO = fecha;

    // Convertir la fecha a objeto Date (sin aplicar ajustes de zona horaria)
    const fechaObj = new Date(fechaISO);

    // Ajustar la fecha al UTC manualmente
    const fechaLocal = new Date(
      fechaObj.getTime() + fechaObj.getTimezoneOffset() * 60000
    );

    // Formatear usando toLocaleString o date-fns como prefieras
    const fechaLarga = fechaLocal.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return fechaLarga;
  };



// Obtener la fecha de hoy en formato YYYY-MM-DD (útil para inputs type="date")
export function getFechaActualISO() {
  return new Date().toISOString().split("T")[0];
}


export function getFechaISO(fecha) {
  if (!fecha) return "";

  // Si ya es un objeto Date
  if (fecha instanceof Date && !isNaN(fecha)) {
    return fecha.toISOString().split("T")[0];
  }

  const fechaString = String(fecha).trim();

  // Formato YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(fechaString)) {
    return fechaString;
  }

  // Formato DD-MM-YYYY o DD/MM/YYYY
  const match = fechaString.match(/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/);

  if (match) {
    const [, dia, mes, anio] = match;

    return `${anio}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
  }

  // Intentar parsear otros formatos válidos de JS
  const fechaObj = new Date(fechaString);

  if (!isNaN(fechaObj)) {
    return fechaObj.toISOString().split("T")[0];
  }

  return "";
}

// fecha.js
export function validarHorasDesdeHastaIntervalo(horaDesdeId, horaHastaId, intervalo, mensajeOut) {

  if (horaDesdeId === null || horaDesdeId === undefined || horaDesdeId === "") {
    return { valido: false, mensaje: mensajeOut + "Falta seleccionar HORA DESDE."};
  }
   if (!horaHastaId) {
    return { valido: false, mensaje: mensajeOut + "Falta seleccionar HORA HASTA. "};
  }
   if (!intervalo) {
    return { valido: false, mensaje: mensajeOut + "Falta seleccionar el INTERVALO. "};
  }

  if (horaDesdeId >= horaHastaId) {
    
    return { valido: false, mensaje: mensajeOut + " La hora DESDE no puede ser mayor o igual a la hora HASTA."};
  }

  return { valido: true, mensaje: "Rango de horas válido" };
}

// src/utils/fecha.js
export function calcularEdadAnioMesDia(fechaNacimiento) {
  //funciona si la fecha viene con formato AÑO-MES-DIA
 
  if (!fechaNacimiento) return null;

  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const m = hoy.getMonth() - nacimiento.getMonth();

  if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
}

export function calcularEdadDiaMesAnio(fechaNacimiento) {
  if (!fechaNacimiento) return null;

  let nacimiento;

  if (typeof fechaNacimiento === "string") {
    const partes = fechaNacimiento.split("-");

    if (partes[0].length === 4) {
      // formato YYYY-MM-DD
      nacimiento = new Date(fechaNacimiento);
    } else {
      // formato DD-MM-YYYY
      const [dia, mes, anio] = partes;
      nacimiento = new Date(anio, mes - 1, dia);
    }
  } else {
    nacimiento = new Date(fechaNacimiento);
  }

  if (isNaN(nacimiento)) return null;

  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const m = hoy.getMonth() - nacimiento.getMonth();

  if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }

  return edad;
}

//convierte la fecha para usarla en Calendar
export function toLocalDate(date) {
  if (!date) return null;
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function getFechaDMY(fecha) {
  if (!fecha) return "";

  const fechaObj = new Date(fecha);

  const dia = String(fechaObj.getUTCDate()).padStart(2, "0");
  const mes = String(fechaObj.getUTCMonth() + 1).padStart(2, "0");
  const anio = fechaObj.getUTCFullYear();

  return `${dia}-${mes}-${anio}`;
}
export function crearFechaHora(fecha, hora) {
  if (!fecha || !hora) return null;

  const [dia, mes, anio] = fecha.split("-");
  const [hs, min] = hora.split(":");

  return new Date(
    parseInt(anio, 10),
    parseInt(mes, 10) - 1,
    parseInt(dia, 10),
    parseInt(hs, 10),
    parseInt(min, 10)
  );
}

export const formatearFechaLargaConelAnio_llegafechalarga_Ver1 = (
  fecha,
  mostrarAno = true
) => {

  //llega una fecha tipo 2026-05-20T00:00:00.000Z

  if (!fecha) return "";

  const fechaObj = new Date(fecha);

  const opciones = {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  };

  if (mostrarAno) {
    opciones.year = "numeric";
  }

  return fechaObj
    .toLocaleDateString("es-AR", opciones)
    .replace(",", "");
};
