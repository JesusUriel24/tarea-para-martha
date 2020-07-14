const formularioContactos = document.querySelector('#contacto');
listContactos = document.querySelector('#listado-contactos tbody');

eventListeners();

function eventListeners() {
    //Cuando el formulario de crear o editar se ejecuta//
    formularioContactos.addEventListener('submit', leerFormulario);
}

function leerFormulario(e) {
    e.preventDefault();

    //Leer los datos de los inputs//
    const nombre = document.querySelector('#nombre').value,
          empresa = document.querySelector('#empresa').value,
          telefono = document.querySelector('#telefono').value;
          accion = document.querySelector('#accion').value;
    
    if (nombre === '' || empresa === '' || telefono ==='') {
        console.log('Los campos estan vacios');
    } else {
        const infoContacto = new FormData();
        infoContacto.append('nombre', nombre);
        infoContacto.append('empresa', empresa);
        infoContacto.append('telefono', telefono);
        infoContacto.append('accion', accion);

        console.log(...infoContacto);

        if(accion === 'crear'){

            insertarBD(infoContacto);

        } else {

        }
    }
}
/**inserta en la base de datos via Ajax */
function insertarBD(datos){
    //lamado ajax

    //crear el objeto
const xhr = new XMLHttpRequest();
    //abrir la conexion
xhr.open('POST', 'inc/modelos/modelo-contacto.php', true);
    //pasar los datos
xhr.onload = function() {
    if(this.status === 200){
        console.log(JSON.parse(xhr.responseText) );
        //repuesta de php

        const respuesta = JSON.parse(xhr.responseText) ;

        const nuevoContacto = document.createElement('tr');

        nuevoContacto.innerHTML =`
        <td>${respuesta.datos.nombre}</td>
        <td>${respuesta.datos.empresa}</td>
        <td>${respuesta.datos.telefono}</td> 
        `;

        //contenedor de botones
        const contenedorAcciones = document.createElement('td');

        //create icono
        const iconoEditar = document.createElement('i');
        iconoEditar.classList.add('fas', 'fa-pen-square');

        const btnEditar = document.createElement('a');
        btnEditar.appendChild(iconoEditar);
        btnEditar.href =`editar.php?id=${respuesta.datos.id_insertado}`;
        btnEditar.classList.add('btn', 'btn-editar');

        //agregar a p
        contenedorAcciones.appendChild(btnEditar);

        //eliminar
        const iconoEliminar = document.createElement('i');
        iconoEliminar.classList.add('fas', 'fa-trash-alt');

        //boton eliminar

        const btnEliminar = document.createElement('button');
        btnEliminar.appendChild(iconoEliminar);
        btnEliminar.setAttribute('data-id', respuesta.datos.id_insertado);
        btnEliminar.classList.add('btn', 'btn-borrar');

        //agre p

        contenedorAcciones.appendChild(btnEliminar);

        //agragr tr
        nuevoContacto.appendChild(contenedorAcciones);

        //agregar contactos

        listContactos.appendChild('nuevoContacto');

        //reset

        document.querySelector('form').reset();
        //mostrar notoficacion

        mostarNotificacion('Contacto Creado Correctamente', 'correcto');


    }


}

    //enviar los datos
    xhr.send(datos)
}