import { create } from 'zustand';

export interface FamilyCareDependentInfo {
  profilePic: string | null;
  name: string;
  age: string;
  relation: string;
  healthIssue: string;
  therapyReason: string;
  therapyHistory: string;
  therapistNote: string;
}

interface FamilyCareState {
  dependentInfo: FamilyCareDependentInfo;
  setDependentBasicInfo: (
    info: Partial<
      Pick<
        FamilyCareDependentInfo,
        'profilePic' | 'name' | 'age' | 'relation' | 'healthIssue' | 'therapyReason'
      >
    >
  ) => void;
  setDependentTherapyInfo: (
    info: Partial<
      Pick<FamilyCareDependentInfo, 'therapyHistory' | 'therapistNote' | 'therapyReason'>
    >
  ) => void;
  resetFamilyCare: () => void;
  getFormattedIntakeNotes: () => string;
}

const INITIAL_INFO: FamilyCareDependentInfo = {
  profilePic: null,
  name: '',
  age: '',
  relation: '',
  healthIssue: '',
  therapyReason: '',
  therapyHistory: '',
  therapistNote: '',
};

export const useFamilyCareStore = create<FamilyCareState>((set, get) => ({
  dependentInfo: { ...INITIAL_INFO },

  setDependentBasicInfo: (info) =>
    set((state) => ({
      dependentInfo: {
        ...state.dependentInfo,
        ...info,
      },
    })),

  setDependentTherapyInfo: (info) =>
    set((state) => ({
      dependentInfo: {
        ...state.dependentInfo,
        ...info,
      },
    })),

  resetFamilyCare: () =>
    set({
      dependentInfo: { ...INITIAL_INFO },
    }),

  getFormattedIntakeNotes: () => {
    const { dependentInfo } = get();
    if (!dependentInfo.name) {
      return '';
    }

    const sections = [
      `[FAMILY CARE DEPENDENT INTAKE]`,
      `Name: ${dependentInfo.name}`,
      `Age: ${dependentInfo.age || 'N/A'}`,
      `Relationship: ${dependentInfo.relation || 'N/A'}`,
      `Known Health/Mental Concerns: ${dependentInfo.healthIssue || 'None reported'}`,
      `Reason for Therapy: ${dependentInfo.therapyReason || 'General Support'}`,
      `Previous Therapy Experience: ${dependentInfo.therapyHistory || 'None'}`,
      `Notes from Family Member: ${dependentInfo.therapistNote || 'N/A'}`,
    ];

    return sections.join('\n');
  },
}));
