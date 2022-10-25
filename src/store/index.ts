import { configureStore } from '@reduxjs/toolkit';
import { groupsSliceReducer } from './groupsSlice';
import { usersSliceReducer } from './usersSlice';

export const store = configureStore({
  reducer: {
    groups: groupsSliceReducer,
    users: usersSliceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
