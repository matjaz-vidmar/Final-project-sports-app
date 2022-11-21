const sports = [
  { id: 1, name: 'archery' },
  { id: 2, name: 'badminton' },
  { id: 3, name: 'basketball' },
  { id: 4, name: 'fitness' },
  { id: 5, name: 'golf' },
  { id: 6, name: 'martial arts' },
  { id: 7, name: 'mountain climbing' },
  { id: 8, name: 'swimming' },
  { id: 9, name: 'tennis' },
  { id: 10, name: 'volleyball' },
  { id: 11, name: 'table tennis' },
];

exports.up = async (sql) => {
  await sql`
    INSERT INTO sports ${sql(sports, 'id', 'name')}
  `;
};

exports.down = async (sql) => {
  for (const sport of sports) {
    await sql`
      DELETE FROM
        sports
      WHERE
        name = ${sport.name}
    `;
  }
};
