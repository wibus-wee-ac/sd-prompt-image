import { createDialogs, createDialogHooks } from 'react-hook-dialog';

export const dialogs = createDialogs({
  promptDialog: { title: '', content: '', prompt_template: {} },
});

export const dialog = createDialogHooks(dialogs);