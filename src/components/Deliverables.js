import React, { useEffect, useState } from "react";
import resList from "./resList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [getState, getState1] = useState(false);
  const [preq1, preq2] = useState(false);
  const [res, res1] = useState([]);

  useEffect(() => {
    const getresHandler = async  () => {
      getState1(true);
      const response = await fetch('http://localhost:8001/res');
      const responseData = await response.json();
      res1(responseData);
      getState1(false);
    };
    getresHandler();
  }, []);

  useEffect(() => {
    res1(res);
  }, [res]);

  const searchHandler = async (input) => {
    res1(res.filter((each) => each.description.toLowerCase().includes(input)));

  }


  const addTransactionHandler = async (date, description, category, amount) => {
    try {
      preq2(true);
      const response = await fetch('http://localhost:8001/res', { method: 'POST', headers: { 'Content-Type': 'application/json', 'accept': 'application/json' }, body: JSON.stringify({ date, description, category, amount: parseInt(amount) }) });
      const responseData = await response.json();
      res1(prevres => [...prevres, responseData]);
    } catch(err) {
      console.log(err);
    } finally {
      preq2(false);
    }
  }

  return (
    <div>
      <Search searchHandler={searchHandler} />
      <AddTransactionForm preq1={preq1} addTransactionHandler={addTransactionHandler} />
      <resList getState={getState} res={res} />
    </div>
  );
}

export default AccountContainer;
