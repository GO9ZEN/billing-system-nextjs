"use server";

import Database from "better-sqlite3";

const maindbFileName = "app.db";

///////////////////////// INSERT DATA /////////////////////////
export const insertCustomer = async (data: any) => {
  const db = new Database(maindbFileName);
  db.pragma("journal_mode = WAL");

  const stmt = db.prepare(
    "INSERT INTO customer (cusName, cusAddress, cusNIC, cusOccupation) VALUES (?, ?, ?, ?)"
  );

  const info = stmt.run(
    data.cusName,
    data.cusAddress,
    data.cusNIC,
    data.cusOccupation
  );

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
export const getCustomerList = async () => {
  const db = new Database(maindbFileName);
  db.pragma("journal_mode = WAL");

  const res = db.prepare("SELECT * FROM customer").all();

  db.close();

  return Promise.resolve({
    success: true,
    msg: "All Data Displayed",
    data: res,
  });
};

///////////////////////// GET DATA BY ID /////////////////////////
export const getCustomers = async (id: number) => {
  const db = new Database(maindbFileName);
  db.pragma("journal_mode = WAL");

  const res = db.prepare("SELECT * FROM customer WHERE id = ?").get(id);

  db.close();

  return Promise.resolve({
    success: true,
    msg: "All Data Displayed",
    data: res,
  });
};

///////////////////////// UPDATE DATA BY ID /////////////////////////
export const updateCustomers = async (customer: any) => {
  const db = new Database(maindbFileName);
  db.pragma("journal_mode = WAL");

  try {
    const res = db
      .prepare(
        "UPDATE customer SET cusName=?, cusAddress=?, cusNIC=?, cusOccupation=? WHERE id=?"
      )
      .run(
        customer.cusName,
        customer.cusAddress,
        customer.cusNIC,
        customer.cusOccupation,
        customer.id
      );

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
export const deleteCustomersId = async (id: any) => {
  const db = new Database(maindbFileName);
  db.pragma("journal_mode = WAL");

  const res = db.prepare("DELETE FROM customer WHERE id = ?").run(id);

  db.close();

  return Promise.resolve({
    success: true,
    msg: "Data Deleted",
    data: res,
  });
};
