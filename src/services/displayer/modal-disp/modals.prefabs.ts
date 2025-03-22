enum eActions {
  Cancel,
  Proceed,
}

export type tModalContent = {
  title: string;
  complement: string;
  actions: eActions[];
};

export const modalAskForDeletion: tModalContent = {
  title: 'Are you sure you want to delete this ?',
  complement: 'All deletions will be permanently lost :o',
  actions: [eActions.Cancel, eActions.Proceed],
};
