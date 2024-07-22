import {z} from "zod";
import {DEFAULT_PET_IMAGE} from "@/lib/constants";


export const petIdSchema = z.string().cuid();

export const petFormSchema = z.object({
    name: z.string().trim().min(3, 'Name must be at least 3 characters'),
    ownerName: z.string().trim(),
    age: z.coerce.number().int().positive('Age must be a positive number').max(30, 'Age must be at most 30'),
    imageUrl: z.union([z.literal(""), z.string().trim().url('Invalid image URL')]),
    notes: z.union([z.literal(""), z.string().trim().max(1000, 'Notes must be at most 1000 characters')])
}).transform((data) => ({ // transform et coerce ne fonctionnent qu'avec le "onSubmit" et non avec l'attribut "action"
    ...data,
    imageUrl: data.imageUrl || DEFAULT_PET_IMAGE,
}));


export type TPetForm = z.infer<typeof petFormSchema>;

export const authSchema = z.object({
    email: z.string().trim().email().max(100, 'Email must be at most 100 characters'),
    password: z.string().trim().min(8, 'Password must be at least 8 characters').max(100, 'Password must be at most 100 characters')
});

export type TAuthForm = z.infer<typeof authSchema>;