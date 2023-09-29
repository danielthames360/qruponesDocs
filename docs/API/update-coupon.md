---
id: update-coupon
title: Actualizar el cupón
sidebar_label: Actualizar el cupón
sidebar_position: 4
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

<Highlight color="#fca131">PUT</Highlight> https://backend.qrupones.com/coupon/[CuponID]

## Seguridad

Esta api utiliza clientSecret, user y password como método de autenticación.

- Name: <Highlight color="#f77170">X-QRAPI-SECRET</Highlight>
- Name: <Highlight color="#f77170">X-QRAPI-USER</Highlight>
- Name: <Highlight color="#f77170">X-QRAPI-PASS</Highlight>
- In: headers

Consulta cómo obtener las [Credenciales](/docs/intro#cómo-me-integro-con-qrupones)

## Parámetros de solicitud

### Url

Concatena el ID del cupón previamente obtenido. Por ejemplo:

```json
https://backend.qrupones.com/coupon/1292
```

### Body

| Nombre          | Descripción                | Requerido                                        | Tipo   |
| --------------- | -------------------------- | ------------------------------------------------ | ------ |
| SucursalCanjeID | Envía el ID de la sucursal | <Highlight color="#f77170">Requerido</Highlight> | number |

### Ejemplo de solicitud

```json
{
  "SucursalCanjeID": 5
}
```

## Respuesta

| Code | Description                                  |
| ---- | -------------------------------------------- |
| 200  | Retorna los datos actualizados del cupón     |
| 400  | Retorna los posibles errores de la solicitud |
| 401  | Unauthorized                                 |

## Uso 📝

<Tabs>

 <TabItem value="js" label="Javascript" default>

```jsx title="canje-coupon.js"
const headers = new Headers()
headers.append('X-QRAPI-SECRET', 'yourClientSecret')
headers.append('X-QRAPI-USER', 'yourUser')
headers.append('X-QRAPI-PASS', 'yourPassword')

const CuponID = 1292 // Reemplaza con el ID del cupón que deseas canjear
const url = `https://backend.qrupones.com/coupon/${CuponID}`

const requestOptions = {
  method: 'PUT',
  headers: headers,
  body: JSON.stringify({
    SucursalCanjeID: 123
  }),
  redirect: 'follow'
}

fetch(url, requestOptions)
  .then((response) => response.json())
  .then((result) => console.log(result))
  .catch((error) => console.error('error', error))
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp title="canje-coupon.cs"
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

        var CuponID = 1292; // Reemplaza con el ID del cupón que deseas canjear
        var url = $"https://backend.qrupones.com/coupon/{CuponID}";

        var data = new
        {
            SucursalCanjeID = 123,
        };

        using var client = new HttpClient();
        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        client.DefaultRequestHeaders.Add("X-QRAPI-SECRET", "yourClientSecret");
        client.DefaultRequestHeaders.Add("X-QRAPI-USER", "yourUser");
        client.DefaultRequestHeaders.Add("X-QRAPI-PASS", "yourPassword");

        try
        {
            var response = await client.PutAsync(url, new StringContent(
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

```php title="canje-coupon.php"
<?php
$headers = [
    'X-QRAPI-SECRET: yourClientSecret',
    'X-QRAPI-USER: yourUser',
    'X-QRAPI-PASS: yourPassword',
    'Content-Type: application/json',
];

$CuponID = 1292; // Reemplaza con el ID del cupón que deseas canjear
$url = 'https://backend.qrupones.com/coupon/' . $CuponID;

$data = [
    'SucursalCanjeID' => 123,
];

$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => $headers,
    CURLOPT_CUSTOMREQUEST => 'PUT',
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

```java title="canje-coupon.java"
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.io.OutputStream;
import java.util.Scanner;
import com.google.gson.Gson;

public class Main {
    public static void main(String[] args) {
        int CuponID = 1292; // Reemplaza con el ID del cupón que deseas canjear
        String urlString = "https://backend.qrupones.com/coupon/" + CuponID;

        try {
            URL url = new URL(urlString);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("PUT");
            connection.setRequestProperty("X-QRAPI-SECRET", "yourClientSecret");
            connection.setRequestProperty("X-QRAPI-USER", "yourUser");
            connection.setRequestProperty("X-QRAPI-PASS", "yourPassword");
            connection.setRequestProperty("Content-Type", "application/json");

            connection.setDoOutput(true);
            OutputStream os = connection.getOutputStream();
            Gson gson = new Gson();
            String requestBody = gson.toJson(new SolicitudRequest(
                123
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
    int SucursalCanjeID;

    public SolicitudRequest(
        int SucursalCanjeID
    ) {
        this.SucursalCanjeID = SucursalCanjeID;
    }
}
```

</TabItem>
<TabItem value="python" label="Python">

```python title="canje-coupon.py"
import requests

headers = {
    'X-QRAPI-SECRET': 'yourClientSecret',
    'X-QRAPI-USER': 'yourUser',
    'X-QRAPI-PASS': 'yourPassword',
    'Content-Type': 'application/json',
}

CuponID = 1292 # Reemplaza con el ID del cupón que deseas canjear
url = f'https://backend.qrupones.com/coupon/{CuponID}'

data = {
    'SucursalCanjeID': 123,
}

try:
    response = requests.put(url, headers=headers, json=data)
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
    "CuponID": 1234,
    "CodigoQR": "WNDDJ",
    "EstadoQR": 1,
    "FechaCanje": "2023-12-31T18:04:34.139Z",
    "CantidadCanjes": 3,
    "CanjesMaximos": 5,
    "EstadoCupon": "Usado"
  }
}
```

## Respuesta con error 📛

```json
{
  "errors": [
    {
      "msg": "Ocurrio un error al actualizar el cupón, por favor revisa los identificadores e intenta nuevamente"
    }
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
