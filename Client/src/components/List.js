import React from "react";
import { default as api } from "./store/apiSlice";
import { IoTrashOutline } from "react-icons/io5";

export const List = () => {
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
  const [deleteTransaction] = api.useDeleteTransactionMutation();

  let Transactions;
  const handlerClick = (e) => {
    if (!e.target.dataset.id) return 0;
    deleteTransaction({ _id: e.target.dataset.id });
  };

  if (isFetching) {
    Transactions = <div>Fectching</div>;
  } else if (isSuccess) {
    Transactions = data.map((value, i) => (
      <Transaction
        key={i}
        category={value}
        handler={handlerClick}
      ></Transaction>
    ));
  } else if (isError) {
    Transactions = <div>isError</div>;
  }

  return (
    <div className="flex flex-col py-6 gap-3">
      <h1 className="py-4 front-bold text-xl">History</h1>
      {Transactions}
    </div>
  );
};

function Transaction({ category, handler }) {
  if (!category) return null;
  console.log(category);
  return (
    <div
      className="item flex justify-center bg-gray-50 py-2 rounded-r"
      style={{ borderRight: `8px solid ${category.color ?? "#e5e5e5"}` }}
    >
      <button className="px-3" onClick={handler}>
        <IoTrashOutline
          data-id={category._id}
          style={{ color: `${category.color ?? "#e5e5e5"}` }}
          className="bi bi-trash"
        />
      </button>

      <span className="block w-full">{category.name ?? ""}</span>
    </div>
  );
}
