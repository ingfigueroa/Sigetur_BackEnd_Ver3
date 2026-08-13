import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const dbSetting = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  server: process.env.DB_SERVER,

  options: {
    instanceName: process.env.DB_INSTANCE,
    encrypt: false,
    trustServerCertificate: true,
  },

  requestTimeout: 300000,
};

let pool;

export const getConnection = async () => {
  try {
    if (pool) {
      if (pool.connected) {
        return pool;
      }

      if (!pool.connected) {
        pool = await sql.connect(dbSetting);
        return pool;
      }
    }

    pool = await sql.connect(dbSetting);
    return pool;
  } catch (error) {
    console.error("Error al conectar con SQL Server:", error);
    throw error;
  }
};

export { sql };