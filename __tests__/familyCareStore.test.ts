import { useFamilyCareStore } from '../src/features/family-care/store/useFamilyCareStore';

describe('useFamilyCareStore', () => {
  beforeEach(() => {
    useFamilyCareStore.getState().resetFamilyCare();
  });

  it('starts with blank dependent info', () => {
    const { dependentInfo } = useFamilyCareStore.getState();
    expect(dependentInfo.name).toBe('');
    expect(dependentInfo.age).toBe('');
    expect(dependentInfo.relation).toBe('');
    expect(dependentInfo.healthIssue).toBe('');
    expect(dependentInfo.therapyReason).toBe('');
    expect(dependentInfo.profilePic).toBeNull();
  });

  it('updates basic dependent info properly', () => {
    useFamilyCareStore.getState().setDependentBasicInfo({
      name: 'Rohan Sharma',
      age: '16',
      relation: 'Child',
      healthIssue: 'Yes',
      therapyReason: 'Manage Anxiety or Stress',
      profilePic: 'file:///data/user/0/avatar.jpg',
    });

    const { dependentInfo } = useFamilyCareStore.getState();
    expect(dependentInfo.name).toBe('Rohan Sharma');
    expect(dependentInfo.age).toBe('16');
    expect(dependentInfo.relation).toBe('Child');
    expect(dependentInfo.healthIssue).toBe('Yes');
    expect(dependentInfo.therapyReason).toBe('Manage Anxiety or Stress');
    expect(dependentInfo.profilePic).toBe('file:///data/user/0/avatar.jpg');
  });

  it('updates therapy details and notes', () => {
    useFamilyCareStore.getState().setDependentBasicInfo({
      name: 'Sunita Verma',
      age: '52',
      relation: 'Parent',
    });

    useFamilyCareStore.getState().setDependentTherapyInfo({
      therapyHistory: 'No',
      therapistNote: 'Difficulty sleeping and dealing with recent loss.',
    });

    const { dependentInfo } = useFamilyCareStore.getState();
    expect(dependentInfo.name).toBe('Sunita Verma');
    expect(dependentInfo.therapyHistory).toBe('No');
    expect(dependentInfo.therapistNote).toContain('Difficulty sleeping');
  });

  it('generates formatted intake notes for therapist bookings', () => {
    useFamilyCareStore.getState().setDependentBasicInfo({
      name: 'Aarav Patel',
      age: '14',
      relation: 'Child',
      healthIssue: 'Mild ADHD',
      therapyReason: 'Improve Family Communication',
    });

    useFamilyCareStore.getState().setDependentTherapyInfo({
      therapyHistory: 'Yes',
      therapistNote: 'Wants gentle behavioral support and focus exercises.',
    });

    const notes = useFamilyCareStore.getState().getFormattedIntakeNotes();
    expect(notes).toContain('[FAMILY CARE DEPENDENT INTAKE]');
    expect(notes).toContain('Name: Aarav Patel');
    expect(notes).toContain('Age: 14 | Relation: Child');
    expect(notes).toContain('Known Health/Mental Concerns: Mild ADHD');
    expect(notes).toContain('Reason for Therapy: Improve Family Communication');
    expect(notes).toContain('Notes from Family Member: Wants gentle behavioral support');
  });

  it('clears dependent info when resetFamilyCare is called', () => {
    useFamilyCareStore.getState().setDependentBasicInfo({
      name: 'Test Dependent',
      age: '25',
    });

    useFamilyCareStore.getState().resetFamilyCare();
    const { dependentInfo } = useFamilyCareStore.getState();
    expect(dependentInfo.name).toBe('');
    expect(dependentInfo.age).toBe('');
    expect(useFamilyCareStore.getState().getFormattedIntakeNotes()).toBe('');
  });
});
