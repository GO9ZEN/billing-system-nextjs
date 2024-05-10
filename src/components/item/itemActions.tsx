"use server";

import Database from "better-sqlite3";

const maindbFileName = "app.db";

///////////////////////// INSERT DATA /////////////////////////
export const insertItem = async (data: any) => {
  const db = new Database(maindbFileName);
  db.pragma("journal_mode = WAL");

  const stmt = db.prepare(
    "INSERT INTO item (itemName, itemType, itemPricePerUnit) VALUES (?, ?, ?)"
  );

  const info = stmt.run(data.itemName, data.itemType, data.itemPricePerUnit);

  db.close();
  if (info.changes == 1) {
    return Promise.resolve({
      success: true,
      msg: "Data Saved",
      lastInsertRowid: info.lastInsertRowid,
    });
  } else {
    return Promise.reject({ success: false, msg: "Insert failed" });
  }
};

///////////////////////// GET DATA /////////////////////////
export const getItemList = async () => {
  const db = new Database(maindbFileName);
  db.pragma("journal_mode = WAL");

  const res = db.prepare("SELECT * FROM item").all();

  db.close();

  return Promise.resolve({
    success: true,
    msg: "All Data Displayed",
    data: res,
  });
};

///////////////////////// GET DATA BY ID /////////////////////////
export const getItems = async (id: number) => {
  const db = new Database(maindbFileName);
  db.pragma("journal_mode = WAL");

  const res = db.prepare("SELECT * FROM item WHERE id = ?").get(id);

  db.close();

  return Promise.resolve({
    success: true,
    msg: "All Data Displayed",
    data: res,
  });
};

///////////////////////// UPDATE DATA BY ID /////////////////////////
export const updateItems = async (item: any) => {
  const db = new Database(maindbFileName);
  db.pragma("journal_mode = WAL");

  try {
    const res = db
      .prepare(
        "UPDATE item SET itemName=?, itemType=?, itemPricePerUnit=? WHERE id=?"
      )
      .run(item.itemName, item.itemType, item.itemPricePerUnit, item.id);

    db.close();

    return Promise.resolve({
      success: true,
      msg: "All Data Updated",
      data: res,
    });
  } catch (error: any) {
    return Promise.resolve({
      success: false,
      msg: "Data Didn't Updated",
      data: error.message,
    });
  }
};

///////////////////////// DELETE DATA BY ID /////////////////////////
export const deleteItemsId = async (id: any) => {
  const db = new Database(maindbFileName);
  db.pragma("journal_mode = WAL");

  const res = db.prepare("DELETE FROM item WHERE id = ?").run(id);

  db.close();

  return Promise.resolve({
    success: true,
    msg: "Data Deleted",
    data: res,
  });
};
