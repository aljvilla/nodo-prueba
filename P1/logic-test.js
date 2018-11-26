// No editar
const teams = [
  { id: 1, country: 'Spain', name: 'Real Madrid C.F.' },
  { id: 2, country: 'Italy', name: 'A.C. Milan' },
  { id: 3, country: 'Spain', name: 'Futbol Club Barcelona' },
  { id: 4, country: 'Germany', name: 'FC Bayern Munich' },
  { id: 5, country: 'England', name: 'Liverpool F.C.' },
  { id: 6, country: 'Netherlands', name: 'AFC Ajax' },
  { id: 7, country: 'Italy', name: 'Inter Milan' },
  { id: 8, country: 'England', name: 'Manchester United F.C.' },
  { id: 9, country: 'England', name: 'Chelsea F.C.' },
  { id: 10, country: 'Portugal', name: 'FC Porto' },
  { id: 11, country: 'Germany', name: 'Borussia Dortmund' },
  { id: 12, country: 'Italy', name: 'Juventus FC' },
  { id: 13, country: 'France', name: 'Olympique Marseille' }

]

const leagues = [
  { id: 1, country: 'England', name: 'Premier League' },
  { id: 2, country: 'Germany', name: 'Bundesliga' },
  { id: 3, country: 'Netherlands', name: 'Eredivisie' },
  { id: 4, country: 'Spain', name: 'La Liga' },
  { id: 5, country: 'Italy', name: 'Serie A' },
  { id: 6, country: 'Portugal', name: 'Liga NOS' },
  { id: 7, country: 'France', name: 'Lige 1' }
]

const teamsByLeague = [
  { teamId: 12, leagueId: 5 },
  { teamId: 6, leagueId: 3 },
  { teamId: 2, leagueId: 5 },
  { teamId: 3, leagueId: 4 },
  { teamId: 4, leagueId: 2 },
  { teamId: 8, leagueId: 1 },
  { teamId: 10, leagueId: 6 },
  { teamId: 5, leagueId: 1 },
  { teamId: 7, leagueId: 5 },
  { teamId: 9, leagueId: 1 },
  { teamId: 11, leagueId: 2 },
  { teamId: 1, leagueId: 4 },
  { teamId: 13, leagueId: 7 }
]

const winsByTeams = [
  { teamId: 10, wins: 2 },
  { teamId: 6, wins: 4 },
  { teamId: 5, wins: 5 },
  { teamId: 1, wins: 13 },
  { teamId: 7, wins: 3 },
  { teamId: 4, wins: 5 },
  { teamId: 8, wins: 3 },
  { teamId: 2, wins: 7 },
  { teamId: 9, wins: 1 },
  { teamId: 3, wins: 5 },
  { teamId: 11, wins: 1 },
  { teamId: 12, wins: 2 },
  { teamId: 13, wins: 1 }
]

/*
  SECCIÓN PROBLEMAS
    - Las siguientes son preguntas básicas de Javascript y manejo de datos. Se evaluará eficiencia, ORDEN y claridad del código entregado.
    - Se debe programar un algoritmo para cada método y que este retorne lo requerido.
    - Debe usar nombres explicativos para sus variables.
    - Usar sintaxis ES6.
    - Puede utilizar funciones auxiliares como apoyo para tener una descomposición de código mas clara al momento de lectura.
    - Su prueba debe ejecutarse sin errores con: node logic-test.js
*/

const orderBy = ({ data, order, filed }) => {
  return data.sort((a, b) => {
    if (order && order === 'asc') {
      if (a[filed] < b[filed]) return -1;
      if (a[filed] > b[filed]) return 1;
    }
    if (b[filed] < a[filed]) return -1;
    if (b[filed] > a[filed]) return 1;
    return 0;
  });
}

const teamWins = (id) => {
  const teamsWins = winsByTeams.filter(({ teamId }) => teamId === id);
  return teamsWins;
}

const teamWinsByLeague = (id) => {
  const teamsIds = teamsByLeague.filter(({ leagueId }) => leagueId === id).map(({ teamId }) => teamId);
  const teamsWins = winsByTeams.filter(({ teamId }) => teamsIds.indexOf(teamId) > -1);
  return teamsWins;
}

const sum = data => data.reduce((accumulator, currValue) => accumulator + currValue);

// 0 Arreglo con los ids de los equipos (función de ejemplo)
function listTeamsIds() {
  return teams.map((client) => client.id)
}

// 1 Arreglo con los nombres de los equipos y el país al que pertenecen, ordenados alfabéticamente por el nombre de su país de origen.
function listTeamsByCountry() {
  // CODE HERE
  return teams.map(({ country }) => country);
}

// 2 Arreglo con los nombres de los equipos ordenados de mayor a menor por la cantidad de victorias en champions league.
function sortTeamsByWins() {
  const teamsWins = teams.map(({ id, name }) => {
    const wins = sum(teamWins(id).map(({ wins }) => wins));
    return { name, wins };
  });
  return orderBy({ data: teamsWins, filed: 'wins' });
}

// 3 Arreglo de objetos en donde se muestre el nombre de las ligas y la sumatoria de las victorias de los equipos que pertenecen a ellas.
function leaguesWithWins() {
  return leagues.map(({ id, name }) => {
    const totalsWins = sum(teamWinsByLeague(id).map(({ wins }) => wins));
    return { name, totalsWins };
  });
}

// 4 Objeto en que las claves sean los nombres de las ligas y los valores el nombre del equipo con la menor cantidad de victorias en champions.
function leaguesWithTeamWithLestWins() {
  const result = {};
  leagues.forEach(({ id, name }) => {
    const teamLessWins = orderBy({ data: teamWinsByLeague(id), filed: 'wins', order: 'asc' })[0];
    result[name] = teams.find(({ id }) => id === teamLessWins.teamId).name;
  });
  return result;
}

// 5 Objeto en que las claves sean los nombres de las ligas y los valores el nombre del equipo con la mayor cantidad de victorias en champions.
function leaguesWithTeamWithMostWins() {
  // CODE HERE
}

// 6 Arreglo con los nombres de las ligas ordenadas de mayor a menor por la cantidad de victorias de sus equipos.
function sortLeaguesByTeamsByWins() {
  const _teamWins = leagues.map(({ id, name }) => {
    const wins = sum(teamWinsByLeague(id).map(({ wins }) => wins));
    return { name, wins };
  });
  return orderBy({ data: _teamWins, filed: 'wins' }).map(({ name }) => name);
}

// 7 Arreglo con los nombres de las ligas ordenadas de mayor a menor por la cantidad de equipos que participan en ellas.
function sortLeaguesByTeams() {
  const _teamCountByLeague = leagues.map(({ id, name }) => {
    const teamCount = teamsByLeague.filter(({ leagueId }) => leagueId === id).length;
    return { name, teamCount };
  });
  return orderBy({ data: _teamCountByLeague, filed: 'teamCount' }).map(({ name }) => name);
}

// 8 Agregar un nuevo equipo con datos ficticios a "teams", asociarlo a la liga de Francia y agregar un total de 4 victorias en champions.
// Luego devolver el lugar que ocupa este equipo en el ranking de la pregunta 2.
// No modificar arreglos originales para no alterar las respuestas anteriores al correr la solución
function newTeamRanking() {
  teams.push({ id: 14, country: 'Paris', name: 'Manuel F.C.' });
  teamsByLeague.push({ teamId: 14, leagueId: 7 });
  winsByTeams.push({ teamId: 14, wins: 4 });
  const teamPos = sortTeamsByWins().findIndex(({ name }) => name === 'Manuel F.C.');
  return teamPos + 1;
}

// 9 Realice una función que retorne una promesa con los nombres de los equipos en upper case.
// haga la llamada a la función creada desde esta función y asignarle la respuesta a la variable response.
// recuerde que debe esperar el retorno de función asíncrona para que su resultado pueda ser mostrado por el
// console.log. Utilice async await para la llamada asíncrona a la función.
// NOTA: solo debe crear la función asíncrona y agregar la llamada en la siguiente función.
const asyncFunction = () => new Promise((resolve) => {
  resolve(teams.map(({ name }) => name.toUpperCase()));
});
async function getTeamsNamesAsUpperCase() {
  let response
  // ------MAKE AWAIT CALL HERE------
  response = await asyncFunction();
  // --------------------------------
  console.log('response:')
  console.log(response)
}

// Impresión de soluciones. No modificar.
console.log('Pregunta 0')
console.log(listTeamsIds())
console.log('Pregunta 1')
console.log(listTeamsByCountry())
console.log('Pregunta 2')
console.log(sortTeamsByWins())
console.log('Pregunta 3')
console.log(leaguesWithWins())
console.log('Pregunta 4')
console.log((leaguesWithTeamWithLestWins()))
console.log('Pregunta 5')
console.log((leaguesWithTeamWithMostWins()))
console.log('Pregunta 6')
console.log((sortLeaguesByTeamsByWins()))
console.log('Pregunta 7')
console.log((sortLeaguesByTeams()))
console.log('Pregunta 8')
console.log((newTeamRanking()))
console.log('Pregunta 9')
console.log(getTeamsNamesAsUpperCase())
