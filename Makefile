build:
	sh scripts.sh build

publish:
	sh scripts.sh publish

push-img:
	sh scripts.sh push-img

deploy:
	sh scripts.sh deploy

dowm:
	docker compose down

start:
	sh scripts.sh start