# Generate local SSL certificates

## Requirements

-   OpenSSL

## Executions

Run the following command the generate a certificate and the private key

Ensure that the `ssl.conf` is in the same folder where `openssl` command is being used

```Node
openssl req -newkey rsa:4096 -nodes -keyout localhost-privkey.pem -x509 -days 3650 -out localhost-cert.pem -extensions req_ext -config ssl.conf -subj '/CN=localhost/O=Sadiqali/C=IN/L=Mumbai/OU=Sadiqali'
```

## Installation

### Mac

```Node
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain ./localhost-cert.pem
```

### Windows

Convert the `certificate.pem` to `.crt` format before installing the certificate

Use the following command

```Node
openssl x509 -outform der -in certificate.pem -out local.crt
```

Select `Manage User Certificates` or add the following in `run`

```Node
certmgr.msc
```

Select `Trusted Root Certification Authorities` and then select `Certificates`.

Right click `Certificates`, select `All Tasks` and then select `Import`

Import the `.crt` file and place it in `Trusted Root Certification Authorities`

### Notes

-   If your certificate is not trusted / generated wrongly, the browser will fail the service worker registration and also give you a insecure warning

-   As the compression of nextjs is turned off when using HTTP2 the performance score in audits will be low in development mode. The performance of the application can be properly seen in the production build
