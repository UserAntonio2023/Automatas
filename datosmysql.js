const fs = require('fs');

fs.readFile('database.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    var cadena_split = data.split('\n');
    const top = cadena_split[0].split(',');
    const logData = []; // Para almacenar los datos del registro

    for (let i = 1; i < cadena_split.length - 1; i++) {
        var query = cadena_split[i].split(",");

        // Validaciones
        if (top.length !== query.length || query.length === 0) {
            console.log("Datos incorrectos o incompletos en el renglón " + i);
            logData.push("Datos incorrectos o incompletos en el renglón " + i + ": " + cadena_split[i]);
            continue;
        }

        // Validar tipos de datos (puedes agregar más validaciones según tus necesidades)
        const matriculaRegex = /^\d+$/; // Solo números para matrícula
        const edadRegex = /^\d+$/; // Solo números para edad
        const promedioRegex = /^\d+$/; // Solo números para promedio
        const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Formato de correo electrónico
        const alfaRegex = /^[A-Za-z]+$/; // Solo caracteres alfabéticos

        if (!matriculaRegex.test(query[1]) || !edadRegex.test(query[5]) || !promedioRegex.test(query[4]) || !correoRegex.test(query[6]) || !alfaRegex.test(query[0]) || !alfaRegex.test(query[2]) || !alfaRegex.test(query[3])) {
            console.log("Tipos de datos incorrectos en el renglón " + i);
            logData.push("Tipos de datos incorrectos en el renglón " + i + ": " + cadena_split[i]);
        }
    }

    // Crear archivo de registro
    if (logData.length > 0) {
        fs.writeFile('log.txt', logData.join('\n'), 'utf8', (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Archivo de registro (log.txt) creado con éxito.');
            }
        });
    }
});
