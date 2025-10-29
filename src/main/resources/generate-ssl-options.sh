localhost_ssl_folder="./localhost-ssl"

if [ ! -f "$localhost_ssl_folder"/localhost.key ] || [ ! -f "$localhost_ssl_folder"/localhost.crt ]
then
  mkdir -p "$localhost_ssl_folder"

  openssl req \
    -nodes \
    -x509 \
    -newkey rsa:4096 \
    -keyout "$localhost_ssl_folder"/localhost.key \
    -out "$localhost_ssl_folder"/localhost.crt \
    -sha256 \
    -days 3650 \

fi
