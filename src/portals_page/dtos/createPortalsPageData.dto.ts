export class CreatePortalsPageDto {
  portals : {
    id : number
    badge : string
    title : string
    description : string
    buttons : {title : string ,link : string}[]
    image : string
  }[]

  mockup : {
    title : string
    description : string
    button : {title : string , link : string}
    image : string
  }
}