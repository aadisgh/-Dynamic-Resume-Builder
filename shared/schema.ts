import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const resumes = pgTable("resumes", {
  id: serial("id").primaryKey(),
  userId: text("user_id"),
  title: text("title").notNull(),
  data: jsonb("data").notNull(),
  template: text("template").notNull().default("modern"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Resume data schemas
export const personalInfoSchema = z.object({
  fullName: z.string().min(1),
  title: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  location: z.string().optional(),
  linkedin: z.string().url().optional().or(z.literal("")),
  website: z.string().url().optional().or(z.literal("")),
  summary: z.string().optional(),
});

export const experienceSchema = z.object({
  id: z.string(),
  jobTitle: z.string().min(1),
  company: z.string().min(1),
  location: z.string().optional(),
  startDate: z.string().min(1),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().optional(),
});

export const educationSchema = z.object({
  id: z.string(),
  degree: z.string().min(1),
  institution: z.string().min(1),
  location: z.string().optional(),
  graduationYear: z.string().optional(),
  gpa: z.string().optional(),
});

export const skillCategorySchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  skills: z.array(z.string()),
});

export const resumeDataSchema = z.object({
  personal: personalInfoSchema,
  experiences: z.array(experienceSchema),
  education: z.array(educationSchema),
  skills: z.array(skillCategorySchema),
  customization: z.object({
    colorScheme: z.string().default("primary"),
    fontFamily: z.string().default("inter"),
    spacing: z.number().min(1).max(3).default(2),
  }),
});

export const insertResumeSchema = createInsertSchema(resumes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Resume = typeof resumes.$inferSelect;
export type InsertResume = z.infer<typeof insertResumeSchema>;
export type ResumeData = z.infer<typeof resumeDataSchema>;
export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type SkillCategory = z.infer<typeof skillCategorySchema>;
