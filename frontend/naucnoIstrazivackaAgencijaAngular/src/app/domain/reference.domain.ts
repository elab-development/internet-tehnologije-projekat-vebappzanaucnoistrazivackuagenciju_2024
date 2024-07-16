import { Publication } from "./publication.domain"

export type Reference={
    publication:Publication,
    referenced:Publication
}