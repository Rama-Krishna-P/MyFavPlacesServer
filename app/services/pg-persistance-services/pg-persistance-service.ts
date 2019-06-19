import { QueryResult, Client } from "pg";

export abstract class PGPersistanceService {
    protected _connString: string;
    constructor(connString: string) {
        this._connString = connString;
    }

    protected executeQuery(queryText: string) : Promise<QueryResult> {
        return new Promise((res, rej) => {
            const client = new Client({
                connectionString: this._connString
            });

            client.connect();
            client.query(queryText, (err: Error, result: QueryResult) => {
                client.end();

                if (result) {
                    res(result);
                }
                else {
                    rej(err);
                }
            });
        });
    }
}