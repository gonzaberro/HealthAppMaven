export const make_data = function () {
  let turnos_total = { mes: 6, dias: [] };

  for (let i = 1; i <= 30; i++) {
    for (let j = 1; j <= 30; j++) {
      turnos_total.dias.push({
        dia: i,
        paciente: "Gonzalo Martin Berro " + j,
        horario: "02:00",
      });
    }
  }
  return turnos_total;
};
export const turnos = make_data();
