exports.up = async (sql) => {
  await sql`
    CREATE TABLE sports (
      id integer PRIMARY KEY,
      name VARCHAR (90) NOT NULL
    )
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE sports
  `;
};
