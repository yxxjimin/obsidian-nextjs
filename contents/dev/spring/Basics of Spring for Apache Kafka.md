---
date: 2025-03-23
lastmod: 2025-03-23 
tags: 
  - spring
  - kafka
---

## 토픽 생성
**(1) `KafkaAdmin`**

스프링에서 카프카 브로커에 토픽을 생성하려면 `KafkaAdmin` 빈을 등록해야 한다.[^1] 토픽은`NewTopic` 빈으로 생성할 수 있다. 스프링 부트에서는 `KafkaAdmin` 빈이 자동으로 등록되기 때문에 `NewTopic`만 등록해도 된다.

**(2) `TopicBuilder`**

빌더를 통해 생성할 토픽(`NewTopic`)의 파티션, 레플리카, 압축 타입 등을 설정할 수 있다. 

```java
@Configuration  
public class TopicConfig {  
  
    @Bean
    public NewTopic testTopic() {  
        return TopicBuilder.name("test-topic")  
                .partitions(3)  
                .replicas(1)  
                .compact()  
                .build();  
    }
}
```

브로커에 이미 존재하는 토픽의 파티션을 늘릴 수는 있지만 반대로 줄일 수는 없다.
```
o.springframework.kafka.core.KafkaAdmin  : Topic 'test-topic' exists but has a different partition count: 15 not 16, increasing if the broker supports it
```
```
o.springframework.kafka.core.KafkaAdmin  : Topic 'test-topic' exists but has a different partition count: 15 not 3
```

## 프로듀서
**(1) `KafkaTemplate<K, V>`**

프로듀서는 `KafkaTemplate` 객체를 통해 메세지를 전송한다.[^2]

```java
public class ProducerService {  
  
    private final KafkaTemplate<Integer, String> kafkaTemplate;  
  
    public void publish(Integer key, String msg) {  
        kafkaTemplate.send("test-topic", key, msg);
    }
}
```

**(2) `ProducerFactory<K, V>`**

`KafkaTemplate<K, V>`는 프로듀서 팩토리인 `ProducerFactory<K, V>` 빈을 통해 생성되며, 기본적으로 `DefaultKafkaProducerFactory`가 사용된다. 팩토리를 생성하는 과정에서 프로퍼티의 값을 불러온다.

(WIP)

## 컨슈머

(WIP)

[^1]: [“Configuring Topics :: Spring Kafka,” *Spring.io*.](https://docs.spring.io/spring-kafka/reference/kafka/configuring-topics.html)
[^2]: ["Sending Messages :: Spring Kafka," *Spring.io"*.](https://docs.spring.io/spring-kafka/reference/kafka/sending-messages.html)