// src/features/users/userApiSlice.js
import { apiSlice } from "../api/apiSlice";

export const dgtEvaluationApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPoints: builder.query({
			query: () => "/points",
            providesTags: ["Points"],
        }),
    }),
    overrideExisting: false, // ← por seguridad, no sobrescribe otros endpoints
});

// Exporta los hooks generados automáticamente
export const { useGetPointsQuery } = dgtEvaluationApiSlice;
