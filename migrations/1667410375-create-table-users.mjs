export async function up(sql) {
  await sql`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      username VARCHAR (90) NOT NULL,
      password_hash VARCHAR (70) NOT NULL UNIQUE
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE users
  `;
}
