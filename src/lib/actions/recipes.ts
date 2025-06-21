import Api from "@/services/frontql/Api";

const endPoint = "/recipes";

export async function getRecipes({ search, page, sort = "-created_at", fields }: any = {}) {
  const res = await Api.get(endPoint, {
    search,
    page,
    sort,
    fields,
  });

  return res;
}

export async function saveRecipe(body: any, session: any) {
  const res = await Api.post(endPoint, {
    body: body,
    session: session,
    filter: "user:{id}",
  });

  return res;
}

export async function updateRecipe({ id, body, session }: { id: string; body: any; session: any }) {
  const res = await Api.put(`${endPoint}/${id}`, {
    body: body,
    session: session,
    filter: "user:{id}",
  });

  return res;
}

export async function deleteRecipe(id: any) {
  const res = await Api.put(`${endPoint}/${id}`, {
    body: { is_deleted: true },
  });

  return res;
}
