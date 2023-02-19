import { MutatorOptions } from "swr";

export const deleteMutate = async (id: number, data: any[]) => {
  await fetch(`http://localhost:3000/api/todo/${id}`, {
    method: "delete",
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error("Username required");
    }
  });

  return data.filter((deletedItem: any) => deletedItem.id !== id);
};

export const deleteOptionMutate = (data: readonly any[], id: number) => {
  const tempData = [...data].map((item) => {
    return { ...item, isLoading: item.id === id };
  });

  return {
    optimisticData: tempData,
    revalidate: false,
    populateCache: true,
    rollbackOnError: true,
  };
};

export const addMutate = async (newTodo: any, data: any[]) => {
  await fetch(`http://localhost:3000/api/todo`, {
    method: "post",
    body: JSON.stringify(newTodo),
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error("Username required");
    }
  });

  return [...data, newTodo];
};

export const addOptionMutate = (data: any[], newTodo: any): MutatorOptions => {
  return {
    optimisticData: [...data, newTodo],
    revalidate: false,
    rollbackOnError: true,
    populateCache: true,
  };
};
