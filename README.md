# Kafka Ecommerce

## Useful commands


### Produce

```bash
docker-compose exec kafka bash
/bin/kafka-console-producer --topic <TOPIC_NAME> --bootstrap-server localhost:9092
```

### Consumer

```bash
docker-compose exec kafka bash
/bin/kafka-console-consumer --topic <TOPIC_NAME> --from-beginning --bootstrap-server localhost:9092
```

### Create Topic

```bash
docker-compose exec kafka bash
/bin/kafka-topics --create --topic <TOPIC_NAME> --bootstrap-server localhost:9092
```