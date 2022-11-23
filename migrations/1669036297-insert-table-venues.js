const venues = [
  {
    id: 1,
    sport_id: 1,
    name: 'UBSC Artemis Wien - Bogensport - Halle Contiweg',
    address: 'Contiweg 1, 1220 Wien',
  },
  {
    id: 2,
    sport_id: 1,
    name: 'UBSC Artemis Wien - Bogensport - Hasenleitengasse',
    address: 'Hasenleitengasse, 1110 Wien',
  },
  {
    id: 3,
    sport_id: 1,
    name: 'Arco Vienna Club',
    address: 'Praterstraße 9, 1020 Wien',
  },
  {
    id: 4,
    sport_id: 2,
    name: 'Sport & Fun Halle Favoriten',
    address: 'Windtenstraße 2, 1100 Wien',
  },
  {
    id: 5,
    sport_id: 2,
    name: 'Racketworld',
    address: 'Kendlerstraße 47, 1160 Wien',
  },
  {
    id: 6,
    sport_id: 2,
    name: 'Vienna Racket Club Badminton',
    address: 'Hopsagasse 7, 1200 Wien',
  },
  {
    id: 7,
    sport_id: 3,
    name: 'Basketballplatz',
    address: 'Zwölfergasse 29, 1150 Wien',
  },
  {
    id: 8,
    sport_id: 3,
    name: 'Sportplatz Wienerberg, Basketball',
    address: 'Eibesbrunnergasse 13, 1100 Wien',
  },
  {
    id: 9,
    sport_id: 4,
    name: 'FITINN Fitnessstudio',
    address: 'Hartmanngasse 1, 1050 Wien',
  },
  {
    id: 10,
    sport_id: 4,
    name: 'clever fit Wien-Favoriten',
    address: 'K6, Kundratstraße 6, 1100 Wien',
  },
  {
    id: 11,
    sport_id: 4,
    name: `SAYYES women's Gym - DAS Fitnessstudio für Frauen`,
    address: 'Am Heumarkt, 7/6/49, Beatrixgasse 26/49, 1030 Wien',
  },
  {
    id: 12,
    sport_id: 5,
    name: 'Golf AUSTRIA Team',
    address: 'Viehmarktgasse, 1030 Wien',
  },
  {
    id: 13,
    sport_id: 5,
    name: 'Golf Club Wien',
    address: 'Freudenau 65A, 1020 Wien',
  },
  {
    id: 14,
    sport_id: 6,
    name: 'Bushido Martial Arts & Vitality Training',
    address: 'Margaretenstraße 28, 1040 Wien',
  },
  {
    id: 15,
    sport_id: 6,
    name: 'Shaolin Chan Wu Chi Austria',
    address: 'Invalidenstraße 7, 1030 Wien',
  },

  {
    id: 16,
    sport_id: 6,
    name: 'Taekwondo Wien - Traditional Style Taekwon-Do Global',
    address: 'Riemergasse 14, 1010 Wien',
  },
  {
    id: 17,
    sport_id: 7,
    name: 'Alpenverein Edelweiss',
    address: 'Walfischgasse 12, 1010 Wien',
  },
  {
    id: 18,
    sport_id: 7,
    name: 'Alpenverein Austria - Kletterzentrum Flakturm',
    address:
      'Figuren am Eingang zum Esterházypark, Gumpendorfer Str., 1060 Wien',
  },
  {
    id: 19,
    sport_id: 8,
    name: 'Hermannbad',
    address: 'Hermanngasse 28, 1070 Wien',
  },
  {
    id: 20,
    sport_id: 8,
    name: 'Stadthallenbad',
    address: 'Hütteldorfer Str. 2H, 1150 Wien',
  },
  {
    id: 21,
    sport_id: 8,
    name: 'Schwimmverein Donaukanal - Schwimmstop Alsergarten',
    address: 'Glasergasse 25, 1090 Wien',
  },
  {
    id: 22,
    sport_id: 9,
    name: 'WAC Tennis Halle',
    address: 'Rustenschacherallee 9, 1020 Wien',
  },
  {
    id: 23,
    sport_id: 9,
    name: 'Tennisanlage Hrubesch',
    address: 'Rosensteingasse 93, 1170 Wien',
  },
  {
    id: 24,
    sport_id: 9,
    name: 'Tennis Club P48',
    address: 'Porzellangasse 48, 1090 Wien',
  },
  {
    id: 25,
    sport_id: 10,
    name: 'TimeOut Beachcamps',
    address: 'Blindengasse, 1080 Wien',
  },
  {
    id: 26,
    sport_id: 10,
    name: 'Beachvolleyballplatz Augarten',
    address: 'Rauscherstraße 16, 1020 Wien',
  },
  {
    id: 27,
    sport_id: 10,
    name: 'Beachvolleyballfelder im Prater',
    address: 'Rustenschacherallee 1, 1020 Wien',
  },
  {
    id: 28,
    sport_id: 11,
    name: 'Table Tennis Center Langegasse',
    address: 'Lange G. 69, 1080 Wien',
  },
  {
    id: 29,
    sport_id: 11,
    name: 'Wiener Tischtennis Center',
    address: 'Fasangasse 25, 1030 Wien',
  },
  {
    id: 30,
    sport_id: 11,
    name: 'LSV Lehrersportverein Tischtennis',
    address: 'Neubaugürtel 4, 1070 Wien',
  },
];
exports.up = async (sql) => {
  await sql`
    INSERT INTO
     venues
    ${sql(venues, 'id', 'sport_id', 'name', 'address')}
  `;
};

exports.down = async (sql) => {
  for (const venue of venues) {
    await sql`
      DELETE FROM
        venues
      WHERE
        name = ${venue.name}
    `;
  }
};
