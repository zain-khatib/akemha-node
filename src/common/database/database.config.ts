import { Dialect } from "sequelize/types";

export const databaseConfig = {
    dialect: "postgres" as Dialect,
    host: "ec2-54-89-105-122.compute-1.amazonaws.com",
    port: 5432,
    username: "itbpsaggvorein",
    password: "6145d24d5da385c4c9e2fba9178a6e5ce89a04abd33ea2674bf5a03b87cf9df6",
    database: "d7aoi9q3raa9c6",
    define: {
        underscored: true,
    },
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
}
