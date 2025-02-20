---
date: 2025-02-09
lastmod: 2025-02-09
tags:
    - golang
---


## 배열 타입
**(1) 타입 정의**

```go
var a [4]int
var b [3]int

fmt.Println(reflect.TypeOf(a) == reflect.TypeOf(b)) // false
```

Go에서 배열은 동일한 타입의 원소를 저장하는 *고정된* 크기의 자료구조이다.[^1] 배열의 타입은 `[n]T` 형태로 표현하며, `n`은 배열의 크기를, `T`는 원소의 타입을 나타낸다. 

이 때 배열의 크기는 컴파일 타임에 결정되며, 런타임에 크기를 변경할 수 없다. 따라서 `[4]int`와 `[3]int`는 서로 다른 타입으로 간주된다. 

배열의 원소들은 선언과 동시에 해당 타입의 제로 값(zero-value)으로 초기화된다. 예를 들어 `int`타입의 배열은 모두 0으로 초기화된다.

**(2) 값(Value)으로 전달됨**

```go
func myFunc(arr [3]int) {
    fmt.Printf("%p\n", &arr)
}

func main() {
    arr := [3]int{1, 2, 3}
    fmt.Printf("%p\n", &arr) // 0xc00001a018
    myFunc(arr)              // 0xc00001a030
}
```

배열은 참조(reference)가 아니라 값(value)로 취급된다.[^2] C에서는 배열 변수가 첫 번째 원소의 포인터를 의미하는 반면, Go에서는 배열 변수 자체가 전체 배열을 나타낸다.

따라서 배열을 함수에 인자로 전달하면 복사본이 생성되어 전달된다(pass by value). 배열을 참조 형태로 전달하고 싶다면 배열 포인터(e.g. `*[3]int`)를 사용해야 한다.

## 슬라이스 타입
**(1) 배열의 한 섹션을 참조하는 자료구조**

배열은 크기가 고정되어 있고, 함수에 전달될 때 복사본을 생성하기 때문에 활용이 제한적이다. 이러한 배열의 단점을 보완하기 위한 자료구조가 [[슬라이스]]다. 슬라이스는 배열의 일부분을 참조하는 자료구조로, 자체적으로는 데이터를 저장하지 않고 배열을 참조하는 포인터를 통해 데이터를 다룬다.

슬라이스는 동적으로 크기를 조절할 수 있고, 함수에 전달되더라도 원본 배열을 복사하지 않고 그대로 참조한다.

[^1]: [R. Pike, "Arrays, slices (and strings): The mechanics of 'append'," *The Go Blog*, 2013.](https://go.dev/blog/slices#arrays)
[^2]: [A. Gerrand, "Go Slices: usage and internals", *The Go Blog*, 2011.](https://go.dev/blog/slices-intro#arrays)