const hostname = Deno.env.get("DB_HOSTNAME");
const name = Deno.env.get("DB_NAME");
const password = Deno.env.get("DB_PASSWORD");
const protocol = Deno.env.get("DB_PROTOCOL");
const user = Deno.env.get("DB_USER");

export const url = `${protocol}//${user}:${password}@${hostname}/${name}`;
