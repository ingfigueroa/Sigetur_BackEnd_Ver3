
export const getValorOficialDolar = async (req, res) => {
  try {

   

    const response = await fetch(
      "https://dolarapi.com/v1/dolares/oficial"
    );

    const data = await response.json();

  
 
    return res.json(data);

  } catch (error) {

    console.error(
      "Error al obtener dólar oficial:",
      error
    );

    return res.status(500).json({
      message: "Error en el servidor"
    });
  }
};
