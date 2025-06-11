export interface CertificateDTO {
    id: string
    code: string
    class: {
        id: string
        name: string
        category: {
            id: string
            name: string
        }
    },
    createdAt: Date
}