export async function initializeDatabase(database) {
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            valor REAL NOT NULL,
            total REAL NOT NULL,
            category TEXT NOT NULL,
            checked INTEGER DEFAULT 0 NOT NULL
        )
    `);
}
