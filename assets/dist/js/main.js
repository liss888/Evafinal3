$(document).ready(function () {

    const Ventas = [];

    let arrayProductos = [{ //* Acá el arrayProductos Punto 2*//
            name: "Amonio cuaternario",
            id: 123456789,
            stock: 1502,
            precio: 3750
        },
        {
            name: "Cloro Gel",
            id: 987654321,
            stock: 1025,
            precio: 1350
        },
        {
            name: "Lisoform",
            id: 456123789,
            stock: 327,
            precio: 2590
        }
    ]

    let datos = {};

    let mapProductos = new Map()
    mapProductos.set(datos, arrayProductos)

    const tablaDeProductos = () => {
        let tablaProductos = ""
        for (let i = 0; i < mapProductos.get(datos).length; i++) {
            tablaProductos += `<tr>
            <th>${i+1}</th>
            <td>${mapProductos.get(datos)[i].name}</td>
            <td>${mapProductos.get(datos)[i].id}</td>
            <td>${mapProductos.get(datos)[i].stock}</td>
            <td>${mapProductos.get(datos)[i].precio}</td>
            </tr>`
        }
        $("#tablaProductos").html(tablaProductos)
    }

    tablaDeProductos();

    const resetform = () => {
        $("form").each(function () {
            this.selectedIndex = 0
        });
        $("form input[type=text] , form textarea").each(function () {
            this.value = ''
        });
    }

    $('table tbody').on('click', 'tr', function () {
        let name = $(this).children().eq(1).text()
        let productos = mapProductos.get(datos).find(function (elemento) {
            return elemento.name == name
        })
        if (Ventas.length > 0) {
            let sum = 0;
            let precio = 0;
            let i = 0;
            for (i = 0; i < Ventas.length; i++) {
                if (Ventas[i].productName == name) {
                    sum += Number(Ventas[i].Quantities)
                    precio += Number(Ventas[i].total)
                }
            }
            $("#counter").html(productos.stock);
            $("#totalVentas").html(precio)
        }
    })

    const restarStock = () => {
        let counter = $("#counter")
        let nombreProducto = $("#productName").val();
        let cantidadProducto = $("#Quantities").val();
        if (nombreProducto == "Amonio cuaternario") {
            mapProductos.get(datos)[0].stock = mapProductos.get(datos)[0].stock - Number(cantidadProducto);
            counter.html(mapProductos.get(datos)[0].stock)
        } else if (nombreProducto == "Cloro Gel") {
            mapProductos.get(datos)[1].stock = mapProductos.get(datos)[1].stock - Number(cantidadProducto);
            counter.html(mapProductos.get(datos)[1].stock)
        } else if (nombreProducto == "Lisoform") {
            mapProductos.get(datos)[2].stock = mapProductos.get(datos)[2].stock - Number(cantidadProducto);
            counter.html(mapProductos.get(datos)[2].stock)
        }

    }

    const addObjectArreglo = (addObjVenta) => {
        Ventas.push(addObjVenta);
    }

    class Venta { //* Acá la clase Venta Punto 2*//
        constructor(productName, userId, date, Quantities, costumerName, total) {
            this.productName = productName;
            this.userId = userId;
            this.date = date;
            this.Quantities = Quantities;
            this.costumerName = costumerName;
            this.total = total;
        }
    }

    let objectSale = new Map()
    objectSale.set(datos, Ventas) //*Acá el map para la tabla ventas Punto 3*//

    const crearVentas = () => {
        let productName = $("#productName").val();
        let userId = $("#userId").val();
        let date = $("#date").val();
        let Quantities = $("#Quantities").val();
        let costumerName = $("#costumerName").val();
        let nombreProducto = $("#productName").val();
        let cantidadProducto = $("#Quantities").val();
        let x = 0;
        if (nombreProducto == "Amonio cuaternario") {
            x = mapProductos.get(datos)[0].precio
        } else if (nombreProducto == "Cloro Gel") {
            x = mapProductos.get(datos)[1].precio
        } else if (nombreProducto == "Lisoform") {
            x = mapProductos.get(datos)[2].precio
        }
        let total = x * Number(cantidadProducto) * objGenerador.next().value
        let nuevaVenta = new Venta(productName, userId, date, Quantities, costumerName, total)
        addObjectArreglo(nuevaVenta)
    }

    const actualizarTablaVentas = () => {
        let tablaVentas = $("#tablaVentas");

        let imprimeVentas = "";

        for (let o = 0; o < Ventas.length; o++) {
            imprimeVentas += `<tr><td>${o+1}</td>
            <td>${Ventas[o].productName}</td>
            <td>${Ventas[o].Quantities}</td>
            <td>${Ventas[o].userId}</td>
            <td>${Ventas[o].total}</td></tr>`
        }
        tablaVentas.html(imprimeVentas);
    }

    const ActualizarStock = () => {
        let tablaProductos = ""
        for (let i = 0; i < mapProductos.get(datos).length; i++) {
            tablaProductos += `<tr>
            <th>${i+1}</th>
            <td>${mapProductos.get(datos)[i].name}</td>
            <td>${mapProductos.get(datos)[i].id}</td>
            <td>${mapProductos.get(datos)[i].stock}</td>
            <td>${mapProductos.get(datos)[i].precio}</td>
            </tr>`
        }
        $("#tablaProductos").html(tablaProductos)
    }

    let listaProductos = [
        "Amonio cuaternario",
        "Cloro Gel",
        "Lisoform"
    ];

    $("#productName").autocomplete({
        source: listaProductos
    });

    let ruts = [
        "17987523-4",
        "11555487-8",
        "13547812-3",
        "27546332-6",
        "6489750-8",
        "16554389-0",
    ];
    $("#userId").autocomplete({
        source: ruts
    });

    function* funcionDescuento() { //*Función generadora para aplicar descuento a la tercera venta *//
        let counter = 0
        while (counter < 2) {
            yield 1;
            counter++
        }
        if (counter == 2) {
            yield 0.9;
            counter++
        }
        while (counter > 2) {
            yield 1
            counter++
        }
    }

    let objGenerador = funcionDescuento()

    $("#btn").on('click', function () {
        funcionDescuento();
        crearVentas();
        actualizarTablaVentas();
        restarStock();
        ActualizarStock();
        resetform();

    });

    $.datepicker.regional['es'] = {
        closeText: 'Cerrar',
        prevText: '< Ant',
        nextText: 'Sig >',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
        weekHeader: 'Sm',
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };

    $.datepicker.setDefaults($.datepicker.regional['es']);

    $("#date").datepicker()

    function getUf() {
        return new Promise(function (resolve, reject) {
            let req = new XMLHttpRequest();
            req.open('GET', 'https://mindicador.cl/api/uf');

            req.onload = function () {
                if (req.status == 200) {
                    resolve(JSON.parse(req.response));
                } else {
                    reject();
                }
            };
            req.send();
        })
    }

    getUf().then(promUF => { //*Método CallBack para la promesa de la UF Punto 4*//
        $("#valorUF").append(promUF.serie[0].valor.toLocaleString("es-CL"))
    }).catch(() => {
        console.log('Algo salió mal');
    });

    function getDolar() {
        return new Promise(function (resolve, reject) {
            let req = new XMLHttpRequest();
            req.open('GET', 'https://mindicador.cl/api/dolar');

            req.onload = function () {
                if (req.status == 200) {
                    resolve(JSON.parse(req.response));
                } else {
                    reject();
                }
            };
            req.send();
        })
    }

    async function asyncFunction() { //*Método Async Await para Dólar*//
        let promDolar = await getDolar();
        $("#valorUF").append(" Dólar (Hoy): " + promDolar.serie[0].valor.toLocaleString("es-CL"))
    }
    asyncFunction()

});