let boton=document.getElementById('agregar');
let guardar=document.getElementById('guardar');
let lista=document.getElementById('lista');
let data=[];
let cant=0;
boton.addEventListener("click",agregar);
guardar.addEventListener("click",save);
function agregar (){
    let nombre=document.getElementById('nombre').value;
    let precio=parseFloat(document.getElementById('precio').value);
    let cantidad=parseFloat(document.getElementById('cantidad').value);
    let total=precio*cantidad;
    //agregar elemento al arreglo

    
    data.push(
        {
            "id":cant,
            "nombre":nombre,
            "precio":precio,
            "cantidad":cantidad,
            "total":total
        }
    );
    let id_row='row'+cant;
    let fila='<tr id='+id_row+'><td>'+nombre+'</td><td>'+precio+'</td><td>'+cantidad+'</td><td>'+total+'</td><td><a href="#" class="btn btn-danger" onclick="eliminar('+cant+')";>Eliminar</a><a href="#" class="btn btn-success" onclick="cantidad('+cant+')";>Cantidad/TN<a/></td></tr';



    //agregar tabla
    $("#lista").append(fila);
    $("#nombre").val('');
    $("#precio").val('');
    $("#cantidad").val('');
    $("nombre").focus();
    cant++;
    sumar();
}
function save(){ 
 let json=JSON.stringify(data);
 $.ajax({
    type:"POST",
    utl:"api.php",
    data:"json="+json,
    success:function(resp){
        console.log(resp);
       location.reload();
    }
 });
} 
function sumar(){
    let tot=0;
    for (x of data){
        tot=tot+x.total;
    }
    document.getElementById('total').innerHTML="Total "+tot;
}
function eliminar(row){
    //remover la fila de la tabla
    $("#row"+row).remove();
    let i=0;
    let pos=0;
    for (x of data){
        if (x.id==row){
            pos=i;
        }
        i++;
    }
    data.splice(pos,1);
    sumar();
}
function cantidad(row){
    let canti=parseFloat(prompt("Nueva cantidad"));
    data[row].cantidad=canti;
    data[row].total=data[row].cantidad*data[row].precio;
    let filaid=document.getElementById("row"+row);
    celda=filaid.getElementsByTagName('td');
    celda[2].innerHTML=canti;
    celda[3].innerHTML=data [row].total;
    sumar();
}