import * as SQLite from "expo-sqlite";


// create db if its not exist it will execute only when first app installed //!(probably ;-P)

export async function migrateDbIfNeeded(db: SQLite.SQLiteDatabase) {
  const DATABASE_VERSION = 1;

  let { user_version: currentDbVersion } = (await db.getFirstAsync<{
    user_version: number;
  }>("PRAGMA user_version")) ?? { user_version: 0 };

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {

    //? init database schema 

     await db.execAsync(`
        PRAGMA journal_mode = 'wal';
        CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
    `);
    await db.runAsync(
      "INSERT INTO test (value, intValue) VALUES (?, ?)",
      "hello",
      1
    );

    await db.runAsync(
      "INSERT INTO test (value, intValue) VALUES (?, ?)",
      "world",
      2
    );

    currentDbVersion = 1;
  }

  if (currentDbVersion === 1) {
    // Add more migrations
  }


  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
