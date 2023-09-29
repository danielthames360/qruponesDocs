---
id: get-brands
title: Obtener Marcas
sidebar_label: Obtener Marcas
sidebar_position: 1
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

<Highlight color="#61b0fd">GET</Highlight> https://backend.qrupones.com/brand

## Seguridad

Esta api utiliza clientSecret, user y password como método de autenticación.

- Name: <Highlight color="#f77170">X-QRAPI-SECRET</Highlight>
- Name: <Highlight color="#f77170">X-QRAPI-USER</Highlight>
- Name: <Highlight color="#f77170">X-QRAPI-PASS</Highlight>
- In: headers

Consulta cómo obtener las [Credenciales](/docs/intro#cómo-me-integro-con-qrupones)

## Parámetros de solicitud

No parameters

## Respuesta

| Code | Description                 |
| ---- | --------------------------- |
| 200  | Retorna una lista de Marcas |
| 401  | Unauthorized                |

## Uso 📝

<Tabs>
  <TabItem value="js" label="Javascript" default>

```jsx title="get-brands.js"
var headers = new Headers()
headers.append('X-QRAPI-SECRET', 'yourClientSecret')
headers.append('X-QRAPI-USER', 'yourUser')
headers.append('X-QRAPI-PASS', 'yourPassword')

var requestOptions = {
  method: 'GET',
  headers: headers,
  redirect: 'follow'
}

fetch('https://backend.qrupones.com/brand', requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log('error', error))
```

  </TabItem>

  <TabItem value="csharp" label="C#">

```csharp title="get-brands.cs"
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        var headers = new()
        {
            { "X-QRAPI-SECRET", "yourClientSecret" },
            { "X-QRAPI-USER", "yourUser" },
            { "X-QRAPI-PASS", "yourPassword" }
        };

        using var client = new HttpClient();

        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        client.DefaultRequestHeaders.Add("X-QRAPI-SECRET", "yourClientSecret");
        client.DefaultRequestHeaders.Add("X-QRAPI-USER", "yourUser");
        client.DefaultRequestHeaders.Add("X-QRAPI-PASS", "yourPassword");

        try
        {
            var response = await client.GetAsync("https://backend.qrupones.com/brand");
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

```php title="get-brands.php"
<?php
$headers = [
    'X-QRAPI-SECRET: yourClientSecret',
    'X-QRAPI-USER: yourUser',
    'X-QRAPI-PASS: yourPassword'
];

$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => 'https://backend.qrupones.com/brand',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => $headers,
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

```java title="get-brands.java"
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        String urlString = "https://backend.qrupones.com/brand";
        try {
            URL url = new URL(urlString);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("X-QRAPI-SECRET", "yourClientSecret");
            connection.setRequestProperty("X-QRAPI-USER", "yourUser");
            connection.setRequestProperty("X-QRAPI-PASS", "yourPassword");

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
```

</TabItem>

<TabItem value="python" label="Python">

```python title="get-brands.py"
import requests

headers = {
    'X-QRAPI-SECRET': 'yourClientSecret',
    'X-QRAPI-USER': 'yourUser',
    'X-QRAPI-PASS': 'yourPassword'
}

url = 'https://backend.qrupones.com/brand'

try:
    response = requests.get(url, headers=headers)
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
    "data": [
        {
            "MarcaID": 84182,
            "Nombre": "Marca 1"
        },
        {
            "MarcaID": 44712,
            "Nombre": "Marca 2"
        },
        ...
    ]
}
```

## Respuesta exitosa - sin resultados ℹ️

```json
{
    "data": "No hay resultados"
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
