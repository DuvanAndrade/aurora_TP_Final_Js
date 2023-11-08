async function obtenerProductos() {
    try {
        const response = await fetch("https://raw.githubusercontent.com/DuvanAndrade/aurora_TP_Final_Js/main/js/productos.json");
        if (!response.ok) {
            throw new Error(`Error al cargar el archivo JSON. Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ocurrió un error:', error);
    }
}


//BOTON ENVIAR EMAIL FOOTER 
const btnEmail = document.getElementById("emailForm");
btnEmail.addEventListener("submit", function(e) {
e.preventDefault();
    const email = document.getElementById("emailInput").value;
    const emailValido = validarEmail(email);

    if (!emailValido) {
        emailInvalido();
    } else {
       localStorage.setItem("user_email", email);
        envioEmail();
    } 
    btnEmail.reset();
    });
    

function validarEmail(email) {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return regex.test(email);
}

function envioEmail(){
    Toastify({
        text: "Email enviado con éxito.",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "var(--colorTitulo)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
}
function emailInvalido(){
    Toastify({
        text: "Por favor, ingresa un email valido.",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "var(--colorTitulo)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
}


//INDEX

const img = new Image();
img.onload = function() {
  const myDiv = document.getElementById('contenedor_imagen');
  myDiv.style.backgroundImage = `url(${img.src})`;
  myDiv.style.backgroundAttachment = 'fixed';
  myDiv.style.backgroundRepeat = "no-repeat";
  myDiv.style.backgroundSize = "cover";
  myDiv.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.100), rgba(0, 0, 0, 0.400)), url(${img.src})`;
};
img.src = 'assets/img/imgprincipal.jpg';


//PAG CONTACTO
/*FORMULARIO PAGINA CONTACTO */
document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formulario_contacto");
    formulario.addEventListener("submit", function (e) {
      e.preventDefault();
      const nombre = formulario.nombre.value;
      const apellido = formulario.apellido.value;
      const email = formulario.email.value;
      const mensaje = formulario.mensaje.value;
  
      if (nombre === "" || apellido === "" || email === "" || mensaje === "") {
        envioError();
        return;
      }
      envioExitoso()
      formulario.reset();
    });
  });


  function envioExitoso(){
    Toastify({
        text: "Formulario enviado con éxito.",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "var(--colorTitulo)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
  }
  function envioError(){
    Toastify({
        text: "Por favor, completa todos los campos.",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "var(--colorTitulo)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
  }


//NAVBAR
/*MODAL INICIO O REGISTRO DE CUENTA */
const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


//INICIO DE SECCION O REGISTRO DE UNA NUEVA CUENTA 
document.addEventListener("DOMContentLoaded", function() {
    const formularioInicio = document.getElementById("formInicio");
    const formularioRegistro = document.getElementById("formRegistro");

    // GUARDAR USUARIO EN EL LOCALST
    function guardarUsuario(usuario) {
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        usuarios.push(usuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    // VALIDO Y PROCESO EL INICIO DE SECCION
    function inicioSeccion(nombre, password) {
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const usuario = usuarios.find(usuario => usuario.nombre === nombre && usuario.password === password);
        return usuario;
    }

    // RESETEO DE CAMPOS Y ENVIO DE FORMULARIO
    formularioInicio.addEventListener("submit", function(e) {
        e.preventDefault();
        const nombreUsuario = document.getElementById("nombreUsuario").value;
        const passwordInicio = document.getElementById("passwordInicio").value;
        const usuario = inicioSeccion(nombreUsuario, passwordInicio);
        if (usuario) {
            Bienvenido(usuario.nombre);
        } else {
            msnErrorLogin();
        }
        formularioInicio.reset();
    });

    // RESETEO DE CAMPOS, ENVIO Y VALIDACION DE FORMULARIO DE REGISTRO
    formularioRegistro.addEventListener("submit", function(e) {
        e.preventDefault();
        const registroUsuario = document.getElementById("registroNombre").value;
        const registroPassword = document.getElementById("registroPassword").value;

        if (registroUsuario === "" || registroPassword === "") {
            msnErrorCampo();
        } else if (registroUsuario.length < 6 || registroPassword.length < 6) {
            msnAdvertencia();
        } else {
            const usuario = JSON.parse(localStorage.getItem("usuarios")) || [];
            if (usuario.some(usuario => usuario.nombre === registroUsuario)) {
                msnErrorResgistro();
            } else {
                const nuevoUsuario = {
                    nombre: registroUsuario,
                    password: registroPassword
                };
                guardarUsuario(nuevoUsuario);
                registroExitoso();
            }
        }

        formRegistro.reset();
    });
});

function Bienvenido(nombre){
    swal({
        title: "Bienvenido",
        text: `${nombre} 😊`,
        icon: "success",
      });
}
function msnErrorLogin(){
    swal({
        title: "Error 🙃",
        text: "Nombre o contraseña iconrrecta. Por favor, inténtalo de nuevo.",
        icon: "error",
      });
}
function msnErrorResgistro(){
    swal({
        title: "Error 🙃",
        text: "El usuario ya existe. Por favor, elige otro nombre de usuario.",
        icon: "error",
      });
}
function msnAdvertencia(){
    swal({
        title: "👁️",
        text: "El nombre de usuario y la contraseña deben tener al menos 6 caracteres.",
        icon: "warning",
      });
}
function msnErrorCampo(){
    swal({
        title: "🙏🏻",
        text: "Por favor, ingresa un nombre ó contraseña válida.",
        icon: "warning",
      });
}
function registroExitoso(){
    swal({
        title: "Bien Hecho",
        text: "Registro exitoso",
        icon: "success",
      });
}

// const catalogo = document.getElementById('box_productos');

// fetch('../js/productos.json')
//     .then(res=> res.json())
//     .then(data =>{
//         data.forEach(producto =>{
//            const div = document.createElement('div');
//            div.className = "producto"
//             //SE CREA UN DIV CON LOS ELEMNTOS DEL PRODCUTO A MOSTRAR
//             let img = document.createElement("img");
//             img.src = producto.imagen;
//             div.appendChild(img) 
//             let titulo =  document.createElement("h2")     
//             titulo.textContent = producto.titulo;    
//             div.appendChild(titulo);
//             let btns_agregar = document.createElement("button")
//             btns_agregar.className = "btn_agragar";
//             btns_agregar.textContent = "Agregar";
//             div.appendChild(btns_agregar);

//             catalogo.appendChild(div);

//         })
//     })

//NUESTROS PRODUCTOS
let btns_agregar = document.querySelectorAll('.agregar_producto');
const catalogo = document.querySelector('.box_productos');
const titulo = document.querySelector('.titulo_principal');

async function cargarProductos(categoria) {       
    catalogo.innerHTML = ''; // SE LIMPIA EL CONTENIDO DEL CARRITO

    try {
        productos = await obtenerProductos()
    } catch (error) {
        console.error('Error al iniciar la aplicación:', error);
    }

    productos.forEach(producto => {
        if (categoria === 'todos' || producto.categoria.nombre === categoria) {
            const div = document.createElement('div');
            
            titulo.innerHTML = "Nuestros Productos";
            //SE CREA UN DIV CON LOS ELEMNTOS DEL PRODCUTO A MOSTRAR
            div.innerHTML = `
            
            <article  id=${producto.id} class="box">
            <img src=${producto.imagen} alt="imagen sobre ${producto.titulo}">
            </article>
            <div class="descripcion_producto">
                <h2>${producto.titulo}</h2>
                <p><i>$${producto.precio}</i></p>
            </div>
            <div class="btn">
            <button class="agregar_producto" data-id=${producto.id} onclick = "agregarAlCarrito(${producto.id})"> <span>Agregar</span> </button>
            </div>
        
            `;
            catalogo.append(div);
        }
       
    });
}

document.getElementById('todos').addEventListener('click', () => cargarProductos('todos'));
document.getElementById('collares').addEventListener('click', () => cargarProductos('collares'));
document.getElementById('pulseras').addEventListener('click', () => cargarProductos('pulseras'));
document.getElementById('anillos').addEventListener('click', () => cargarProductos('anillos'));
document.getElementById('carteras').addEventListener('click', () => cargarProductos('carteras'));
document.getElementById('cinturones').addEventListener('click', () => cargarProductos('cinturones'));


cargarProductos('todos');

//INICIALIZACION EL CARRITO VACIO
const produCarrito = document.querySelector(".contenedor-carrito");
const productosEnCarrito = [];

function agregarAlCarrito(id){
    const productoAgregado = productos.find(producto => producto.id === id);
    productosEnCarrito.push(productoAgregado);
    localStorage.setItem('carrito', JSON.stringify(productosEnCarrito));
}



function mostrarProcductosCarrito(){

    JSON.parse(localStorage.getItem('carrito'));
    if(productosEnCarrito && productosEnCarrito.length > 0){
        productosEnCarrito.forEach((producto) =>{
            const div = document.createElement("div");
            div.innerHTML = `
            <article  id=${producto.id} class="box">
            <img src=${producto.imagen} alt="imagen sobre ${producto.titulo}">
            </article>
            <div class="descripcion_producto">
                <h2>${producto.titulo}</h2>
                <p><i>$${producto.precio}</i></p>
            </div>
            `;
            produCarrito.append(div);
        })
    }
}
mostrarProcductosCarrito()



// const imagen = document.querySelector('.imagen');
// const texto = document.querySelector(".texto");
// function irATienda(imagen) {
//     // Añade un texto de "Ir a la tienda" al elemento cuando el puntero del mouse entra en él
//     imagen.addEventListener("mouseenter", function() {
//     texto.textContent = "Ir a la tienda";
//     });
  
//     // Redirige a la página de la tienda cuando se hace clic en el elemento
//     imagen.addEventListener("click", function() {
//       window.location.href = "../pages/productos.html";
//     });
//   }



