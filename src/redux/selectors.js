export const selectContacts = state => state.data.items;

export const selectIsLoading = state => state.data.isLoading;

export const selectError = state => state.data.error;

export const selectStatusFilter = state => state.filter.value;