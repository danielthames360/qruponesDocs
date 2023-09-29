---
id: check-coupon
title: Comprobar cupón
sidebar_label: Comprobar cupón
sidebar_position: 3
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

<Highlight color="#49cc90">POST</Highlight> https://backend.qrupones.com/coupon/checkCoupon

## Seguridad

Esta api utiliza clientSecret, user y password como método de autenticación.

- Name: <Highlight color="#f77170">X-QRAPI-SECRET</Highlight>
- Name: <Highlight color="#f77170">X-QRAPI-USER</Highlight>
- Name: <Highlight color="#f77170">X-QRAPI-PASS</Highlight>
- In: headers

Consulta cómo obtener las [Credenciales](/docs/intro#cómo-me-integro-con-qrupones)

## Parámetros de solicitud

| Nombre   | Descripción       | Requerido                                        | Tipo   |
| -------- | ----------------- | ------------------------------------------------ | ------ |
| code     | Código del cupón  | <Highlight color="#f77170">Requerido</Highlight> | string |
| branchId | ID de la Sucursal | <Highlight color="#f77170">Requerido</Highlight> | number |

### Ejemplo de solicitud

```json
{
  "code": "WNDDJ",
  "branchId": 81823
}
```

## Respuesta

| Code | Description                                  |
| ---- | -------------------------------------------- |
| 200  | Retorna todos los datos del cupón            |
| 400  | Retorna los posibles errores de la solicitud |
| 401  | Unauthorized                                 |

### Estados del cupon

:::info

Estos son los tipos de estados de cupones

:::

```javascript
export enum CouponStatesEnum {
  Vigente = 0,
  Usado = 1,
  Expirado = 2
}

export enum CouponStatesNames {
  Vigente = 'Vigente',
  Usado = 'Usado',
  Expirado = 'Expirado',
  Invalido = 'Invalido'
}

```

## Uso 📝

<Tabs>
 <TabItem value="js" label="Javascript" default>

```jsx title="check-coupon.js"
const headers = new Headers()
headers.append('X-QRAPI-SECRET', 'yourClientSecret')
headers.append('X-QRAPI-USER', 'yourUser')
headers.append('X-QRAPI-PASS', 'yourPassword')

const requestOptions = {
  method: 'POST',
  headers: headers,
  body: JSON.stringify({
    code: 'yourCouponCode',
    branchId: 123
  }),
  redirect: 'follow'
}

fetch('https://backend.qrupones.com/coupon/checkCoupon', requestOptions)
  .then((response) => response.json())
  .then((result) => console.log(result))
  .catch((error) => console.error('error', error))
```

</TabItem>

<TabItem value="csharp" label="C#">

```csharp title="check-coupon.cs"
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
            code = "yourCouponCode",
            branchId = 123,
        };

        using var client = new HttpClient();
        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        client.DefaultRequestHeaders.Add("X-QRAPI-SECRET", "yourClientSecret");
        client.DefaultRequestHeaders.Add("X-QRAPI-USER", "yourUser");
        client.DefaultRequestHeaders.Add("X-QRAPI-PASS", "yourPassword");

        try
        {
            var response = await client.PostAsync("https://backend.qrupones.com/coupon/checkCoupon", new StringContent(
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

```php title="check-coupon.php"
<?php
$headers = [
    'X-QRAPI-SECRET: yourClientSecret',
    'X-QRAPI-USER: yourUser',
    'X-QRAPI-PASS: yourPassword',
    'Content-Type: application/json',
];

$data = [
    'code' => 'yourCouponCode',
    'branchId' => 123,
];

$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => 'https://backend.qrupones.com/coupon/checkCoupon',
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

```java title="check-coupon.java"
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.io.OutputStream;
import java.util.Scanner;
import com.google.gson.Gson;

public class Main {
    public static void main(String[] args) {
        String urlString = "https://backend.qrupones.com/coupon/checkCoupon";
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
                "yourCouponCode",
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
    String code;
    int branchId;

    public SolicitudRequest(
        String code,
        int branchId
    ) {
        this.code = code;
        this.branchId = branchId;
    }
}
```

</TabItem>
<TabItem value="python" label="Python">

```python title="check-coupon.py"
import requests

headers = {
    'X-QRAPI-SECRET': 'yourClientSecret',
    'X-QRAPI-USER': 'yourUser',
    'X-QRAPI-PASS': 'yourPassword',
    'Content-Type': 'application/json',
}

data = {
    'code': 'yourCouponCode',
    'branchId': 123,
}

url = 'https://backend.qrupones.com/coupon/checkCoupon'

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
    "CuponID": 1234,
    "CodigoQR": "WNDDJ",
    "EstadoQR": 1,
    "CantidadCanjes": 0,
    "CanjesMaximos": 5,
    "FechaExpiracion": "2023-12-31T23:59:59.000Z",
    "CampanaID": 1,
    "MensajeCanje": "Campaña de Ejemplo",
    "ClienteNombre": "Cliente Genérico",
    "Celular": "123456789",
    "CodigoPais": 591,
    "Nit": "1234567",
    "EstadoCupon": "Usado"
  }
}
```

## Respuesta exitosa - Cupón no encontrado ℹ️

```json
{
  "data": "Cupón no encontrado o no válido para esta sucursal"
}
```

## Respuesta con error ⚠️

```json
{
  "errors": [
    {
      "msg": "No existen los parametros de seguridad en la solicitud"
    }
  ]
}
```
