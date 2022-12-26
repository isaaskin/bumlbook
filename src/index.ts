

const { parse } = require("./plantuml")

const data = `
@startuml
class Member {
    name: string
}
@enduml
`

console.log(parse(data))