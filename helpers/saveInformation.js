const pool = require("../config/database");

const saveInformationDatabase = async (data) => {
  try {
    // Begin transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    // Check if email already exists
    const [rows] = await connection.execute(
      "SELECT 1 FROM validador_correos WHERE correo = ?",
      [data.correo]
    );
    if (rows.length) {
      throw new Error("Email already exists");
    }

    // Insert data
    await connection.execute("INSERT INTO validador_correos SET ?", {
      lote: data.lote,
      correo: data.correo,
      estado: data.estado,
    });

    // Commit transaction
    await connection.commit();
    connection.release();

    return { message: "Data inserted successfully" };
  } catch (error) {
    // Rollback transaction
    // await connection.rollback();
    // connection.release();
    throw error;
  }
};

module.exports = { saveInformationDatabase };
