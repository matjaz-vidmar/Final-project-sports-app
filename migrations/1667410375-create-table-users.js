exports.up = async (sql) => {
  await sql`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      username VARCHAR (90) NOT NULL,
      password_hash VARCHAR (70) NOT NULL UNIQUE,
      email VARCHAR (70) NOT NULL,
      address VARCHAR (100) NOT NULL,
      sports_selection VARCHAR (150) NOT NULL
    )
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE users
  `;
};
