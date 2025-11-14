// src/features/users/userApiSlice.js
import { apiSlice } from "../api/apiSlice";

export const dgtAnswerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        setAnswer: builder.mutation({
            query: ({ questionId, answer }) => ({
                url: `/answer`,
                method: "POST",
                body: { questionId, answer },
            }),
            invalidatesTags: ["RandomQuestion"],
        }),
    }),
    overrideExisting: false, // ← por seguridad, no sobrescribe otros endpoints
});

// Exporta los hooks generados automáticamente
export const { useSetAnswerMutation } = dgtAnswerApiSlice;
