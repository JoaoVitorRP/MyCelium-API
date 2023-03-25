import dotenv from "dotenv";

export function loadEnv() {
  let path = ".env.development";

  if (process.env.NODE_ENV === "test") {
    path = ".env.test";
  }

  dotenv.config({ path });
}
