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

export type EligibilityAssignmentStatus = "APPROVED" | "REVIEW" | "REJECT" | "NONE"

export interface EligibilityAssignmentDTO {
    id: string
    title: string
    moduleId: string
    moduleName: string
    status: EligibilityAssignmentStatus
}

// GET /lms/certificates/eligibility/:classId — the single source of
// truth for certificate claiming: eligible iff every assignment in
// the class has an APPROVE submission from the caller and the mentor
// has marked the class completed.
export interface CertificateEligibilityDTO {
    eligible: boolean
    classCompleted: boolean
    totalAssignments: number
    approvedAssignments: number
    assignments: EligibilityAssignmentDTO[]
}