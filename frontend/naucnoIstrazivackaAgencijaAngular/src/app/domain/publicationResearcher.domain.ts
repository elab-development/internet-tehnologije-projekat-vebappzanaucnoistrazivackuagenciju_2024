import { Publication } from "./publication.domain"
import { Researcher } from "./researcher.domain"

export type PublicationResearcher={
    id:number,
    publication:Publication,
    researcher:Researcher
}