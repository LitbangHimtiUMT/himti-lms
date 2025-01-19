import { ChangeEvent } from "react"

export interface AnggotaModel {
    id: string
    nim: string,
    name: string
    email?: string,
    Generation?: {
        id: string
        year: string
    },
    facebook: string | null,
    instagram: string | null,
    linkedin: string | null,
    twitter: string | null,
    isActive?: boolean,
    createdAt?: string | Date,
    updatedAt?: string | Date
}

export interface AnggotaDTO {
    nim?: string,
    name?: string
    generationId?: string,
    email?: string | null,
    facebook?: string | null,
    instagram?: string | null,
    linkedin?: string | null,
    twitter?: string | null,
    isActive?: boolean | string | ChangeEvent<HTMLSelectElement>,
}