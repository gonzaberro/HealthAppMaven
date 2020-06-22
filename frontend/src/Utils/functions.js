const getAllInputNames = () => {
  const form = document.getElementById("form");
  if (form == null) return [];

  let arrayOfInputNames = [];
  const inputs = form.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    arrayOfInputNames.push(inputs[i].name);
  }
  return arrayOfInputNames;
};

export const setDefaultFormInput = () => {
  const names = getAllInputNames();

  let state = {};
  if (names != null && names.length > 0) {
    state = names.reduce((acc, curr) => {
      acc[curr] = "";
      return acc;
    }, {});
  }
  return state;
};

export function parseISOString(s, format) {
  let b = s.split(/\D+/);
  const date = new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  return format !== undefined && format === 2
    ? fechaStringFormat2(date)
    : fechaString(date);
}

export const fechaString = (date) => {
  const ye = new Intl.DateTimeFormat("es", { year: "numeric" }).format(date);
  const mo = new Intl.DateTimeFormat("es", { month: "2-digit" }).format(date);
  const da = new Intl.DateTimeFormat("es", { day: "2-digit" }).format(date);
  return ye + "-" + mo + "-" + da;
};

export const fechaStringFormat2 = (date) => {
  const ye = new Intl.DateTimeFormat("es", { year: "numeric" }).format(date);
  const mo = new Intl.DateTimeFormat("es", { month: "2-digit" }).format(date);
  const da = new Intl.DateTimeFormat("es", { day: "2-digit" }).format(date);
  return da + "/" + mo + "/" + ye;
};
