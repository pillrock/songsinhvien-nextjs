const schema = `
    CREATE TABLE IF NOT EXISTS rooms (
        room_id SERIAL PRIMARY KEY,
        owner_id INT,
        name VARCHAR(12) NOT NULL,
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        FOREIGN KEY (owner_id) REFERENCES users(user_id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY, 
        room_id INT,
        name VARCHAR(12) DEFAULT 'user', 
        username VARCHAR(12) UNIQUE NOT NULL, 
        password_hash VARCHAR(255) NOT NULL,
        FOREIGN KEY (room_id) REFERENCES rooms(room_id) 
    );
        
    CREATE TABLE IF NOT EXISTS transactions (
        tran_id SERIAL PRIMARY KEY,
        room_id INT,
        user_id INT,
        price INT NOT NULL,
        note VARCHAR(255) DEFAULT '',
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (room_id) REFERENCES rooms(room_id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
    );`;

export default schema;
