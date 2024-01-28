mongodb:
	docker run -d -p 27017:27017 --name mongodb-container -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=adminpassword mongo


createnetwork:
	docker network create kafkaNetwork


zookeeper-in-network:
	docker run -d --network=kafkaNetwork --name zookeeper-container -p 2181:2181 wurstmeister/zookeeper


zookeeper:
	docker run -d \
      --name zookeeper-container \
      -p 2181:2181 \
      wurstmeister/zookeeper


kafka-in-network:
	docker run -d --network=kafkaNetwork --name kafka-container -p 9092:9092 \
      -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 \
      -e KAFKA_LISTENER_SECURITY_PROTOCOL_MAP=PLAINTEXT:PLAINTEXT \
      -e KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092 \
      -e KAFKA_INTER_BROKER_LISTENER_NAME=PLAINTEXT \
      -e KAFKA_ZOOKEEPER_CONNECT=zookeeper-container:2181 \
      wurstmeister/kafka


kafka:
	docker run -d \
      --name kafka-container \
      -p 9092:9092 \
      -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 \
      -e KAFKA_LISTENER_SECURITY_PROTOCOL_MAP=PLAINTEXT:PLAINTEXT \
      -e KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092 \
      -e KAFKA_INTER_BROKER_LISTENER_NAME=PLAINTEXT \
      -e KAFKA_ZOOKEEPER_CONNECT=zookeeper-container:2181 \
      wurstmeister/kafka


startdb:
	docker start mongodb-container

.PHONY: mongodb startdb createnetwork zookeeper-in-network zookeeper kafka kafka-in-network