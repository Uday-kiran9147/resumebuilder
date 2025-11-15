import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  experience: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    degree: string;
    school: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  skills: Array<{
    id: string;
    category: string;
    items: string[];
  }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    url: string;
  }>;
  template: "minimal" | "modern" | "creative" | "entry-level";
}

interface ResumeStore {
  resume: ResumeData;
  updatePersonalInfo: (info: Partial<ResumeData["personalInfo"]>) => void;
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<ResumeData["experience"][0]>) => void;
  deleteExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<ResumeData["education"][0]>) => void;
  deleteEducation: (id: string) => void;
  addSkill: () => void;
  updateSkill: (id: string, data: Partial<ResumeData["skills"][0]>) => void;
  deleteSkill: (id: string) => void;
  addProject: () => void;
  updateProject: (id: string, data: Partial<ResumeData["projects"][0]>) => void;
  deleteProject: (id: string) => void;
  setTemplate: (template: ResumeData["template"]) => void;
  clearData: () => void;
  exportToJSON: () => string;
  importFromJSON: (json: string) => void;
}

const initialResume: ResumeData = {
  personalInfo: {
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    summary: "Experienced professional with a proven track record of delivering results.",
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  template: "minimal",
};

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      resume: initialResume,

      updatePersonalInfo: (info) =>
        set((state) => ({
          resume: {
            ...state.resume,
            personalInfo: { ...state.resume.personalInfo, ...info },
          },
        })),

      addExperience: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: [
              ...state.resume.experience,
              {
                id: Date.now().toString(),
                title: "",
                company: "",
                location: "",
                startDate: "",
                endDate: "",
                description: "",
              },
            ],
          },
        })),

      updateExperience: (id, data) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: state.resume.experience.map((exp) =>
              exp.id === id ? { ...exp, ...data } : exp
            ),
          },
        })),

      deleteExperience: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: state.resume.experience.filter((exp) => exp.id !== id),
          },
        })),

      addEducation: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: [
              ...state.resume.education,
              {
                id: Date.now().toString(),
                degree: "",
                school: "",
                location: "",
                startDate: "",
                endDate: "",
                description: "",
              },
            ],
          },
        })),

      updateEducation: (id, data) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: state.resume.education.map((edu) =>
              edu.id === id ? { ...edu, ...data } : edu
            ),
          },
        })),

      deleteEducation: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: state.resume.education.filter((edu) => edu.id !== id),
          },
        })),

      addSkill: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: [
              ...state.resume.skills,
              {
                id: Date.now().toString(),
                category: "",
                items: [],
              },
            ],
          },
        })),

      updateSkill: (id, data) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: state.resume.skills.map((skill) =>
              skill.id === id ? { ...skill, ...data } : skill
            ),
          },
        })),

      deleteSkill: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: state.resume.skills.filter((skill) => skill.id !== id),
          },
        })),

      addProject: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: [
              ...state.resume.projects,
              {
                id: Date.now().toString(),
                name: "",
                description: "",
                url: "",
              },
            ],
          },
        })),

      updateProject: (id, data) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: state.resume.projects.map((project) =>
              project.id === id ? { ...project, ...data } : project
            ),
          },
        })),

      deleteProject: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: state.resume.projects.filter((project) => project.id !== id),
          },
        })),

      setTemplate: (template) =>
        set((state) => ({
          resume: { ...state.resume, template },
        })),

      clearData: () => set({ resume: initialResume }),

      exportToJSON: () => JSON.stringify(get().resume, null, 2),

      importFromJSON: (json) => {
        try {
          const data = JSON.parse(json);
          set({ resume: data });
        } catch (error) {
          console.error("Failed to import JSON:", error);
        }
      },
    }),
    {
      name: "resume_data",
    }
  )
);
