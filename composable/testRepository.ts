//? this file contain sql query of the table named test

import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";

type Test = {
  id?: number;
  value: number | string;
  intValue: number;
};

//! make sure to use it inside provider
export const useSelectAllTest = () => {
  const db = useSQLiteContext();

  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await db.getAllAsync("SELECT * FROM test");
        setData(data as any);
        setError(undefined);
      } catch (e) {
        setError(e as any);
        setData(undefined);
      }
    };

    getData();
  }, []);

  return { data, error };
};



export const selectTest = async (db: SQLiteDatabase) => {
  //use inside non function component
  let error = undefined;
  const data = await db
    .getAllAsync("SELECT * FROM test")
    .catch((err) => (error = err));

  return { data, error };
};



export const insertTest = async (db: SQLiteDatabase, test: Test) => {
  const { changes, lastInsertRowId } = await db.runAsync(
    "INSERT INTO test (value, intValue) values(?, ?)",
    [test.value, test.intValue]
  );

  return { changes, lastInsertRowId };
};
