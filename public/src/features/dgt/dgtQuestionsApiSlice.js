// src/features/users/userApiSlice.js
import { apiSlice } from "../api/apiSlice";

export const dgtQuestionsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getIssueses: builder.query({
            query: () => "/issueses",
            providesTags: ["Issueses"],
        }),
        getRandomQuestion: builder.query({
            query: (issue) => `/random-question?issue=${issue}`,
            providesTags: ["RandomQuestion"],
        }),
    }),
    overrideExisting: false, // ← por seguridad, no sobrescribe otros endpoints
});

// Exporta los hooks generados automáticamente
export const { useGetIssuesesQuery, useGetRandomQuestionQuery } = dgtQuestionsApiSlice;
