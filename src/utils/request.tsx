import useSwr from "swr";

export const request = (key: string) => {
  const data = useSwr(
    key,
    (...args) => fetch(...args).then((data) => data.json()),
    { revalidateOnFocus: false }
  );

  return data;
};
