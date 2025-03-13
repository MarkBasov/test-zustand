import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface User {
  id: number
  username: string
}

interface UserState {
  users: User[];
  isLoading: boolean;
  errors: string[];
  addUser: (username: string) => void;
  fetchUsers: () => void;
}

export interface Comment {
  id: number
  body: string
}

interface UserComments {
  comments: Comment[];
  fetchComments: () => void;
  getCommentsByUser: (userId: number) => Comment[]
}

export const useUserStore = create(immer<UserState>((set) => ({
  users: [],
  currentUser: null,
  settings: {},
  isLoading: false,
  errors: [],

  addUser: (username: string) => set((state) => ({ users: [...state.users, {id: Date.now(), username}] })),
  fetchUsers: async () => {
    const result = await fetch('https://jsonplaceholder.typicode.com/users')
    const json = await result.json() as User[]
    set({
      users: json
    })
  },
})))

export const useCommentsStore = create<UserComments>((set) => ({
  comments: [],
  fetchComments: async () => {
    const result = await fetch('https://jsonplaceholder.typicode.com/comments')
    const json = await result.json() as Comment[]
    set({
      comments: json
    })
  },
  /**
   * Get all comments by a user
   * @param {number} userId The user ID
   * @return {Comment[]} The array of comments by the user
   */
  getCommentsByUser: (userId: number): Comment[] => {
    return useCommentsStore.getState().comments.filter((comment) => comment.id === userId);
  }
}))
