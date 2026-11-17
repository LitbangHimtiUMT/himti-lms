// The claim path the server assigned to the caller, from the
// caller's relation to the class — never from client input. A mentor
// (creator or co-mentor) claims as PEMATERI even when also enrolled;
// everyone else claims as PESERTA.
export type CertificateRole = "PESERTA" | "PEMATERI"

export interface CertificateDTO {
    id: string
    code: string
    role: CertificateRole
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
// truth for certificate claiming. The server decides the caller's
// path (role): participants are eligible iff every assignment in the
// class has an APPROVE submission from the caller and the mentor has
// marked the class completed; mentors are eligible iff the class is
// completed and has at least one session, with no assignment
// requirement — their assignments list is always empty, so the UI
// must never render an assignment meter for the mentor path.
export interface CertificateEligibilityDTO {
    role: CertificateRole
    eligible: boolean
    classCompleted: boolean
    // True when the caller already holds a certificate for this
    // class; certificateCode is its code for the View link.
    hasCertificate: boolean
    certificateCode: string | null
    totalAssignments: number
    approvedAssignments: number
    assignments: EligibilityAssignmentDTO[]
}