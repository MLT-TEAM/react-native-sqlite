import React, { useEffect, useState } from "react";

import Nav from "@/components/bottomNavigation";
import { Appbar } from "react-native-paper";
import { insertTest, selectTest, useSelectAllTest } from "@/composable/testRepository";
import { useSQLiteContext } from "expo-sqlite";

export default function TabLayout() {
  // const colorScheme = useColorScheme();

  const db = useSQLiteContext();

  const { data, error } = useSelectAllTest();



  const onSubmit = async () => {
    const { changes, lastInsertRowId } = await insertTest(db, {
      value: "hello world",
      intValue: 1,
    });


    const { data : tests}  = await selectTest(db); 


    console.log(tests)


  };



  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            onSubmit();
          }}
        />
        <Appbar.Content title="screen holder of the minimize this please" />
        <Appbar.Action icon="calendar" onPress={() => {}} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>

      <Nav />
    </>
  );
}
