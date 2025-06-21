import Api from "@/services/frontql/Api";

const endpoint = "/favorites";

export async function getFavorites({ search, fields }: { fields?: string; search?: string } = {}) {
  const res = await Api.get(endpoint, {
    search,
    fields,
  });

  return res;
}

export async function saveFavorites({ session, recipeId }: { session: string; recipeId: string }) {
  const res = await Api.post(endpoint, {
    body: {
      recipe: recipeId,
    },
    session,
    filter: "user:{id}",
  });

  return res;
}

export async function deleteFavorites(recipeId: string) {
  const res = await Api.delete(`${endpoint}/${recipeId}`);

  return res;
}
