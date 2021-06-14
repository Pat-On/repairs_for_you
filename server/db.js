import { Pool } from "pg";
//const dbUrl = process.env.DATABASE_URL || "postgres://localhost:5432/cyf";

const pool = new Pool({
	/* connectionString: dbUrl,
	connectionTimeoutMillis: 5000, */
	port:5432,
	user:"cyf",
	password:"CYFStudent123",
	database:"repairs_for_you",
	host:"localhost",
});

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

export default { query: pool.query };
