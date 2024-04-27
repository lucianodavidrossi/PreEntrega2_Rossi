document.addEventListener('DOMContentLoaded', function () {
    let usuario = {};
  
    function obtenerDatosUsuario() {
      usuario.nombre_completo = prompt("Ingrese su nombre completo") || '';
      usuario.dni = parseInt(prompt("Ingrese su número de DNI")) || '';
      
      while (true) {
        usuario.edad = parseInt(prompt("Ingrese su edad"));
  
        if (usuario.edad >= 18) {
          break;
        } else {
          alert("Por favor ingrese una edad válida (mayor o igual a 18).");
        }
      }
  
      // Guardar datos del usuario en localStorage
      localStorage.setItem('usuario', JSON.stringify(usuario));
  
      // Imprimir datos del usuario en la consola del navegador
      console.log('Datos del usuario:', usuario);
    }
  
    function obtenerMotivoPrestamo() {
      usuario = JSON.parse(localStorage.getItem('usuario'));
      while (true) {
        usuario.motivo_prestamo = prompt("Ingrese la finalidad del préstamo (auto, moto, casa):");
  
        if (usuario.motivo_prestamo.toLowerCase() === "auto" || usuario.motivo_prestamo.toLowerCase() === "moto" || usuario.motivo_prestamo.toLowerCase() === "casa") {
          break;
        } else {
          alert("Por favor ingrese una finalidad válida (auto, moto, casa).");
        }
      }
  
      // Actualizar datos del usuario en localStorage
      localStorage.setItem('usuario', JSON.stringify(usuario));
    }
  
    function obtenerCantidadDinero() {
      usuario = JSON.parse(localStorage.getItem('usuario'));
      while (true) {
        usuario.cantidad_dinero = Number(prompt("Ingrese cantidad de dinero a solicitar"));
  
        if (usuario.motivo_prestamo.toLowerCase() === "auto" && usuario.cantidad_dinero > 20000000) {
          alert("El monto ingresado supera el préstamo máximo para auto. Por favor ingrese un monto válido.");
        } else if (usuario.motivo_prestamo.toLowerCase() === "moto" && usuario.cantidad_dinero > 8000000) {
          alert("El monto ingresado supera el préstamo máximo para moto. Por favor ingrese un monto válido.");
        } else if (usuario.motivo_prestamo.toLowerCase() === "casa" && usuario.cantidad_dinero > 70000000) {
          alert("El monto ingresado supera el préstamo máximo para casa. Por favor ingrese un monto válido.");
        } else if (usuario.cantidad_dinero <= 0) {
          alert("Por favor ingrese un monto válido mayor que cero.");
        } else {
          break;
        }
      }
  
      // Actualizar datos del usuario en localStorage
      localStorage.setItem('usuario', JSON.stringify(usuario));
    }
  
    function obtenerCantidadCuotas() {
      usuario = JSON.parse(localStorage.getItem('usuario'));
      usuario.cantidad_cuotas = Number(prompt("Ingrese cantidad de cuotas a abonar"));
  
      // Actualizar datos del usuario en localStorage
      localStorage.setItem('usuario', JSON.stringify(usuario));
    }
  
    function calcularPrestamo() {
      usuario = JSON.parse(localStorage.getItem('usuario'));
      let recargo_motivo;
  
      switch (usuario.motivo_prestamo.toLowerCase()) {
        case "auto":
          recargo_motivo = 0.5;
          break;
        case "moto":
          recargo_motivo = 0.4;
          break;
        case "casa":
          recargo_motivo = 0.9;
          break;
      }
  
      const iva = 1.21;
      return (usuario.cantidad_dinero * recargo_motivo) / (usuario.cantidad_cuotas * iva);
    }
  
    function mostrarResultado() {
      let cotizacion = calcularPrestamo();
      alert(`${usuario.nombre_completo}, por tu préstamo para comprar tu ${usuario.motivo_prestamo}, vas a abonar ${usuario.cantidad_cuotas} cuotas de $${cotizacion.toFixed(2)}`);
    }
  
    obtenerDatosUsuario();
    obtenerMotivoPrestamo();
    obtenerCantidadDinero();
    obtenerCantidadCuotas();
    mostrarResultado();
  });

  