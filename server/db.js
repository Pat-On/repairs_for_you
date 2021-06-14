import { Pool } from "pg";

require('dotenv').config()

const dbUrl = process.env.DATABASE_URL || "postgres://localhost:5432/cyf_hotel";

console.log(process.env.USER_SQL)
let configObject = {
	user: process.env.USER_SQL,
	host: process.env.HOST_SQL,
	database: process.env.DATABASE_SQL,
	password: process.env.PASSWORD_SQL,
	port: process.env.PORT_SQL,
}
// modify object in production - HEROKU SOLUTION
if (process.env.DATABASE_URL) {
	configObject = {
		connectionString: dbUrl,
		connectionTimeoutMillis: 5000,
	}
}

export const pool = new Pool(configObject);

export const connectDb = async () => {
	let client;
	try {
		client = await pool.connect();
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
	console.log("Postgres connected to", client.database);
	client.release();
};

export const disconnectDb = () => pool.close();

// export default { query: pool.query };