import { Publication } from "./publication.domain"

export type PublicationFullInfo ={
    publication:Publication,
    publicationResearchersToSave:PR[],
    publicationResearchersToDelete:PR[],
    referencesToSave:Ref[],
    referencesToDelete:Ref[]
}
export type PR = {
    researcher_id:number
}
export type Ref = {
    referenced_id:number
}