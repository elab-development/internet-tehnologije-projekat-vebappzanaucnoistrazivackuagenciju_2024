export type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

export type Meta = {
    current_page: number;
    from: number;
    last_page: number;
    links: PaginationLink[];
    path: string;
    per_page: number;
    to: number;
    total: number;
};

export type Links = {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
};

export type Page<T> = {
    data: T[];
    links: Links;
    meta: Meta;
};