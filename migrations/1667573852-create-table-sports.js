exports.up = async (sql) => {
  await sql`
    CREATE TABLE sports (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name VARCHAR (90) NOT NULL

    )
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE sports
  `;
};
