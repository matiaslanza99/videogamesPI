const validate = (input) =>{
    let error = {}
    if (input.name.trim().length === 0) {
      error.name = "Ingrese un nombre.";
    } else if (/\s/.test(input.name)) {
      error.name = "El nombre no debe contener espacios vacíos.";
    } 
  
    // Validación del campo "description"
    if (input.description.trim().length === 0) {
      error.description = "Ingrese una descripción.";
    } else if (input.description.length < 10) {
      error.description = "La descripción debe tener al menos 10 caracteres.";
    }
  
    // Validación del campo "image"
    if (input.image.trim().length === 0) {
      error.image = "Ingrese una URL de imagen.";
    } 
  
    // Validación del campo "rating"
    if (input.rating === null || input.rating < 0 || input.rating > 5) {
      error.rating = "Ingrese una calificación válida (entre 0 y 5).";
    }
  
    // Validación del campo "released"
    if (input.released.trim().length === 0) {
      error.released = "Ingrese una fecha de lanzamiento.";
    }
  
    // Validación del campo "platforms"
    if (input.platforms.trim().length === 0) {
      error.platforms = "Ingrese las plataformas.";
    } else if (/\s/.test(input.platforms)) {
      error.platforms = "Las plataformas no deben contener espacios vacíos.";
    }
  
    return error;
  }