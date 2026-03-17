import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Mock Data
export interface Devlog {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  isGlitchy: boolean;
}

const mockDevlogs: Devlog[] = [
  {
    id: "1",
    date: "OCT 14, 2024",
    title: "v0.4.1 - Adding New Toys!",
    excerpt: "Lottie has been so good lately, so we added some new bouncy balls and a pastel scratching post. She seems to really love the color red.",
    isGlitchy: false,
  },
  {
    id: "2",
    date: "NOV 02, 2024",
    title: "v0.5.0 - Minor bug fixes...",
    excerpt: "Fixed an issue where Lottie would stare at the screen for too long when the game was paused. Added a sleep cycle. She doesn't like to sleep.",
    isGlitchy: true,
  },
  {
    id: "3",
    date: "DEC 24, 2024",
    title: "v0.5.5 - File System Access?",
    excerpt: "Players reported the game creating new text files on their desktop. We are investigating this. Lottie is just a virtual pet. She cannot reach you.",
    isGlitchy: true,
  },
];

export function useDevlogs() {
  return useQuery({
    queryKey: ["devlogs"],
    queryFn: async () => {
      // Simulate network delay
      await new Promise((r) => setTimeout(r, 800));
      return mockDevlogs;
    },
  });
}

export function useSubscribe() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (email: string) => {
      await new Promise((r) => setTimeout(r, 1500));
      if (!email.includes("@")) throw new Error("Invalid email format.");
      return { success: true, email };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });
}
