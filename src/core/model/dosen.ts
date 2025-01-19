export interface DosenModel {
    id: string
    nidn: string,
    name: string
    email: string
    numberPhone: string,
    lesson: string | null,
    isActive: boolean,
    createdAt: string
    updatedAt: string
}

export interface DosenDTO {
    nidn?: string,
    name?: string
    email?: string
    numberPhone?: string,
    lesson?: string | null,
    isActive?: boolean,
}