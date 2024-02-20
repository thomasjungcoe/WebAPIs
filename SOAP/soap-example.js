// specify the URL of the SOAP API endpoint
const url = 'http://www.example.com/soap-api';

// specify the SOAP message to send
const soapMessage = '<?xml version="1.0" encoding="UTF-8"?>' +
                    '<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://example.com">' +
                    '<SOAP-ENV:Header/>' +
                    '<SOAP-ENV:Body>' +
                    '<ns1:GetData>' +
                    '<ns1:Id>123</ns1:Id>' +
                    '</ns1:GetData>' +
                    '</SOAP-ENV:Body>' +
                    '</SOAP-ENV:Envelope>';

// set the content type of the SOAP message
const contentType = 'text/xml';

// make the fetch request
fetch(url, {
    method: 'POST', // SOAP uses the HTTP POST method to send requests to a server
    headers: {
        'Content-Type': contentType,
        'SOAPaction': 'http://example.com/GetData' // specify the SOAP action to perform
    },
    body: soapMessage
})
.then(response => response.text())
.then(xml => {
    // handle the XML response
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'text/xml');
    const value = xmlDoc.getElementsByTagName('value')[0].childNodes[0].nodeValue;
    console.log(value);
})
.catch(error => console.error(error));