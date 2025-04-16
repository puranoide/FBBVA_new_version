<?php

function createRegister($conexion, $data)
{

    // Agregar una fecha por defecto (por ejemplo, el primer día del mes actual)
    $year = date('Y');
    $month = $data['meses'];
    $day = '01';
    $data['fechaCreada'] = "$year-$month-$day";
    // Construir la consulta de forma dinámica
    $columns = implode(", ", array_keys($data));
    $placeholders = implode(", ", array_fill(0, count($data), "?"));
    $sql = "INSERT INTO registros ($columns) VALUES ($placeholders)";

    // Preparar la consulta
    $stmt = $conexion->prepare($sql);

    // Asignar los valores a los parámetros
    $values = array_values($data);
    $stmt->bind_param(str_repeat("s", count($values)), ...$values);

    // Ejecutar la consulta
    return $stmt->execute();
}

function listRegisters($conexion)
{
    $query = "SELECT * FROM registros order by fechaCreada ASC";
    $result = mysqli_query($conexion, $query);
    if (mysqli_num_rows($result) > 0) {
        $registros = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $registros[] = $row;
        }
        return $registros;
    } else {
        return [];
    }
}

// Verify if receiving POST request with JSON
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Set response header as JSON
    header('Content-Type: application/json');

    // Decode received JSON
    $data = json_decode(file_get_contents("php://input"), true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode(['error' => 'Invalid JSON']);
        exit;
    }

    // Validate received data    

    include_once('bd.php');
    switch ($data['action']) {
        case 'insert':
            if (!$conexion) {
                echo json_encode(['error' => 'No se pudo conectar a la base de datos']);
                exit;
            }

            // Resto del código...
            try {
                $response = createRegister($conexion, $data['data']);
                if ($response) {
                    echo json_encode(['success' => true, 'message' => 'insert exitoso']);
                } else {
                    echo json_encode(['error' => 'insert fallido']);
                }
            } catch (Exception $e) {
                echo json_encode(['error' => $e->getMessage()]);
            }
            break;
        case 'list':
            if (!$conexion) {
                echo json_encode(['error' => 'No se pudo conectar a la base de datos']);
                exit;
            }
            $response = listRegisters($conexion);
            if ($response) {
                echo json_encode(['success' => true, 'data' => $response]);
            } else {
                echo json_encode(['error' => 'list fallido']);
            }
            break;
        default:
            echo json_encode(['success' => false]);
            break;
    }
}
