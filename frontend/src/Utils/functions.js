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
