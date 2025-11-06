export class UpdateAboutDto {
  heroSection : {
    badge : string
    title : string
    description : string
    buttons : {title : string , link : string}[]
  }

  offers : {
    badge : string
    title : string
    portalsOffers : {title : string , description : string}[]
  }
  
  whyChooseUs : {
    badge : string
    title : string
    description : string
    button : {title : string , link : string}
    video : string
  }
  
  schoolnaJourney : {
    title : string
    description : string 
    buttons : {title : string , link : string}[]
  }
}