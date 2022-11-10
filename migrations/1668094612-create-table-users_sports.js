exports.up = async (sql) => {
  await sql`
    CREATE TABLE users_sports (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id integer REFERENCES users (id) ON DELETE CASCADE,
      sports_id integer REFERENCES sports (id)
    )
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE users_sports
  `;
};
