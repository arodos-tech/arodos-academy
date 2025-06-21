import Api from "@/services/frontql/Api";

export const getSettingValue = async (name: string) => {
  const res = await Api.get("/settings", {
    search: `name:${name}`,
    fields: "value",
  });

  return res;
};
