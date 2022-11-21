exports.up = async (sql) => {
  await sql`
  CREATE TABLE venues (
    id integer PRIMARY KEY,
    sport_id integer,
    name VARCHAR (100) NOT NULL,
    address VARCHAR (120) NOT NULL
  )
  `;
};

exports.down = async (sql) => {
  await sql`
  DROP TABLE venues
  `;
};
