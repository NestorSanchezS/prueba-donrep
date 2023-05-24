#!/bin/bash

action=$1


build_img() {
    version=$1
    [ -z "$version" ] && version=0.1 && echo "\nset defaul version 0.1\n"

    docker build --no-cache -t nestorsanchezz/prueba-donrep:$version .

    docker tag nestorsanchezz/prueba-donrep:$version nestorsanchezz/prueba-donrep:latest
}


push_img() {
    version=$1
    docker push nestorsanchezz/prueba-donrep:$version
    docker push nestorsanchezz/prueba-donrep:latest
}


if [ "$action" = "start" ]; then

    [ ! -f acme.json ] && touch acme.json && chmod 600 acme.json && log "create acme.json for tls certificates"
    [ ! -f traefik.log ] && touch traefik.log && log "create traefik.log for error logs"

    echo "--launch projects"
    docker compose up -d 

    echo "--finish start"


elif [ "$action" = "build" ]; then
    build_img "$2"

elif [ "$action" = "publish" ]; then
    build_img "$2"
    push_img "$2"

elif [ "$action" = "push-img" ]; then
    push_img "$2"

elif [ "$action" = "reload" ]; then
    docker compose pull prueba-donrep
    docker compose up --force-recreate --no-deps -d 
    docker image prune -f

elif [ "$action" = "deploy" ]; then


  ssh -o StrictHostKeyChecking=no \
      -i ./server-key.pem ubuntu@sancheznestor.com \
      "cd /home/ubuntu/prueba-donrep && make reload"

fi
