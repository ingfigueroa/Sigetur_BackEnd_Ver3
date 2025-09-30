import {getConnection} from '../database/connection.js'




export const getHoras = async (req, res) => {
    try {
     
       
      const pool = await getConnection();
      const request = pool.request();
      let result;
      
      result = await request.execute('sp_Buscar_Horas');
      return res.json(result.recordset);
      
    } catch (error) {
      console.error('Error en la ejecución del procedimiento almacenado:', error);
      return res.status(500).json({ message: 'Error en el servidor' }); // Enviar un mensaje de error al cliente
    }
  };



export const getHorasMananaTardeNoche = async (req, res) => {

  try {
     const pool = await getConnection();
      const request = pool.request();
      let result;
    result = await request.execute("sp_Buscar_Horas_Por_Turno");



    // 🔹 Tres resultados por separado
    const horariosNoche = result.recordsets[0];
    const horariosManiana = result.recordsets[1];
    const horariosTarde = result.recordsets[2];

    res.status(200).json({
      noche: horariosNoche,
      manana: horariosManiana,
      tarde: horariosTarde,
    });
  } catch (error) {
    console.error("Error al buscar horarios:", error);
    res.status(500).json({ error: "Error al buscar horarios" });
  }
};
