

const plantumlEncoder = require('plantuml-encoder')

import { parse } from "./plantuml"
import * as types from "./types"
const { getTreemap } = require('treemap-squarify')


const runBuml = (encodedPlantUMLCode: string, width: number, height: number) => {    
    const decodedData: string = plantumlEncoder.decode(encodedPlantUMLCode)

    const parsedData: types.UML[] = parse(decodedData)

    let filtered: types.Class[] & types.Enum[] & types.Interface[] = []
    
    parsedData[0].elements.forEach(element => {
        if (element instanceof types.Class || element instanceof types.Enum || element instanceof types.Interface) {
            filtered.push(element)
        }
    })

    let result = filtered.map((element: types.Class | types.Enum | types.Interface)=> (
        {
            value: Math.floor(Math.sqrt(element.members.length + 1)),
            data: element,
            type: element instanceof types.Class ? "class" :
                  element instanceof types.Enum ? "enum" :
                  element instanceof types.Interface ? "interface" : "",
            members: element.members
        }
    ))

    return {
        tiles: getTreemap({
            data: result,
            width: width,
            height: height
        }),
        relationships: parsedData[0].elements.filter(element => {
            return element instanceof types.Relationship ? true : false     
        })
    }
    // const pair: Map<number, Array<types.Class | types.Enum | types.Interface>> = new Map()

    // parsedData[0].elements.forEach((element: types.UMLElement) => {
    //     if (element instanceof types.Class || element instanceof types.Enum || element instanceof types.Interface) {
    //         if (!pair.has(element.members.length)) {
    //             pair.set(element.members.length, [])
    //         }
    //         pair.get(element.members.length).push(element)
    //     }

    //     // if([types.Class, types.Interface, types.Enum].some(t => t === element.constructor)) {
    //     //     let elem : types.Class | types.Interface | types.Enum = element
    //     //     console.log(el.length)
    //     // }
    // })
}

module.exports.runBuml = runBuml