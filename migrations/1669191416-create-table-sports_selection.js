exports.up = async (sql) => {
  await sql`
    CREATE TABLE sports_selection (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name VARCHAR (150) NOT NULL
    )
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE sports_selection
  `;
};
