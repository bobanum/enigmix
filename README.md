# Enigmix

## Clues syntaxe

### Operators
- `=` : Equal
- `!=` : Not equal
- `>` : Greater than
- `<` : Less than
- `>=` : Greater than or equal
- `<=` : Less than or equal
- `|` : Or
- `&` : And
- `^` : Xor
- `#` : Cardinality

### Syntaxes

> Uppercase = Category
> Lowercase = Instance

- A.a = B.b : Direct comparison. Meaning A.a is equal to B.b
- A.a.p != B.b.p : Property comparison. Meaning the property p of A.a is not equal to the property p of B.b
- E.p(A.a < B.b) : Property comparison with condition. Meaning the property p of A.a is less than the property p of B.b
- E.#(A.a > B.b) : Cardinality comparison. Meaning the position of A.a is greater than the position of B.b
- E.#(A.a > B.b > C.C) : Cardinality comparison. Meaning the position of A.a is greater than the position of B.b and the position of B.b is greater than the position of C.c