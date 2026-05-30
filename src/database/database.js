import * as SQLITE from 'expo-sqlite';

const db = SQLITE.openDatabaseSync('budgie.db');

export const initDatabase =() => {
    db.execSync(`
        CREATE TABLE IF NOT EXISTS gastos (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         descricao TEXT NOT NULL,
         categoria TEXT NOT NULL,
         valor REAL NOT NULL,
         data TEXT NOT NULL
    );
    `);
};

export const inserirGasto = (gasto) => {
    db.runSync(
        'INSERT INTO gastos (descricao, categoria, valor, data) VALUES (?,?,?,?)',
        [gasto.descricao, gasto.categoria, gasto.valor, gasto.data]
    );
};

export const listarGastos =() => {
    return db.getAllSync ('SELECT * FROM gastos ORDER BY id DESC')
};

export default db; 