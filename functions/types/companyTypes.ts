export type ICompany = {
    id: string;
    admins: string[];
    name: string;
    created: Date;
    createdBy: string;
    description: string;
};

export type ICompanyMember = {
    name: string;
    email: string;
    userId: string;
    role: "member" | "admin";
};
