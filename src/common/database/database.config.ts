import { Dialect } from "sequelize/types";

export const databaseConfig = {
    dialect: "postgres" as Dialect,
    host: "localhost",
    port: 5432,
    username: "akemha_user",
    password: "password",
    database: "akemha_dev",
    define: {
        underscored: true,
    }
}