const schema = `
    CREATE TABLE IF NOT EXISTS rooms (
        room_id SERIAL PRIMARY KEY,
        owner_id INT,
        name VARCHAR(12) NOT NULL,
        note VARCHAR(100) NOT NULL,
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (owner_id) REFERENCES users(user_id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY, 
        room_id INT,
        name VARCHAR(12) DEFAULT 'user', 
        username VARCHAR(12) UNIQUE NOT NULL, 
        password_hash VARCHAR(255) NOT NULL,
        FOREIGN KEY (room_id) REFERENCES rooms(room_id) ON DELETE SET NULL
    );
    
    CREATE TABLE IF NOT EXISTS categories_transaction (
        category_id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS transactions (
        tran_id SERIAL PRIMARY KEY,
        price INT NOT NULL,
        note VARCHAR(255) DEFAULT '',
        time TIMESTAMP NOT NULL,
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        room_id INT,
        user_id INT,
        category_id INT,
        FOREIGN KEY (room_id) REFERENCES rooms(room_id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
        FOREIGN KEY (category_id) REFERENCES categories_transaction(category_id) ON DELETE SET NULL 
    );`;

export default schema;
