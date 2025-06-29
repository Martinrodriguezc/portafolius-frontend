export type Summary = string[];

export type Objectives = string[];

export interface Resource {
    title: string;
    link: string;
    source: string;
}

export interface QuizItem {
    question: string;
    options: string[];
    answer: string;
    explanation: string;
}

export interface Material {
    summary: Summary;
    objectives: Objectives;
    resources: Resource[];
    quiz: QuizItem[];
}

export interface ErrorResponse {
    detail?: string;
}

export interface QuizAnswer {
    questionIndex: number;
    selectedAnswer: string;
    isCorrect: boolean;
    explanation: string;
}

// New types for detailed video information
export interface Interaction {
    id: number;
    clipId: number;
    userId: number;
    role: string;
    protocolKey: string;
    windowId: number;
    windowName: string;
    findingId: number;
    findingName: string;
    diagnosisId: number;
    possibleDiagnosisName: string;
    subdiagnosisId: number | null;
    subdiagnosisName: string | null;
    subSubId: number | null;
    subSubName: string | null;
    thirdOrderId: number | null;
    thirdOrderName: string | null;
    comment: string | null;
    isReady: boolean | null;
    imageQualityId: number | null;
    imageQualityName: string | null;
    finalDiagnosisId: number | null;
    finalDiagnosisName: string | null;
    professorComment: string | null;
    createdAt: string;
}

export interface VideoDetails {
    video: {
        id: number;
        studyId: number;
        objectKey: string;
        originalFilename: string;
        mimeType: string;
        sizeBytes: string;
        durationSeconds: number | null;
        uploadDate: string;
        orderIndex: number;
        protocol: string;
        status: string;
    };
    study: {
        id: number;
        title: string;
        description: string;
        status: string;
    };
    student: {
        name: string;
        email: string;
    };
    tags: any[];
    comments: any[];
    evaluation: {
        id: number;
        score: number;
        feedbackSummary: string | null;
        submittedAt: string;
        teacher: {
            name: string;
            email: string;
        };
    };
    studentInteraction: {
        comment: string | null;
        ready: boolean | null;
        date: string;
    } | null;
    professorInteraction: {
        comment: string | null;
        date: string;
        imageQuality: string | null;
        finalDiagnosis: string | null;
    } | null;
    evaluationAttempts: Array<{
        id: number;
        submitted_at: string;
        comment: string | null;
        total_score: number;
        teacher_name: string;
    }>;
}

export interface ProtocolSection {
    key: string;
    name: string;
    items: Array<{
        key: string;
        label: string;
        score_scale: string;
        max_score: number;
    }>;
}

export interface Protocol {
    key: string;
    name: string;
    sections: ProtocolSection[];
} 