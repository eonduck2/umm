export default async () => {
  const response = await fetch("http://localhose:3001/getProduct");

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  return data;
};
