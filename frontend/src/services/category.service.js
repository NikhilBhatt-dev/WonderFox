export const getCategories = async () => {
  const res = await fetch("http://localhost:5000/api/categories", {
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);

  const json = await res.json();
  return json?.data?.categories || [];
};

export default { getCategories };
