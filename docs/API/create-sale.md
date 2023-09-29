---
id: create-sale
title: Crear una venta
sidebar_label: Crear ventas
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export const Highlight = ({children, color}) => (
<span
style={{
      backgroundColor: color,
      borderRadius: '2px',
      color: '#fff',
      padding: '0.2rem',
    }}>
{children}
</span>
);

<Highlight color="#49cc90">POST</Highlight> https://backend.qrupones.com/sale

## Seguridad

Esta api utiliza clientSecret, user y password como método de autenticación.

- Name: <Highlight color="#f77170">X-QRAPI-SECRET</Highlight>
- Name: <Highlight color="#f77170">X-QRAPI-USER</Highlight>
- Name: <Highlight color="#f77170">X-QRAPI-PASS</Highlight>
- In: headers

Consulta cómo obtener las [Credenciales](/docs/intro#cómo-me-integro-con-qrupones)

## Parámetros de solicitud

| Nombre          | Descripción                                                                                                                   | Requerido                                        | Tipo    |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ------- |
| esRecompra      | Indica si es compra o recompra/canje                                                                                          | <Highlight color="#f77170">Requerido</Highlight> | boolean |
| Monto           | Monto                                                                                                                         | <Highlight color="#f77170">Requerido</Highlight> | number  |
| SucursalVentaID | ID de Sucursal de Venta                                                                                                       | <Highlight color="#f77170">Requerido</Highlight> | number  |
| CodigoPais      | Código de País. <b>Ejemplo: 591 para Bolivia </b>                                                                             | <Highlight color="#f77170">Requerido</Highlight> | number  |
| Marcas          | Cadena de texto con 0, una o mas marcas separadas por coma. revisa los ejemplos de solicitud para mas detalles                | <Highlight color="#f77170">Requerido</Highlight> | string  |
| CuponOrigenID   | ID de Cupón de Origen. <b>Este campo es opcional cuando es venta normal pero es requerido cuando existe un canje de cupón</b> | <Highlight color="#fca131">Atención</Highlight>  | number  |
| Celular         | Número de Teléfono                                                                                                            | <Highlight color="#61b0fd">Opcional</Highlight>  | string  |
| ClienteNombre   | Nombre del Cliente                                                                                                            | <Highlight color="#61b0fd">Opcional</Highlight>  | string  |
| Nit             | Número de Identificación Tributaria                                                                                           | <Highlight color="#61b0fd">Opcional</Highlight>  | string  |

### Ejemplo de solicitud sin marcas, ni datos de cliente

```json
{
  "esRecompra": true,
  "Monto": 120,
  "SucursalVentaID": 10,
  "CodigoPais": 591,
  "Marcas": ""
}
```

### Ejemplo de solicitud con una marca + canje de cupón

```json
{
  "esRecompra": true,
  "Monto": 120,
  "SucursalVentaID": 10,
  "CodigoPais": 591,
  "CuponOrigenID": 1000,
  "Marcas": "45",
  "Celular": "7777777",
  "ClienteNombre": "Pepe QUintana",
  "Nit": "5849941"
}
```

### Ejemplo de solicitud con multiples marcas

```json
{
  "esRecompra": true,
  "Monto": 120,
  "SucursalVentaID": 10,
  "CodigoPais": 591,
  "Marcas": "82,12,10",
  "Celular": "7777777",
  "ClienteNombre": "Pepe QUintana",
  "Nit": "5849941"
}
```

## Respuesta

| Code | Description                                  |
| ---- | -------------------------------------------- |
| 200  | Retorna los datos de la venta                |
| 400  | Retorna los posibles errores de la solicitud |
| 401  | Unauthorized                                 |

## Uso 📝

<Tabs>

  <TabItem value="js" label="Javascript" default>

```jsx title="create-sale.js"
const headers = new Headers()
headers.append('X-QRAPI-SECRET', 'yourClientSecret')
headers.append('X-QRAPI-USER', 'yourUser')
headers.append('X-QRAPI-PASS', 'yourPassword')

const requestOptions = {
  method: 'POST',
  headers: headers,
  body: JSON.stringify({
    esRecompra: true,
    Monto: 100.0,
    SucursalVentaID: 123,
    CodigoPais: 591,
    Marcas: 'Marca1,Marca2',
    CuponOrigenID: 456,
    Celular: '1234567890',
    ClienteNombre: 'Nombre del Cliente',
    Nit: 'NIT123456789'
  }),
  redirect: 'follow'
}

fetch('https://backend.qrupones.com/sale', requestOptions)
  .then((response) => response.json())
  .then((result) => console.log(result))
  .catch((error) => console.error('error', error))
```

</TabItem>

<TabItem value="csharp" label="C#">

```csharp title="create-sale.cs"
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        var headers = new()
        {
            { "X-QRAPI-SECRET", "yourClientSecret" },
            { "X-QRAPI-USER", "yourUser" },
            { "X-QRAPI-PASS", "yourPassword" },
        };

        var data = new
        {
            esRecompra = true,
            Monto = 100.0,
            SucursalVentaID = 123,
            CodigoPais = 591,
            Marcas = "Marca1,Marca2",
            CuponOrigenID = 456,
            Celular = "1234567890",
            ClienteNombre = "Nombre del Cliente",
            Nit = "NIT123456789",
        };

        using var client = new HttpClient();
        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        client.DefaultRequestHeaders.Add("X-QRAPI-SECRET", "yourClientSecret");
        client.DefaultRequestHeaders.Add("X-QRAPI-USER", "yourUser");
        client.DefaultRequestHeaders.Add("X-QRAPI-PASS", "yourPassword");

        try
        {
            var response = await client.PostAsync("https://backend.qrupones.com/sale", new StringContent(
                System.Text.Json.JsonSerializer.Serialize(data),
                Encoding.UTF8, "application/json"));
            response.EnsureSuccessStatusCode();
            var responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine(responseBody);
        }
        catch (HttpRequestException e)
        {
            Console.WriteLine($"Request error: {e.Message}");
        }
    }
}
```

</TabItem>
<TabItem value="php" label="PHP">

```php title="create-sale.php"
<?php
$headers = [
    'X-QRAPI-SECRET: yourClientSecret',
    'X-QRAPI-USER: yourUser',
    'X-QRAPI-PASS: yourPassword',
    'Content-Type: application/json',
];

$data = [
    'esRecompra' => true,
    'Monto' => 100.0,
    'SucursalVentaID' => 123,
    'CodigoPais' => 591,
    'Marcas' => 'Marca1,Marca2',
    'CuponOrigenID' => 456,
    'Celular' => '1234567890',
    'ClienteNombre' => 'Nombre del Cliente',
    'Nit' => 'NIT123456789',
];

$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => 'https://backend.qrupones.com/sale',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => $headers,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($data),
]);

$response = curl_exec($curl);
if ($response === false) {
    echo 'Curl error: ' . curl_error($curl);
} else {
    echo $response;
}

curl_close($curl);
?>
```

</TabItem>

<TabItem value="java" label="Java">

```java title="create-sale.java"
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.io.OutputStream;
import java.util.Scanner;
import com.google.gson.Gson;

public class Main {
    public static void main(String[] args) {
        String urlString = "https://backend.qrupones.com/sale";
        try {
            URL url = new URL(urlString);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("X-QRAPI-SECRET", "yourClientSecret");
            connection.setRequestProperty("X-QRAPI-USER", "yourUser");
            connection.setRequestProperty("X-QRAPI-PASS", "yourPassword");
            connection.setRequestProperty("Content-Type", "application/json");

            connection.setDoOutput(true);
            OutputStream os = connection.getOutputStream();
            Gson gson = new Gson();
            String requestBody = gson.toJson(new SolicitudRequest(
                true,
                100.0,
                123,
                591,
                "Marca1,Marca2",
                456,
                "1234567890",
                "Nombre del Cliente",
                "NIT123456789"
            ));
            os.write(requestBody.getBytes());
            os.flush();
            os.close();

            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                Scanner scanner = new Scanner(connection.getInputStream());
                StringBuilder response = new StringBuilder();
                while (scanner.hasNextLine()) {
                    response.append(scanner.nextLine());
                }
                scanner.close();
                System.out.println(response.toString());
            } else {
                System.out.println("HTTP Request Error: " + responseCode);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

class SolicitudRequest {
    boolean esRecompra;
    double Monto;
    int SucursalVentaID;
    int CodigoPais;
    String Marcas;
    int CuponOrigenID;
    String Celular;
    String ClienteNombre;
    String Nit;

    public SolicitudRequest(
        boolean esRecompra,
        double Monto,
        int SucursalVentaID,
        int CodigoPais,
        String Marcas,
        int CuponOrigenID,
        String Celular,
        String ClienteNombre,
        String Nit
    ) {
        this.esRecompra = esRecompra;
        this.Monto = Monto;
        this.SucursalVentaID = SucursalVentaID;
        this.CodigoPais = CodigoPais;
        this.Marcas = Marcas;
        this.CuponOrigenID = CuponOrigenID;
        this.Celular = Celular;
        this.ClienteNombre = ClienteNombre;
        this.Nit = Nit;
    }
}
```

</TabItem>

<TabItem value="python" label="Python">

```python title="create-sale.py"
import requests

headers = {
    'X-QRAPI-SECRET': 'yourClientSecret',
    'X-QRAPI-USER': 'yourUser',
    'X-QRAPI-PASS': 'yourPassword',
    'Content-Type': 'application/json',
}

data = {
    'esRecompra': True,
    'Monto': 100.0,
    'SucursalVentaID': 123,
    'CodigoPais': 591,
    'Marcas': 'Marca1,Marca2',
    'CuponOrigenID': 456,
    'Celular': '1234567890',
    'ClienteNombre': 'Nombre del Cliente',
    'Nit': 'NIT123456789',
}

url = 'https://backend.qrupones.com/sale'

try:
    response = requests.post(url, headers=headers, json=data)
    response.raise_for_status()
    print(response.text)
except requests.exceptions.RequestException as e:
    print(f'Request error: {e}')
```

</TabItem>

</Tabs>

## Respuesta exitosa ✅

```json
{
  "data": {
    "Celular": "Número de Celular",
    "ClienteNombre": "Nombre del Cliente",
    "esRecompra": true,
    "Monto": 100,
    "SucursalVentaID": 5,
    "Marcas": "Marca1, Marca2",
    "CuponOrigenID": 2000,
    "CodigoPais": 123,
    "Nit": "Número de Identificación"
  }
}
```

## Respuesta con error 📛

```json
{
  "errors": [
    {
      "type": "field",
      "msg": "esRecompra debe ser true o false",
      "path": "esRecompra",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "Monto es obligatorio y debe ser un numero",
      "path": "Monto",
      "location": "body"
    },
    ...
  ]
}
```

## Respuesta error de seguridad ⚠️

```json
{
  "errors": [
    {
      "msg": "No existen los parametros de seguridad en la solicitud"
    }
  ]
}
```
